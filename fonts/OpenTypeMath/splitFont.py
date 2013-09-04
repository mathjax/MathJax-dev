# -*- Mode: Python; tab-width: 2; indent-tabs-mode:nil; -*-
# vim: set ts=2 et sw=2 tw=80:
#
# Copyright (c) 2013 The MathJax Consortium
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

from lxml import etree

def boolToString(b):
    if b:
        return "true"
    else:
        return "false"

MODES = {0:"HTML-CSS", 1:"SVG"}
HEADER='\
/*************************************************************\n\
 *\n\
 *  MathJax/jax/output/%s\n\
 *  \n\
%s\
 *  Copyright (c) %s The MathJax Consortium\n\
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
parser.add_argument('--skipMainFonts', action='store_true')
args = parser.parse_args()
FONTDIR = args.fontdir
FONTFAMILY = args.fontfamily
if (not os.path.exists("%s/config.py" % FONTFAMILY)):
    raise BaseException("%s/config.py does not exist!" % FONTFAMILY)

# Create/clean up the ttf, otf and svg directories
subprocess.call("mkdir -p %s/ttf %s/otf %s/svg"  %
                (FONTFAMILY, FONTFAMILY, FONTFAMILY),
                shell=True)
if not(args.skipMainFonts):
    subprocess.call("rm -f %s/ttf/* %s/otf/* %s/svg/*" %
                    (FONTFAMILY, FONTFAMILY, FONTFAMILY),
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

################################################################################

# Split the Main fonts
if not(args.skipMainFonts):

    for weight in config.MAINFONTS:
        fontFile = "%s/%s" % (FONTDIR, config.MAINFONTS[weight])
        oldfont=fontforge.open(fontFile)
        oldfont.encoding = "UnicodeFull"

        for subset in FONTSPLITTING:
            name = subset[0]
            font=fontUtil.newFont(FONTFAMILY, fontFile, config, name, weight)
            fontUtil.moveSubset(oldfont, font, subset)

            if name in config.FONTSPLITTING_EXTRA:
                fontUtil.moveSubset(oldfont, font,
                                    config.FONTSPLITTING_EXTRA[name])

            if name == "Monospace" and "u1D670" in font:
                # For the monospace font, ensure that the space has the
                # same width as the other characters. See MathJax's issue 380.
                font[0x20].width = font["u1D670"].width
                font.selection.select(0x20)
                font.copy()
                font.selection.select(0xA0)
                font.paste()

            fontUtil.saveFont(FONTFAMILY, font)
            font.close()

        # Save the rest of the glyphs in a NonUnicode font
        font=fontUtil.newFont(FONTFAMILY, fontFile, config, "NonUnicode", weight)
        PUAPointer = 0xE000
        for g in oldfont.glyphs():

            if g.glyphname == ".notdef":
                continue

            if PUAPointer > 0xF8FF:
                raise BaseException("Too many characters in the Plane 0 PUA. Not supported by the font splitter.")

            if fontUtil.hasNonEmptyGlyph(oldfont, PUAPointer):
                print("Warning: 0x%X is already present in the Plane 0 PUA of the original font. %s will not be moved." % (PUAPointer, g.glyphname),
                      file=sys.stderr)
                fontUtil.moveGlyph(oldfont, font, g.glyphname)
            else:
                fontUtil.moveGlyph(oldfont, font, g.glyphname, PUAPointer)

            PUAPointer += 1

        fontUtil.saveFont(FONTFAMILY, font)
        font.close()
        oldfont.close()

# Split the Math font
splitter=fontUtil.mathFontSplitter(FONTFAMILY, FONTDIR, config)
splitter.split()

# Remove temporary files
subprocess.call("rm -f %s/otf/*.tmp" % FONTFAMILY, shell=True)

###############################################################################

fontData = {}
for m in MODES:
    # Create the fontdata.js file
    fontData[m] = open("%s/%s/fontdata.js" % (FONTFAMILY, MODES[m]), "w")

    # Print the header
    desc = (" *  Initializes the %s OutputJax to use the %s fonts\n\n" %
            (MODES[m], FONTFAMILY))
    print(HEADER %
          (("%s/fonts/%s/fontdata.js" % (MODES[m], FONTFAMILY)),
           desc, config.FONTDATA["Year"]),
          file=fontData[m])

modeVar = {}
for m in MODES:
    modeVar[m] = MODES[m].replace("-", "")

print('\
(function (%s,MML,AJAX) {\n' % modeVar[0], file=fontData[0])
print('\
(function (%s,MML,AJAX,HUB) {\n' % modeVar[1], file=fontData[1])

for m in MODES:
    print('\
    var VERSION = "%s";\n' % (config.FONTDATA["FileVersion"]),
          file=fontData[m])

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

# Neo-Euler lacks some characters from the Mathematical Alphanumeric Symbols
# so map them to the normal font instead.
# See https://github.com/khaledhosny/euler-otf/issues/14
for variant in ["DOUBLESTRUCK", "SANSSERIF", "MONOSPACE"]:
    if variant not in fontVarList:
        fontDeclaration += ",\n"
        fontDeclaration += '      %s = "%s_Normal"' % (variant, config.FONTNAME_PREFIX)

fontDeclaration += ";\n"

for m in MODES:
    print(fontDeclaration, file=fontData[m])

# Print the main parameters
for m in MODES:
    print('\
  var H = "H", V = "V", EXTRAH = {load:"extra", dir:H}, EXTRAV = {load:"extra", dir:V};\n\n\
  %s.Augment({\n\
    FONTDATA: {\n\
      version: VERSION,\n\
\n' % modeVar[m], file=fontData[m])

print('\
      TeX_factor: %.3f,\n\
      baselineskip: %.3f,\n\
      lineH: %.3f, lineD: %.3f,\n\
\n\
      hasStyleChar: %s,  // char 0xEFFD encodes font style\n\
' % (config.FONTDATA["TeX_factor"],
     config.FONTDATA["baselineskip"],
     config.FONTDATA["lineH"],
     config.FONTDATA["lineD"],
     boolToString(config.FONTDATA["hasStyleChar"])), file=fontData[0])

print('\
      baselineskip: %d,\n\
      lineH: %d, lineD: %d,\n\
' % (config.FONTDATA["baselineskip"] * 1000,
     config.FONTDATA["lineH"] * 1000,
     config.FONTDATA["lineD"] * 1000), file=fontData[1])

# Print FONTS
for m in MODES:
    print("      FONTS: {", file=fontData[m])
    for i in range(0,len(fontList)):
        if i > 0:
            print(",", file=fontData[m])

        font = fontList[i].split("_")[-1].split("-")
        family = font[0]
        style = font[1]

        fileName = "Main.js"
        print('        "%s": "%s/%s/%s"' %
              (fontVarValue[i], family, style, fileName),
              file=fontData[m], end="")

    print(file=fontData[m])
    print("      },\n", file=fontData[m])

# Print VARIANT
for m in MODES:
    print("      VARIANT: {", file=fontData[m])


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

for m in MODES:
    print('          "normal": {fonts: [%s]},' %
          ",".join(fontList2[""]), file=fontData[m])

    print('          "bold": {fonts: [%s], bold:true' %
          ",".join(fontList2["BOLD"]), file=fontData[m])
    if MATHONLY:
        print(', offsetA: 0x1D400, offsetG: 0x1D6A8, offsetN: 0x1D7CE', file=fontData[m], end="")
    print('},', file=fontData[m])

    print('          "italic": {fonts: [%s], italic:true' %
          ",".join(fontList2["ITALIC"]), file=fontData[m], end="")
    if MATHONLY:
        print(', offsetA: 0x1D434, offsetG: 0x1D6E2, remap: {0x1D455: 0x210E}', file=fontData[m], end="")
    print('},', file=fontData[m])

    print('          "bolditalic": {fonts: [%s], bold: true, italic:true' %
          ",".join(fontList2["BOLDITALIC"]), file=fontData[m])
    if MATHONLY:
        print(', offsetA: 0x1D468, offsetG: 0x1D71C', file=fontData[m], end="")
    print('},', file=fontData[m])

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
            fonts: [SCRIPTITALIC], italic:true,\n\
            offsetA: 0x1D49C,\n\
            remap: {0x1D49D: 0x212C, 0x1D4A0: 0x2130, 0x1D4A1: 0x2131, 0x1D4A3: 0x210B, 0x1D4A4: 0x2110, 0x1D4A7: 0x2112, 0x1D4A8: 0x2133, 0x1D4AD: 0x211B, 0x1D4BA: 0x212F, 0x1D4BC: 0x210A, 0x1D4C4: 0x2134},\n\
          },\n\
          "bold-script": {\n\
            fonts: [SCRIPTBOLDITALIC], bold:true, italic:true,\n\
            offsetA: 0x1D4D0\n\
          },\n\
          "sans-serif": {\n\
            fonts: [SANSSERIF,NONUNICODE],\n\
            offsetA: 0x1D5A0,\n\
            offsetN: 0x1D7E2,\n\
            offsetG: 0xE17D\n\
          },\n\
          "bold-sans-serif": {\n\
            fonts: [SANSSERIFBOLD], bold:true,\n\
            offsetA: 0x1D5D4,\n\
            offsetN: 0x1D7EC,\n\
            offsetG: 0x1D756\n\
          },\n\
          "sans-serif-italic": {\n\
             fonts: [SANSSERIFITALIC,NONUNICODEITALIC], italic: true,\n\
             offsetA: 0x1D608,\n\
             offsetN: 0xE1B4,\n\
             offsetG: 0xE1BF\n\
          },\n\
          "sans-serif-bold-italic": {\n\
             fonts: [SANSSERIFBOLDITALIC,NONUNICODEBOLDITALIC], bold:true, italic: true,\n\
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

for m in MODES:
    print(mathvariants, file=fontData[m])

# STIX Variants
if config.STIXVARIANT is not None:
    fonts = config.STIXVARIANTFONTS

    for f in fontList2[""]:
        if f not in config.STIXVARIANTFONTS:
            fonts.append(f)

    fonts = ",".join(fonts)

    for m in MODES:
        print('        "-STIX-Web-variant": {%s, fonts: [%s]},' %
              (config.STIXVARIANT, fonts), file=fontData[m])

# tex-caligraphic
fonts = config.TEXCALIGRAPHICFONTS

for f in fontList2["ITALIC"]:
    if f not in config.TEXCALIGRAPHICFONTS:
        fonts.append(f)

fonts = ",".join(fonts)

for m in MODES:
    if config.TEXCALIGRAPHIC is None:
        print('          "-tex-caligraphic": {fonts: [%s], italic: true},' % fonts, file=fontData[m])
    else:
        print('          "-tex-caligraphic": {%s, fonts: [%s], italic: true},' %
              (config.TEXCALIGRAPHIC, fonts), file=fontData[m])

# tex-oldstyle
fonts = config.TEXOLDSTYLEFONTS

for f in fontList2[""]:
    if f not in config.TEXOLDSTYLEFONTS:
        fonts.append(f)

fonts = ",".join(fonts)

for m in MODES:
    if config.TEXOLDSTYLE is None:
        print('          "-tex-oldstyle": {fonts: [%s]},' % fonts,
              file=fontData[m])
    else:
        print('          "-tex-oldstyle": {%s, fonts: [%s]},' %
              (config.TEXOLDSTYLE, fonts), file=fontData[m])

# mathit
for m in MODES:
    print('          "-tex-mathit": {fonts: [%s], italic:true, noIC:true},' %
          ",".join(fontList2["ITALIC"]), file=fontData[m])

# operators
for m in MODES:
    print('          "-largeOp": {fonts:[SIZE1,MAIN]},', file=fontData[m])
    print('          "-smallOp": {%s}' % config.SMALLOPFONTS, file=fontData[m])

for m in MODES:
    print("      },\n", file=fontData[m])

# Print RANGES
for m in MODES:
    print('\
      RANGES: [\n\
        {name: "alpha", low: 0x61, high: 0x7A, offset: "A", add: 26},\n\
        {name: "Alpha", low: 0x41, high: 0x5A, offset: "A"},\n\
        {name: "number", low: 0x30, high: 0x39, offset: "N"},\n\
        {name: "greek", low: 0x03B1, high: 0x03C9, offset: "G", add: 26},\n\
        {name: "Greek", low: 0x0391, high: 0x03F6, offset: "G",\n\
           remap: {0x03F5: 52, 0x03D1: 53, 0x03F0: 54, 0x03D5: 55, 0x03F1: 56, 0x03D6: 57, 0x03F4: 17}}\n\
      ],\n', file=fontData[m])

# Print RULECHAR,
for m in MODES:
    print("      RULECHAR: 0x%04X,\n\n" % config.RULECHAR,
          file=fontData[m], end="")

# Print REMAP
for m in MODES:
    print("      REMAP: {", file=fontData[m], end="")
    first=True
    for key in config.REMAP:
        if first:
            first=False
            print(file=fontData[m])
        else:
            print(",", file=fontData[m])
        print("        0x%04X: 0x%04X" % (key, config.REMAP[key]),
              end="", file=fontData[m])
    print(file=fontData[m])
    print("      },\n", file=fontData[m])

# Print REMAPACCENT
for m in MODES:
    print("      REMAPACCENT: {", file=fontData[m], end="")
    first=True
    for key in config.REMAPACCENT:
        if first:
            first=False
            print(file=fontData[m])
        else:
            print(",", file=fontData[m])
        print('        "%s": "%s"' % (key, config.REMAPACCENT[key]),
              end="", file=fontData[m])
    print(file=fontData[m])
    print("      },\n", file=fontData[m])

# Print REMAPACCENTUNDER
for m in MODES:
    print("      REMAPACCENTUNDER: {", file=fontData[m], end="")
    first=True
    for key in config.REMAPACCENTUNDER:
        if first:
            first=False
            print(file=fontData[m])
        else:
            print(",", file=fontData[m])
            print('        "%s": "%s"' % (key, config.REMAPACCENTUNDER[key]),
                  end="", file=fontData[m])
    print(file=fontData[m])
    print("      },\n", file=fontData[m])

# Print DELIMITERS
splitter.verifyTeXSizeVariants(config.FONTDATA["TeX_factor"],
                               (0x28, 0x29, 0x2F, 0x5B, 0x5C, 0x5D, 0x7B, 0x7D,
                                0x2308, 0x2309, 0x230A, 0x230B, 0x23D0, 0x27E8,
                                0x27E9))
# Print the delimiters list
for m in MODES:
    print("      DELIMITERS: {", file=fontData[m])
    splitter.printDelimiters(fontData[m], MODES[m], 6)
    print("      }", file=fontData[m])
    print(file=fontData[m])

# close FONTDATA & *.Augment
for m in MODES:
    print('\
    }\n\
  });', file=fontData[m])

# TODO: Print the main font metrics?
# print("// MAIN FONT METRICS\n", file=fontData[m])

# Print some adjustments
for m in MODES:
    adjust = open("%s/%s/fontdata-adjust.js" % (FONTFAMILY, MODES[m]), "r")
    for line in adjust:
        print(line, file=fontData[m], end="")

# Print the footer
print('\
  AJAX.loadComplete(HTMLCSS.fontDir + "/fontdata.js");\n\
\n\
})(MathJax.OutputJax["HTML-CSS"],MathJax.ElementJax.mml,MathJax.Ajax);',
      file=fontData[0])
print('\
  AJAX.loadComplete(SVG.fontDir + "/fontdata.js");\n\
\n\
})(MathJax.OutputJax.SVG,MathJax.ElementJax.mml,MathJax.Ajax,MathJax.Hub);',
      file=fontData[1])

for m in MODES:
    fontData[m].close()

# Create the fontdata-extra.js file
for m in MODES:
    fontData[m] = open("%s/%s/fontdata-extra.js" % (FONTFAMILY, MODES[m]), "w")

    # print Header
    desc=" *  Adds extra stretchy characters to the %s fonts\n\n" % FONTFAMILY
    print(HEADER %
          (("%s/fonts/%s/fontdata-extra.js" % (MODES[m], FONTFAMILY)), desc,
           config.FONTDATA["Year"]), file=fontData[m])

    print('\
(function (%s) {\n\
  var VERSION = "%s";\n' % (modeVar[m],
                            config.FONTDATA["FileVersion"]), file=fontData[m])

    print('\
  var DELIMITERS = %s.FONTDATA.DELIMITERS;\n\n\
  var H = "H", V = "V";\n' % modeVar[m], file=fontData[m])

    print(fontDeclaration, file=fontData[m])

    print('  var delim = {', file=fontData[m])
    splitter.printDelimiters(fontData[m], MODES[m], 4, True)
    print('\
  };\n\
  \n\
  for (var id in delim) {if (delim.hasOwnProperty(id)) {DELIMITERS[id] = delim[id]}};\n\
\n\
  MathJax.Ajax.loadComplete(%s.fontDir + "/fontdata-extra.js");\n\
\n\
})(MathJax.OutputJax["%s"]);' % (modeVar[m], MODES[m]), file=fontData[m])

fontData[m].close()

# Creating the font metrics data
for i in range(0,len(fontList)):

    fileName = fontList[i]
    print("Generating metrics for %s..." % fileName)
    x = fileName.split("_")[1].split("-")
    fontName = x[0]
    fontStyle = x[1]

    jsFile = "Main"
    for m in MODES:
        directory = ("%s/%s/%s/%s/" %
                        (FONTFAMILY, MODES[m], fontName, fontStyle))
        subprocess.call("mkdir -p %s" % directory, shell=True)

        fontData[m] = open("%s/%s.js" % (directory, jsFile), "w")

        print(HEADER %
              ("%s/fonts/%s/%s/%s/%s.js" % (MODES[m],
                                      FONTFAMILY, fontName, fontStyle, jsFile),
               "", config.FONTDATA["Year"]), file=fontData[m])

    font = fontforge.open("%s/otf/%s.otf" % (FONTFAMILY, fileName))
    SVGdoc = etree.parse("%s/svg/%s.svg" % (FONTFAMILY, fileName)).getroot()

    if fontStyle == "Bold":
        fontName2 = fontName + "-bold"
    elif fontStyle == "Italic":
        fontName2 = fontName + "-italic"
    elif fontStyle == "BoldItalic":
        fontName2 = fontName + "-bold-italic"
    else:
        fontName2 = fontName

    # Header
    for m in MODES:
        print("MathJax.OutputJax['%s'].FONTDATA.FONTS['%s_%s'] = {" %
              (MODES[m], config.FONTNAME_PREFIX, fontName2), file=fontData[m])
        print("  directory: '%s/%s'," % (fontName, fontStyle),
              file=fontData[m])
        print("  family: '%s_%s'," % (config.FONTNAME_PREFIX, fontName),
              file=fontData[m])

        if fontStyle == "Bold" or fontStyle == "BoldItalic":
            print("  weight: 'bold',", file=fontData[m])
    
        if fontStyle == "Italic" or fontStyle == "BoldItalic":
            print("  style: 'italic',", file=fontData[m])

        # TODO?
        # print("  skew: {},\n", file=fontData[m])

    # HTML-CSS: add a test string
    print("  testString: '%s'" % fontUtil.getTestString(font, 15),
          file=fontData[0], end="")

    # SVG: add an id
    SVGid = (FONTFAMILY + fontName).replace("-","").upper();
    if fontStyle == "Bold" or fontStyle == "BoldItalic":
        SVGid += "B"
    if fontStyle == "Italic" or fontStyle == "BoldItalic":
        SVGid += "I"
    print("  id: '%s'" % SVGid,  file=fontData[1], end="")

    # print the metrics
    for glyph in font.glyphs():

        if glyph.glyphname in [".notdef", ".null", "nonmarkingreturn"]:
            continue
        
        v = glyph.unicode

        if (v == -1 or (0xEFFD <= v and v <= 0xEFFF)):
            # Ignore non-Unicode and PUA glyphs
            continue

        # Glyph metrics
        for m in MODES:
            print(",", file=fontData[m])
            b = glyph.boundingBox() # (xmin, ymin, xmax, ymax)
            print("  0x%X: [%d,%d,%d,%d,%d" % (v, 
                                               b[3],
                                               -b[1],
                                               glyph.width,
                                               glyph.left_side_bearing,
                                               glyph.width -
                                               glyph.right_side_bearing),
                  file=fontData[m], end="")

        # For SVG, we add the path description too.
        # No need for namespaces={'s': 'http://www.w3.org/2000/svg'},
        # as Font Forge does not attach any xmlns namespace to the <svg> root
        glyphNode = SVGdoc.\
            xpath('/svg/defs/font/glyph[@glyph-name="%s"]' % glyph.glyphname)
        if len(glyphNode) == 0:
            print(glyph.glyphname)
            raise BaseException("Unable to find the glyph")
        else:
            glyphNode = glyphNode[0]
        
        if "d" in glyphNode.attrib:
            path = glyphNode.attrib["d"]
            path = re.match(r"^M(.*)Z", path, flags=re.IGNORECASE).group(1)
        else:
            path = ""
        print(",'%s'" % path, file=fontData[1], end="")

        for m in MODES:
            print("]", file=fontData[m], end="")

    for m in MODES:
        print('', file=fontData[m])
        print('};', file=fontData[m])

    # print footer
    print('\
\n\
MathJax.Callback.Queue(\n\
  ["initFont",MathJax.OutputJax["%s"],"%s_%s"],\n\
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["%s"].fontDir+"/%s/%s/%s.js"]\n\
);' % (MODES[0], config.FONTNAME_PREFIX, fontName2,
       MODES[0], fontName, fontStyle, jsFile), file=fontData[0])

    print('\
\n\
MathJax.Ajax.loadComplete(MathJax.OutputJax.%s.fontDir+"/%s/%s/%s.js");'
              % (MODES[1], fontName, fontStyle, jsFile), file=fontData[1])

    font.close()
    fontData[m].close()
