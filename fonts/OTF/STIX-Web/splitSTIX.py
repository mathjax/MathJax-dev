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

import argparse
import fontforge
import fontUtil

# Parse the command line arguments
parser = argparse.ArgumentParser()
parser.add_argument('fontdir', type=str)
args = parser.parse_args()
FONTDIR = args.fontdir

for weight in ["Regular", "Bold", "Italic", "BoldItalic"]:
    STIXfile="%s/STIX-%s.otf" % (FONTDIR, weight)
    STIX=fontforge.open(STIXfile)

    font=fontUtil.newFont(STIXfile, "Main", weight)
    if (weight != "BoldItalic"):
        fontUtil.copyFontCoverage(STIX, font,
                                  "%s/MathJax_Main-%s.otf" % (FONTDIR, weight))
    fontUtil.copyRange(STIX, font, 0x0000, 0x007F)
    fontUtil.copyGlyph(STIX, font, 0xFFFD)
    fontUtil.saveFont(font)

    if weight == "Regular":
        # TODO: the double-struck characters should be copied
        font=fontUtil.newFont(STIXfile, "AMS", "Regular")
        fontUtil.copyFontCoverage(STIX, font,
                                  "%s/MathJax_AMS-Regular.otf" % FONTDIR)
        fontUtil.saveFont(font)

    # TODO: create fonts for the Mathematical Alphanumeric Symbols.

    font=fontUtil.newFont(STIXfile, "Latin", weight)
    fontUtil.copyRange(STIX, font,
                       0x0080, 0x00FF) # Latin-1 Supplement
    fontUtil.copyRange(STIX, font,
                       0x0100, 0x017F) # Latin Extended-A
    fontUtil.copyRange(STIX, font,
                       0x0180, 0x024F) # Latin Extended-B
    fontUtil.copyRange(STIX, font,
                       0x1E00, 0x1EFF) # Latin Extended Additional
    fontUtil.saveFont(font)

    font=fontUtil.newFont(STIXfile, "Alphabets", weight)
    fontUtil.copyRange(STIX, font,
                       0x0370, 0x03FF) # Greek and Coptic
    fontUtil.copyRange(STIX, font,
                       0x0400, 0x04FF) # Cyrillic
    fontUtil.copyRange(STIX, font,
                       0x3040, 0x309F) # Hiragana
    fontUtil.copyRange(STIX, font,
                       0x2100, 0x214F) # Letterlike Symbols
    fontUtil.saveFont(font)

    font=fontUtil.newFont(STIXfile, "Marks", weight)
    fontUtil.copyRange(STIX, font,
                       0x02B0, 0x02FF) # Spacing Modifier Letters
    fontUtil.copyRange(STIX, font,
                       0x0300, 0x036F) # Combining Diacritical Marks
    fontUtil.copyRange(STIX, font,
                       0x20D0, 0x20FF) # Combining Diacritical Marks for Symbols
    fontUtil.copyRange(STIX, font,
                       0x2000, 0x206F) # General Punctuation
    fontUtil.copyRange(STIX, font,
                       0x3000, 0x303F) # CJK Symbols and Punctuation
    fontUtil.saveFont(font)

    if weight == "Regular" or weight == "Bold":
        font=fontUtil.newFont(STIXfile, "Arrows", weight)
        fontUtil.copyRange(STIX, font,
                           0x2190, 0x21FF) # Arrows
        fontUtil.copyRange(STIX, font,
                           0x27F0, 0x27FF) # Supplemental Arrows-A
        fontUtil.copyRange(STIX, font,
                           0x2900, 0x297F) # Supplemental Arrows-B
        fontUtil.saveFont(font)

    font=fontUtil.newFont(STIXfile, "Operators", weight)
    fontUtil.copyRange(STIX, font,
                       0x2200, 0x22FF)# Mathematical Operators
    fontUtil.copyRange(STIX, font,
                       0x2A00, 0x2AFF) # Supplemental Mathematical Operators
    fontUtil.saveFont(font)

    if weight == "Regular" or weight == "Bold":
        font=fontUtil.newFont(STIXfile, "Symbols", weight)
        fontUtil.copyRange(STIX, font,
                           0x2300, 0x23FF) # Miscellaneous Technical
        fontUtil.copyRange(STIX, font,     # Miscellaneous Mathematical
                           0x27C0, 0x27EF) # Symbols-A
        fontUtil.copyRange(STIX, font,     # Miscellaneous Mathematical
                           0x2980, 0x29FF) # Symbols-B
        fontUtil.saveFont(font)

    font=fontUtil.newFont(STIXfile, "Shapes", weight)
    fontUtil.copyRange(STIX, font,
                       0x25A0, 0x25FF) # Geometric Shapes
    fontUtil.copyRange(STIX, font,
                       0x2600, 0x26FF) # Miscellaneous Symbols
    fontUtil.copyRange(STIX, font,
                       0x2B00, 0x2BFF) # Miscellaneous Symbols and Arrows
    fontUtil.copyRange(STIX, font,
                       0x2580, 0x259F) # Block Elements
    fontUtil.copyRange(STIX, font,
                       0x2500, 0x257F) # Box Drawing
    fontUtil.copyRange(STIX, font,
                       0x2400, 0x243F) # Control Pictures
    fontUtil.saveFont(font)

    font=fontUtil.newFont(STIXfile, "Misc", weight)
    fontUtil.copyRange(STIX, font,
                       0x2070, 0x209F) # Superscripts and Subscripts
    fontUtil.copyRange(STIX, font,
                       0x2460, 0x24FF) # Enclosed Alphanumerics
    fontUtil.copyRange(STIX, font,
                       0x20A0, 0x20CF) # Currency Symbols
    fontUtil.copyRange(STIX, font,
                       0x1D00, 0x1D7F) # Phonetic Extensions
    fontUtil.copyRange(STIX, font,
                       0x1D80, 0x1DBF) # Phonetic Extensions Supplement
    fontUtil.copyRange(STIX, font,
                       0x2700, 0x27BF) # Dingbats
    fontUtil.copyRange(STIX, font,
                       0x2150, 0x218F) # Number Forms
    fontUtil.saveFont(font)
