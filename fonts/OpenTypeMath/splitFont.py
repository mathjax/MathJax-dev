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

import fontforge
import fontUtil
from fontSplitting import FONTSPLITTING


def boolToString(b):
    if b:
        return "true"
    else:
        return "false"

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
#subprocess.call("rm -f %s/ttf/* %s/otf/*" % (FONTFAMILY, FONTFAMILY),
#                shell=True)

# Import the configuration for this font family
sys.path.append("./%s" % FONTFAMILY)
config = __import__("config")
del sys.path[-1]
if config.MAINFONTS is None:
    # By default, use the MATHFONT
    config.MAINFONTS = { "Regular": config.MATHFONT }
if config.FONTDATA["TeX_factor"] is None:
    mainFont = fontforge.open("%s/%s" % (FONTDIR, config.MAINFONTS["Regular"]))
    config.FONTDATA["TeX_factor"] = float(mainFont.em) / mainFont["M"].width

# Split the Main fonts
for weight in []: # config.MAINFONTS:
    fontFile = "%s/%s" % (FONTDIR, config.MAINFONTS[weight])
    oldfont=fontforge.open(fontFile)
    oldfont.encoding = "UnicodeFull"

    for subset in FONTSPLITTING:
        name = subset[0]
        font=fontUtil.newFont(FONTFAMILY, fontFile, name, weight)
        for i in range(1,len(subset)):
            r = subset[i]
            if type(r) == int:
                fontUtil.moveGlyph(oldfont, font, r)
            else:
                fontUtil.moveRange(oldfont, font, r[0], r[1])
        fontUtil.saveFont(FONTFAMILY, font)

    # Save the rest of the glyphs in a NonUnicode font
    oldfont.fontname = ("%s_NonUnicode-%s" %
                            (oldfont.familyname.replace(" ", "_"), weight))
    fontUtil.saveFont(FONTFAMILY, oldfont)

# Split the Math font
splitter=fontUtil.mathFontSplitter(FONTFAMILY,
                                   "%s/%s" % (FONTDIR, config.MATHFONT))
splitter.split()

# Remove temporary files
subprocess.call("rm -f %s/otf/*.tmp" % FONTFAMILY, shell=True)


# Create the fontdata.js file
fontData = open("%s/fontdata.js" % FONTFAMILY, "w")

# Print the header
print('\
/*************************************************************\n\
 *\n\
 *  MathJax/jax/output/HTML-CSS/font/%s/fontdata.js\n\
 *  \n\
 *  Initializes the HTML-CSS OutputJax to use the %s fonts\n\
 *  for displaying mathematics.\n\
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
 */\n\
\n\
(function (HTMLCSS,AJAX) {\n\
  var VERSION = "%s";\n' % (FONTFAMILY, FONTFAMILY,
       config.FONTDATA["Year"], config.FONTDATA["FileVersion"]),
      file=fontData)

# Determine the list of fonts
fontList = commands.getoutput('ls %s/otf' % FONTFAMILY).\
    replace(".otf","").split("\n")
fontVarList = []

# Print the javascript variables for fonts
for i in range(0,len(fontList)):

    varName = fontList[i]
    varName = varName.split("_")
    if varName[1] == "Math":
        varName = varName[2].split("-")
        varName = "MATH%s" % varName[0].upper()
    else:
        varName = varName[1].upper().split("-")
        varName = varName[0] + varName[1]
    fontVarList.append(varName)

    varValue = fontList[i]
    varValue = varValue.replace("-Regular", "")
    varValue = varValue.replace("BoldItalic", "bold-italic")
    varValue = varValue.replace("Bold", "bold")
    varValue = varValue.replace("Italic", "italic")

    if i == 0:
        print('  var %s = "%s"' % (varName, varValue), file=fontData, end="")
    else:
        print(",", file=fontData)
        print('      %s = "%s"' % (varName, varValue), file=fontData, end="")

print(";", file=fontData)

# Print the main parameters
print('\n\
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

    print("        %s: %s" % (fontVarList[i], "null"), file=fontData, end="")

print(file=fontData)
print("      },\n", file=fontData)

# Print VARIANT
print("      VARIANT: {", file=fontData)
print('\
        "-largeOp": {fonts:[MATHSIZE1,MAIN]},\
        "-smallOp": {}', file=fontData)
print("      },\n", file=fontData)

# Print RANGES
print('\
      REMAP: {\n\
        {name: "alpha", low: 0x61, high: 0x7A, offset: "A", add: 26},\n\
        {name: "Alpha", low: 0x41, high: 0x5A, offset: "A"},\n\
        {name: "number", low: 0x30, high: 0x39, offset: "N"},\n\
        {name: "greek", low: 0x03B1, high: 0x03C9, offset: "G", add: 26},\n\
        {name: "Greek", low: 0x0391, high: 0x03F6, offset: "G"}\n\
      },\n', file=fontData)

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
splitter.printDelimiters(fontData, 6)
print("      }", file=fontData)
print(file=fontData)

# Print the font metrics
print("      // FONTMETRICS\n", file=fontData)

# Print the footer
print('\
  AJAX.loadComplete(HTMLCSS.fontDir + "/fontdata.js");\n\
\n\
})(MathJax.OutputJax["HTML-CSS"],MathJax.Ajax);', file=fontData)

fontData.close()
