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
import fontforge
import fontUtil
from fontSplitting import FONTSPLITTING

# Parse the command line arguments
parser = argparse.ArgumentParser()
parser.add_argument('fontfamily', type=str)
parser.add_argument('fontdir', type=str)
args = parser.parse_args()
FONTDIR = args.fontdir
FONTFAMILY = args.fontfamily

# Import the configuration for this font family
sys.path.append("./%s" % FONTFAMILY)
config = __import__("config")
del sys.path[-1]

# Split the Math font
splitter=fontUtil.mathFontSplitter(FONTFAMILY,
                                   "%s/%s" % (FONTDIR, config.MATHFONT))
splitter.split()

fontData = open("%s/delimiters.txt" % FONTFAMILY, "w")
splitter.printDelimiters(fontData)
fontData.close()

# Split the Main fonts
if config.MAINFONTS is None:
    # By default, use the MATHFONT
    config.MAINFONTS = { "Regular": config.MATHFONT }

for weight in config.MAINFONTS:
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
