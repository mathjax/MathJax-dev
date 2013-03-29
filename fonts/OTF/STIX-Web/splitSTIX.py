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

    # Main Font
    font=fontUtil.newFont(STIXfile, "Main", weight)
    fontUtil.moveRange(STIX, font, 0x0000, 0x007F) # Basic Latin
    fontUtil.moveRange(STIX, font, 0x0370, 0x03FF) # Greek and Coptic
    fontUtil.moveGlyph(STIX, font, 0xFFFD, 0xFFFD) # Specials
    # note: it is important to call moveFontCoverage *after* the other glyphs
    # have already been cut and paste.
    if weight == "Regular" or weight == "Bold" or weight == "Italic":
        # Move the glyphs covered by MathJax_Main into the Main font
        fontUtil.moveFontCoverage(STIX, font,
                                  "%s/MathJax_Main-%s.otf" % (FONTDIR, weight))
    if weight == "Regular":
        # Move the glyphs covered by MathJax_AMS into the Main font
        fontUtil.moveFontCoverage(STIX, font,
                                  "%s/MathJax_AMS-%s.otf" % (FONTDIR, weight))
    fontUtil.saveFont(font)

    # Mathematical Alphanumeric Symbols
    font=fontUtil.newFont(STIXfile, "Normal", weight)
    fontUtil.moveRange(STIX, font,
                       0x1D400, 0x1D433) # Bold
    fontUtil.moveRange(STIX, font,
                       0x1D434, 0x1D467) # Italic
    fontUtil.moveRange(STIX, font,
                       0x1D468, 0x1D49B) # Bold Italic
    fontUtil.moveGlyph(STIX, font, 0x1D6A4) # dotless i
    fontUtil.moveGlyph(STIX, font, 0x1D6A5) # dotless j
    fontUtil.moveRange(STIX, font,
                       0x1D6A8, 0x1D6E1) # Greek Bold
    fontUtil.moveRange(STIX, font,
                       0x1D6E2, 0x1D71B) # Greek Italic
    fontUtil.moveRange(STIX, font,
                       0x1D71C, 0x1D755) # Greek BoldItalic
    fontUtil.moveRange(STIX, font,
                       0x1D7CE, 0x1D7D7) # Bold digits
    fontUtil.moveGlyph(STIX, font, 0x210E) # Planck Constant
    fontUtil.saveFont(font)

    if weight == "Regular" or weight == "Italic" or weight == "BoldItalic":
        font=fontUtil.newFont(STIXfile, "Script", weight)
        fontUtil.moveRange(STIX, font,
                           0x1D49C, 0x1D4CF) # Script
        fontUtil.moveRange(STIX, font,
                           0x1D4D0, 0x1D503) # Bold Script
        fontUtil.moveGlyph(STIX, font, 0x212C) # Script B
        fontUtil.moveGlyph(STIX, font, 0x2130) # Script E
        fontUtil.moveGlyph(STIX, font, 0x2131) # Script F
        fontUtil.moveGlyph(STIX, font, 0x210B) # Script H
        fontUtil.moveGlyph(STIX, font, 0x2110) # Script I
        fontUtil.moveGlyph(STIX, font, 0x2112) # Script L
        fontUtil.moveGlyph(STIX, font, 0x2133) # Script M
        fontUtil.moveGlyph(STIX, font, 0x211B) # Script R
        fontUtil.moveGlyph(STIX, font, 0x212F) # Script e
        fontUtil.moveGlyph(STIX, font, 0x210A) # Script g
        fontUtil.moveGlyph(STIX, font, 0x2134) # Script o
        fontUtil.saveFont(font)

    if weight == "Regular" or weight == "Bold":
        font=fontUtil.newFont(STIXfile, "Fraktur", weight)
        fontUtil.moveRange(STIX, font,
                           0x1D504, 0x1D537) # Fraktur
        fontUtil.moveRange(STIX, font,
                           0x1D56C, 0x1D59F) # Bold Fraktur
        fontUtil.moveGlyph(STIX, font, 0x212D) # Script C
        fontUtil.moveGlyph(STIX, font, 0x210C) # Script H
        fontUtil.moveGlyph(STIX, font, 0x2111) # Script I
        fontUtil.moveGlyph(STIX, font, 0x211C) # Script R
        fontUtil.moveGlyph(STIX, font, 0x2128) # Script z
        fontUtil.saveFont(font)

    font=fontUtil.newFont(STIXfile, "DoubleStruck", weight)
    fontUtil.moveRange(STIX, font,
                       0x1D538, 0x1D56B) # DoubleStruck
    fontUtil.moveRange(STIX, font,
                       0x1D7D8, 0x1D7E1) # DoubleStruck digits
    fontUtil.moveGlyph(STIX, font, 0x2102) # Script C
    fontUtil.moveGlyph(STIX, font, 0x210D) # Script H
    fontUtil.moveGlyph(STIX, font, 0x2115) # Script N
    fontUtil.moveGlyph(STIX, font, 0x2119) # Script P
    fontUtil.moveGlyph(STIX, font, 0x211A) # Script Q
    fontUtil.moveGlyph(STIX, font, 0x211D) # Script R
    fontUtil.moveGlyph(STIX, font, 0x2124) # Script Z
    fontUtil.saveFont(font)

    font=fontUtil.newFont(STIXfile, "SansSerif", weight)
    fontUtil.moveRange(STIX, font,
                       0x1D5A0, 0x1D5D3) # Sans-Serif
    fontUtil.moveRange(STIX, font,
                       0x1D5D4, 0x1D607) # Sans-Serif Bold
    fontUtil.moveRange(STIX, font,
                       0x1D608, 0x1D63B) # Sans-Serif Italic
    fontUtil.moveRange(STIX, font,
                       0x1D63C, 0x1D66F) # Sans-Serif BoldItalic
    fontUtil.moveRange(STIX, font,
                       0x1D756, 0x1D7CB) # Greek Sans-Serif Bold
    fontUtil.moveRange(STIX, font,
                       0x1D7E2, 0x1D7EB) # Sans-Serif digits
    fontUtil.moveRange(STIX, font,
                       0x1D7EC, 0x1D7F5) # Sans-Serif Bold digits
    fontUtil.saveFont(font)

    if weight == "Regular":
        font=fontUtil.newFont(STIXfile, "Monospace", weight)
        fontUtil.moveRange(STIX, font,
                           0x1D670, 0x1D6A3) # Monospace
        fontUtil.moveRange(STIX, font,
                           0x1D7F6, 0x1D7FF) # Monospace digits
        fontUtil.saveFont(font)

    # Latin
    font=fontUtil.newFont(STIXfile, "Latin", weight)
    fontUtil.moveRange(STIX, font,
                       0x0080, 0x00FF) # Latin-1 Supplement
    fontUtil.moveRange(STIX, font,
                       0x0100, 0x017F) # Latin Extended-A
    fontUtil.moveRange(STIX, font,
                       0x0180, 0x024F) # Latin Extended-B
    fontUtil.moveRange(STIX, font,
                       0x1E00, 0x1EFF) # Latin Extended Additional
    fontUtil.moveRange(STIX, font,
                       0xA720, 0xA7FF) # Latin Extended-D
    fontUtil.moveRange(STIX, font,
                       0xFB00, 0xFB4F) # Alphabetic Presentation Forms
    fontUtil.saveFont(font)

    # Alphabets
    font=fontUtil.newFont(STIXfile, "Alphabets", weight)
    fontUtil.moveRange(STIX, font,
                       0x0400, 0x04FF) # Cyrillic
    fontUtil.moveRange(STIX, font,
                       0x3040, 0x309F) # Hiragana
    fontUtil.moveRange(STIX, font,
                       0x2100, 0x214F) # Letterlike Symbols
    fontUtil.saveFont(font)

    # Marks
    font=fontUtil.newFont(STIXfile, "Marks", weight)
    fontUtil.moveRange(STIX, font,
                       0x02B0, 0x02FF) # Spacing Modifier Letters
    fontUtil.moveRange(STIX, font,
                       0x0300, 0x036F) # Combining Diacritical Marks
    fontUtil.moveRange(STIX, font,
                       0x20D0, 0x20FF) # Combining Diacritical Marks for Symbols
    fontUtil.moveRange(STIX, font,
                       0x2000, 0x206F) # General Punctuation
    fontUtil.moveRange(STIX, font,
                       0x3000, 0x303F) # CJK Symbols and Punctuation
    fontUtil.saveFont(font)

    # Arrows
    if weight == "Regular" or weight == "Bold":
        font=fontUtil.newFont(STIXfile, "Arrows", weight)
        fontUtil.moveRange(STIX, font,
                           0x2190, 0x21FF) # Arrows
        fontUtil.moveRange(STIX, font,
                           0x27F0, 0x27FF) # Supplemental Arrows-A
        fontUtil.moveRange(STIX, font,
                           0x2900, 0x297F) # Supplemental Arrows-B
        fontUtil.saveFont(font)

    # Operators
    font=fontUtil.newFont(STIXfile, "Operators", weight)
    fontUtil.moveRange(STIX, font,
                       0x2200, 0x22FF)# Mathematical Operators
    fontUtil.moveRange(STIX, font,
                       0x2A00, 0x2AFF) # Supplemental Mathematical Operators
    fontUtil.saveFont(font)

    # Symbols
    if weight == "Regular" or weight == "Bold":
        font=fontUtil.newFont(STIXfile, "Symbols", weight)
        fontUtil.moveRange(STIX, font,
                           0x2300, 0x23FF) # Miscellaneous Technical
        fontUtil.moveRange(STIX, font,     # Miscellaneous Mathematical
                           0x27C0, 0x27EF) # Symbols-A
        fontUtil.moveRange(STIX, font,     # Miscellaneous Mathematical
                           0x2980, 0x29FF) # Symbols-B
        fontUtil.saveFont(font)

    # Shapes
    font=fontUtil.newFont(STIXfile, "Shapes", weight)
    fontUtil.moveRange(STIX, font,
                       0x25A0, 0x25FF) # Geometric Shapes
    fontUtil.moveRange(STIX, font,
                       0x2600, 0x26FF) # Miscellaneous Symbols
    fontUtil.moveRange(STIX, font,
                       0x2B00, 0x2BFF) # Miscellaneous Symbols and Arrows
    fontUtil.moveRange(STIX, font,
                       0x2580, 0x259F) # Block Elements
    fontUtil.moveRange(STIX, font,
                       0x2500, 0x257F) # Box Drawing
    fontUtil.moveRange(STIX, font,
                       0x2400, 0x243F) # Control Pictures
    fontUtil.saveFont(font)

    # Misc
    font=fontUtil.newFont(STIXfile, "Misc", weight)
    fontUtil.moveRange(STIX, font,
                       0x2070, 0x209F) # Superscripts and Subscripts
    fontUtil.moveRange(STIX, font,
                       0x2460, 0x24FF) # Enclosed Alphanumerics
    fontUtil.moveRange(STIX, font,
                       0x20A0, 0x20CF) # Currency Symbols
    fontUtil.moveRange(STIX, font,
                       0x1D00, 0x1D7F) # Phonetic Extensions
    fontUtil.moveRange(STIX, font,
                       0x1D80, 0x1DBF) # Phonetic Extensions Supplement
    fontUtil.moveRange(STIX, font,
                       0x0250, 0x02AF) # IPA Extensions
    fontUtil.moveRange(STIX, font,
                       0x2700, 0x27BF) # Dingbats
    fontUtil.moveRange(STIX, font,
                       0x2150, 0x218F) # Number Forms
    fontUtil.saveFont(font)

    # NonUnicode
    STIX.fontname = ("%s_NonUnicode-%s" %
                     (STIX.familyname.replace(" ", "_"), weight))
    fontUtil.saveFont(STIX)
