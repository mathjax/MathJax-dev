# -*- Mode: Python; tab-width: 2; indent-tabs-mode:nil; -*-
# vim: set ts=2 et sw=2 tw=80:
#
# Copyright (c) 2013 MathJax Project
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

from __future__ import print_function

import sys
import argparse
import subprocess, os, commands, re
from copy import deepcopy

import fontforge
import fontUtil
from fontSplitting import FONTSPLITTING

def boolToString(b):
    if b:
        return "true"
    else:
        return "false"

HEADER='\
/*************************************************************\n\
 *\n\
 *  MathJax/jax/output/HTML-CSS/font/%s\n\
 *  \n\
 *  %s\n\
 *\n\
 *  ---------------------------------------------------------------------\n\
 *  \n\
 *  Copyright (c) %s MathJax Project\n\
 *\n\
 *  Licensed under the Apache License, Version 2.0 (the "License");\n\
 *  you may not use this file except in compliance with the License.\n\
 *  You may obtain a copy of the License at\n\
 *\n\
 *     http://www.apache.org/licenses/LICENSE-2.0\n\
 *\n\
 *  Unless required by applicable law or agreed to in writing, software\n\
 *  distributed under the License is distributed on an "AS IS" BASIS,\n\
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n\
 *  See the License for the specific language governing permissions and\n\
 *  limitations under the License.\n\
 */\n'

# Parse the command line arguments
parser = argparse.ArgumentParser()
parser.add_argument('fontfamily', type=str)
parser.add_argument('fontdir', type=str)
args = parser.parse_args()
FONTDIR = args.fontdir
FONTFAMILY = args.fontfamily
if (not os.path.exists("%s/config.py" % FONTFAMILY)):
    raise BaseException("%s/config.py does not exist!" % FONTFAMILY)

# Create/clean up the ttf and otf directories
subprocess.call("mkdir -p %s/ttf %s/otf" % (FONTFAMILY, FONTFAMILY),
                shell=True)
subprocess.call("rm -f %s/ttf/* %s/otf/*" % (FONTFAMILY, FONTFAMILY),
                shell=True)

# Import the configuration for this font family
sys.path.append("./%s" % FONTFAMILY)
config = __import__("config")
del sys.path[-1]

if config.MAINFONTS is None:
    # By default, use the MATHFONT
    config.MAINFONTS = { "Regular": config.MATHFONT }
    MATHONLY = True
else:
    MATHONLY = False

if config.FONTDATA["TeX_factor"] is None:
    mainFont = fontforge.open("%s/%s" % (FONTDIR, config.MAINFONTS["Regular"]))
    # 0x4D = M
    config.FONTDATA["TeX_factor"] = float(mainFont.em) / mainFont[0x4D].width
    mainFont.close()
if config.SMALLOPFONTS is None:
    config.SMALLOPFONTS = ""

# Split the Main fonts
for weight in config.MAINFONTS:
    fontFile = "%s/%s" % (FONTDIR, config.MAINFONTS[weight])
    oldfont=fontforge.open(fontFile)
    oldfont.encoding = "UnicodeFull"

    for subset in FONTSPLITTING:
        name = subset[0]
        font=fontUtil.newFont(FONTFAMILY, fontFile, config.PREFIX, name, weight)
        for i in range(1,len(subset)):
            r = subset[i]
            if type(r) == int:
                fontUtil.moveGlyph(oldfont, font, r)
            else:
                fontUtil.moveRange(oldfont, font, r[0], r[1])
        fontUtil.saveFont(FONTFAMILY, font)
        font.close()

    # Save the rest of the glyphs in a NonUnicode font
    oldfont.fontname = "%s_NonUnicode-%s" % (config.PREFIX, weight)
    fontUtil.saveFont(FONTFAMILY, oldfont)
    oldfont.close()

# Split the Math font
splitter=fontUtil.mathFontSplitter(FONTFAMILY,
                                   FONTDIR,
                                   config.PREFIX,
                                   config.MATHFONT,
                                   config.MAINFONTS)
splitter.split()

# Remove temporary files
subprocess.call("rm -f %s/otf/*.tmp" % FONTFAMILY, shell=True)


# Create the fontdata.js file
fontData = open("%s/fontdata.js" % FONTFAMILY, "w")

# Print the header
desc="Initializes the HTML-CSS OutputJax to use the %s fonts" % FONTFAMILY
print(HEADER %
      (("%s/fontdata.js" % FONTFAMILY), desc, config.FONTDATA["Year"]),
      file=fontData)
      
print('\
(function (HTMLCSS,MML,AJAX) {\n\
  var VERSION = "%s";\n' % config.FONTDATA["FileVersion"], file=fontData)

# Determine the list of fonts
fontList = commands.getoutput('ls %s/otf' % FONTFAMILY).\
    replace(".otf","").split("\n")
fontVarList = []
fontVarValue = []

# Print the javascript variables for fonts
fontDeclaration = ""
for i in range(0,len(fontList)):

    varName = fontList[i]
    varName = varName.split("_")
    varName = varName[-1].upper().split("-")
    if varName[1] == "REGULAR":
        varName = varName[0]
    else:
        varName = varName[0] + varName[1]
    fontVarList.append(varName)

    varValue = fontList[i]
    varValue = varValue.replace("-Regular", "")
    varValue = varValue.replace("BoldItalic", "bold-italic")
    varValue = varValue.replace("Bold", "bold")
    varValue = varValue.replace("Italic", "italic")
    fontVarValue.append(varValue)

    if i == 0:
        fontDeclaration += '  var %s = "%s"' % (varName, varValue)
    else:
        fontDeclaration += ",\n"
        fontDeclaration += '      %s = "%s"' % (varName, varValue)

fontDeclaration += ";\n"
print(fontDeclaration, file=fontData)

# Print the main parameters
print('\
  var H = "H", V = "V", EXTRAH = {load:"extra", dir:H}, EXTRAV = {load:"extra", dir:V};\n\
\n\
  HTMLCSS.Augment({\n\
    FONTDATA: {\n\
      version: VERSION,\n\
\n\
      TeX_factor: %.3f,\n\
      baselineskip: %.3f,\n\
      lineH: %.3f, lineD: %.3f,\n\
\n\
      hasStyleChar: %s,  // char 0xEFFD encodes font style\n\
' % (config.FONTDATA["TeX_factor"],
     config.FONTDATA["baselineskip"],
     config.FONTDATA["lineH"],
     config.FONTDATA["lineD"],
     boolToString(config.FONTDATA["hasStyleChar"])), file=fontData)

# Print FONTS
print("      FONTS: {", file=fontData)
for i in range(0,len(fontList)):
    if i > 0:
        print(",", file=fontData)

    font = fontList[i].split("_")[-1].split("-")
    family = font[0]
    style = font[1]

    fileName = "Main.js"
    print('        "%s": "%s/%s/%s"' %
          (fontVarValue[i], family, style, fileName),
          file=fontData, end="")

print(file=fontData)
print("      },\n", file=fontData)

# Print VARIANT
print("      VARIANT: {", file=fontData)


# Print the regular, bold, italic and bold-italic form

if MATHONLY:
    styles = [""]
else:
    styles = ["","BOLD","ITALIC","BOLDITALIC"]

fontList2 = {}
for s in styles:
    fontList2[s] = []
    for family in FONTSPLITTING:
        name = family[0].upper() + s
        if (name in fontVarList and
            (name not in ["SCRIPT","FRAKTUR","DOUBLESTRUCK", "SANSSERIF"])):
            fontList2[s].append(name)
    if len(fontList2[s]) == 0:
        break
    fontList2[s].append("NONUNICODE"+s)
    fontList2[s].append("SIZE1")

# If styles are not defined, default to the regular list.
if MATHONLY:
    for s in ["BOLD","ITALIC","BOLDITALIC"]:
        fontList2[s] = fontList2[""]

print('          "normal": {fonts: [%s]},' %
      ",".join(fontList2[""]), file=fontData)
print('          "bold": {fonts: [%s], bold:true},' %
      ",".join(fontList2["BOLD"]), file=fontData)
print('          "italic": {fonts: [%s], italic:true},' %
      ",".join(fontList2["ITALIC"]), file=fontData)
print('          "bolditalic": {fonts: [%s], bold: true, italic:true},' %
      ",".join(fontList2["BOLDITALIC"]), file=fontData)

# Print other mathvariants
mathvariants = '\
          "double-struck": {\n\
            fonts: [DOUBLESTRUCK],\n\
            offsetA: 0x1D538,\n\
            offsetN: 0x1D7D8,\n\
            remap: {0x1D53A: 0x2102, 0x1D53F: 0x210D, 0x1D545: 0x2115, 0x1D547: 0x2119, 0x1D548: 0x211A, 0x1D549: 0x211D, 0x1D551: 0x2124}\n\
          },\n\
          "fraktur": {\n\
            fonts: [FRAKTUR],\n\
            offsetA: 0x1D504,\n\
            remap: {0x1D506: 0x212D, 0x1D50B: 0x210C, 0x1D50C: 0x2111, 0x1D515: 0x211C, 0x1D51D: 0x2128}\n\
          },\n\
          "bold-fraktur": {\n\
            fonts: [FRAKTURBOLD], bold:true,\n\
            offsetA: 0x1D56C\n\
          },\n\
          "script": {\n\
            fonts: [SCRIPT], italic:true,\n\
            offsetA: 0x1D49C,\n\
            remap: {0x1D49D: 0x212C, 0x1D4A0: 0x2130, 0x1D4A1: 0x2131, 0x1D4A3: 0x210B, 0x1D4A4: 0x2110, 0x1D4A7: 0x2112, 0x1D4A8: 0x2133, 0x1D4AD: 0x211B, 0x1D4BA: 0x212F, 0x1D4BC: 0x210A, 0x1D4C4: 0x2134},\n\
          },\n\
          "bold-script": {\n\
            fonts: [SCRIPTITALIC], bold:true, italic:true,\n\
            offsetA: 0x1D4D0\n\
          },\n\
          "sans-serif": {\n\
            fonts: [SANSSERIF],\n\
            offsetA: 0x1D5A0,\n\
            offsetN: 0x1D7E2,\n\
            ofssetG: 0xE17D\n\
          },\n\
          "bold-sans-serif": {\n\
            fonts: [SANSSERIFBOLD], bold:true,\n\
            offsetA: 0x1D5D4,\n\
            offsetN: 0x1D7EC,\n\
            offsetG: 0x1D756\n\
          },\n\
          "sans-serif-italic": {\n\
             fonts: [SANSSERIFITALIC], italic: true,\n\
             offsetA: 0x1D608,\n\
             offsetN: 0xE1B4,\n\
             offsetG: 0xE1BF\n\
          },\n\
          "sans-serif-bold-italic": {\n\
             fonts: [SANSSERIFBOLDITALIC], bold:true, italic: true,\n\
             offsetA: 0x1D63C,\n\
             offsetN: 0xE1F6,\n\
             offsetG: 0x1D790\n\
          },\n\
          "monospace": {\n\
             fonts: [MONOSPACE],\n\
             offsetA: 0x1D670,\n\
             offsetN: 0x1D7F6\n\
          },'

if MATHONLY:
    # use regular style
    mathvariants = mathvariants.replace("BOLDITALIC", "")
    mathvariants = mathvariants.replace("BOLD", "")
    mathvariants = mathvariants.replace("ITALIC", "")

print(mathvariants, file=fontData)

# STIX Variants
if config.STIXVARIANT is not None:
    fonts = config.STIXVARIANTFONTS

    for f in fontList2[""]:
        if f not in config.STIXVARIANTFONTS:
            fonts.append(f)

    fonts = ",".join(fonts)

    print('        "-STIX-variant": {%s, fonts: [%s]},' %
          (config.STIXVARIANT, fonts), file=fontData)

# tex-caligraphic
fonts = config.TEXCALIGRAPHICFONTS

for f in fontList2["ITALIC"]:
    if f not in config.TEXCALIGRAPHICFONTS:
        fonts.append(f)

fonts = ",".join(fonts)

if config.TEXCALIGRAPHIC is None:
    print('          "-tex-caligraphic": {fonts: [%s]},' % fonts, file=fontData)
else:
    print('          "-tex-caligraphic": {%s, fonts: [%s]},' %
          (config.TEXCALIGRAPHIC, fonts), file=fontData)

# tex-oldstyle
fonts = config.TEXOLDSTYLEFONTS

for f in fontList2[""]:
    if f not in config.TEXOLDSTYLEFONTS:
        fonts.append(f)

fonts = ",".join(fonts)

if config.TEXOLDSTYLE is None:
    print('          "-tex-oldstyle": {fonts: [%s]},' % fonts, file=fontData)
else:
    print('          "-tex-oldstyle": {%s, fonts: [%s]},' %
          (config.TEXOLDSTYLE, fonts), file=fontData)

# mathit
print('          "-tex-mathit": {fonts: [%s], italic:true, noIC:true},' %
      ",".join(fontList2["ITALIC"]), file=fontData)

# operators
print('          "-largeOp": {fonts:[SIZE1,MAIN]},', file=fontData)
print('          "-smallOp": {%s}' % config.SMALLOPFONTS, file=fontData)

print("      },\n", file=fontData)

# Print RANGES
print('\
      RANGES: [\n\
        {name: "alpha", low: 0x61, high: 0x7A, offset: "A", add: 26},\n\
        {name: "Alpha", low: 0x41, high: 0x5A, offset: "A"},\n\
        {name: "number", low: 0x30, high: 0x39, offset: "N"},\n\
        {name: "greek", low: 0x03B1, high: 0x03C9, offset: "G", add: 26},\n\
        {name: "Greek", low: 0x0391, high: 0x03F6, offset: "G"}\n\
      ],\n', file=fontData)

# Print REMAP
print("      REMAP: {", file=fontData, end="")
first=True
for key in config.REMAP:
    if first:
        first=False
        print(file=fontData)
    else:
        print(",", file=fontData)
    print("        0x%04X: 0x%04X" % (key, config.REMAP[key]),
          end="", file=fontData)
print(file=fontData)
print("      },\n", file=fontData)

# Print REMAPACCENT
print("      REMAPACCENT: {", file=fontData, end="")
first=True
for key in config.REMAPACCENT:
    if first:
        first=False
        print(file=fontData)
    else:
        print(",", file=fontData)
    print('        "%s": "%s"' % (key, config.REMAPACCENT[key]),
          end="", file=fontData)
print(file=fontData)
print("      },\n", file=fontData)

# Print REMAPACCENTUNDER
print("      REMAPACCENTUNDER: {", file=fontData, end="")
first=True
for key in config.REMAPACCENTUNDER:
    if first:
        first=False
        print(file=fontData)
    else:
        print(",", file=fontData)
    print('        "%s": "%s"' % (key, config.REMAPACCENTUNDER[key]),
          end="", file=fontData)
print(file=fontData)
print("      },\n", file=fontData)

# Print DELIMITERS
splitter.addStretchyOperators(config.DELIMITERS)
splitter.verifyTeXSizeVariants(config.FONTDATA["TeX_factor"],
                               (0x28, 0x29, 0x2F, 0x5B, 0x5C, 0x5D, 0x7B, 0x7D,
                                0x2308, 0x2309, 0x230A, 0x230B, 0x23D0, 0x27E8,
                                0x27E9))
# Print the delimiters list
print("      DELIMITERS: {", file=fontData)
splitter.printDelimiters(fontData, 6, config.DELIMITERS_EXTRA)
print("      }", file=fontData)
print(file=fontData)

# close FONTDATA & HTMLCSS.Augment
print('\
    }\n\
  });', file=fontData)

# Print the font metrics
print("// MAIN FONT METRICS\n", file=fontData)

# Print the footer
print('\
  AJAX.loadComplete(HTMLCSS.fontDir + "/fontdata.js");\n\
\n\
})(MathJax.OutputJax["HTML-CSS"],MathJax.ElementJax.mml,MathJax.Ajax);',
      file=fontData)

fontData.close()

# Create the fontdata-extra.js file
fontData = open("%s/fontdata-extra.js" % FONTFAMILY, "w")

# print Header
desc="Adds extra stretchy characters to the %s fonts" % FONTFAMILY
print(HEADER %
      (("%s/fontdata-extra.js" % FONTFAMILY), desc, config.FONTDATA["Year"]),
      file=fontData)

print('\
(function (HTMLCSS) {\n\
  var VERSION = "%s";\n' % config.FONTDATA["FileVersion"], file=fontData)

print('\
  var DELIMITERS = HTMLCSS.FONTDATA.DELIMITERS;\n\n\
  var H = "H", V = "V";\n', file=fontData)

print(fontDeclaration, file=fontData)

print('  var delim = {', file=fontData)
splitter.printDelimiters(fontData, 4, config.DELIMITERS_EXTRA, True)
print('\
  };\n\
  \n\
  for (var id in delim) {if (delim.hasOwnProperty(id)) {DELIMITERS[id] = delim[id]}};\n\
\n\
  MathJax.Ajax.loadComplete(HTMLCSS.fontDir + "/fontdata-extra.js");\n\
\n\
})(MathJax.OutputJax["HTML-CSS"]);', file=fontData)

fontData.close()
