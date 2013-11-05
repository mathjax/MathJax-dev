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

# This table must be sorted.
#
# fontUtil::computeNormalSizeSplitting assumes the table to be sorted. If it
# does not found a character, it will assume it is "NONUNICODE".
#

COPYRIGHT = "Copyright (c) 2013 The MathJax Consortium"

FONTSPLITTING = [
    ["Main",
     (0x0000, 0x007F), # Basic Latin
     
     # MathJax_Main, Latin-1 Supplement
     0x00A0,           
     0x00A3, # pound sign
     0x00A5, # MathJax_AMS
     0x00A7, # section symbol
     0x00A8,
     0x00AC,
     0x00AE, # MathJax_AMS
     (0x00AF,0x00B1),
     0x00B4,
     0x00B5, # mu
     0x00B7, # middle dot
     0x00D7,
     0x00F0, # MathJax_AMS
     0x00F7,

     # MathJax_Main, Latin Extended-A
     0x0127, # MathJax_AMS
     0x0131,

     # MathJax_Main, Latin Extended-B
     0x0237,

     # MathJax_Main, Spacing Modifier Letters, 
     (0x02C6,0x02C7),
     (0x02C9,0x02CB),
     (0x02D8,0x02DA),
     0x02DC,

     # MathJax_Main, Combining Diacritical Marks
     (0x0300,0x0304),
     (0x0306,0x0308),
     (0x030A,0x030C),
     0x0338,

     (0x0370, 0x037D), # Greek and Coptic
     (0x037F, 0x0383), # Greek and Coptic
     (0x0391, 0x03A9), # Greek and Coptic
     (0x03B1, 0x03C9), # Greek and Coptic
     (0x03CF, 0x03FF), # Greek and Coptic

     # MathJax_Main, General Punctuation
     (0x2002,0x2006),
     (0x2009,0x200A),
     (0x2013,0x2014),
     0x2016,
     (0x2018,0x2019),
     (0x201C,0x201D),
     (0x2020,0x2021),
     0x2026,
     0x2032,
     0x2033, # double prime
     0x2034, # triple prime
     0x2035, # MathJax_AMS
     0x203E, # overline
     0x2044,
     0x2057, # quadruple prime

     # MathJax_Main, Combining Diacritical Marks for Symbols
     0x20D7,

     # MathJax_Main, Letterlike Symbols
     0x210F,
     0x2111,
     0x2113,
     0x2118,
     0x211C,
     0x2127, # MathJax_AMS
     0x2132, # MathJax_AMS
     0x2135,
     (0x2136,0x2138), # MathJax_AMS
     0x2141, # MathJax_AMS

     # MathJax_Main, Arrows
     (0x2190,0x2199),
     (0x219A,0x219B), # MathJax_AMS
     0x219E, # MathJax_AMS
     0x21A0, # MathJax_AMS
     (0x21A2,0x21A3), # MathJax_AMS
     0x21A6,
     (0x21A9,0x21AA),
     (0x21AB,0x21AE), # MathJax_AMS
     (0x21B0,0x21B1), # MathJax_AMS
     (0x21B6,0x21B7), # MathJax_AMS
     (0x21BA,0x21BB), # MathJax_AMS
     (0x21BC,0x21BD),
     (0x21BE,0x21BF), # MathJax_AMS
     (0x21C0,0x21C1),
     (0x21C2,0x21C4), # MathJax_AMS
     (0x21C6,0x21CF), # MathJax_AMS
     (0x21D0,0x21D5),
     (0x21DA,0x21DB), # MathJax_AMS
     0x21DD, # MathJax_AMS
     0x21E0, # MathJax_AMS
     0x21E2, # MathJax_AMS
     
     # MathJax_Main, Mathematical Operators
     0x2200,
     0x2201, # MathJax_Main
     (0x2202,0x2203),
     (0x2204,0x2205), # MathJax_Main
     (0x2207,0x2209),
     0x220B,
     0x220D, # MathJax_AMS
     (0x2212,0x2213),
     0x2214, # MathJax_AMS
     (0x2215,0x221A),
     (0x221D,0x221E),
     (0x2220,0x2226), # MathJax_AMS ; MathJax_Main: 0x2220, 0x2223, 0x2225,
     (0x2227,0x222B),
     (0x2234,0x2235), # MathJax_AMS
     (0x223C,0x223D), # MathJax_AMS ; MathJax_Main: 0x223C
     0x2240,
     (0x2241,0x2242), # MathJax_AMS
     0x2243,
     0x2245,
     0x2246, # MathJax_AMS
     0x2248,
     0x224A, # MathJax_AMS
     0x224D,
     (0x224E,0x224F), # MathJax_AMS
     0x2250,
     (0x2251,0x2253), # MathJax_AMS
     (0x2256,0x2257), # MathJax_AMS
     0x225C, # MathJax_AMS
     (0x2260,0x2261),
     (0x2264,0x2265),
     (0x2266,0x2269), # MathJax_AMS
     (0x226A,0x226B),
     0x226C, # MathJax_AMS
     (0x226E,0x2273), # MathJax_AMS
     (0x2276,0x2277), # MathJax_AMS
     (0x227A,0x227B),
     (0x227C,0x2281), # MathJax_AMS
     (0x2282,0x2283),
     (0x2286,0x2287),
     (0x2288,0x228B), # MathJax_AMS
     0x228E,
     (0x228F,0x2290), # MathJax_AMS
     (0x2291,0x2299),
     (0x229A,0x229B), # MathJax_AMS
     (0x229D,0x22A1), # MathJax_AMS
     (0x22A2,0x22A5),
     (0x22A8,0x22AA), # MathJax_AMS ; MathJax_Main: 0x22A8
     (0x22AC,0x22AF), # MathJax_AMS
     (0x22B2,0x22B5), # MathJax_AMS
     0x22B8, # MathJax_AMS
     (0x22BA,0x22BC), # MathJax_AMS
     (0x22C4,0x22C6),
     0x22C8,
     (0x22C9,0x22D4), # MathJax_AMS
     (0x22D6,0x22DB), # MathJax_AMS
     (0x22DE,0x22E1), # MathJax_AMS
     (0x22E6,0x22ED), # MathJax_AMS
     (0x22EE,0x22EF),
     0x22F1,

     # MathJax_Main, Miscellaneous Technical
     (0x2308,0x230B),
     (0x2322,0x2323),
     (0x23B0,0x23B1),
     0x23B4,
     0x23B5,
     0x23D0,
     (0x23DC, 0x23E1),

     # MathJax_AMS, Enclosed Alphanumerics
     0x24C8,

     # MathJax_AMS, Box Drawing
     0x250C,
     0x2510,
     0x2514,
     0x2518,
     (0x2571,0x2572),

     # MathJax_Main, Geometric Shapes
     (0x25A0,0x25A1), # MathJax_AMS
     0x25B2, # MathJax_AMS
     0x25B3,
     0x25B6, # MathJax_AMS
     0x25B8,
     0x25B9,
     0x25BC, # MathJax_AMS
     0x25BD,
     0x25C0, # MathJax_AMS
     0x25C2,
     0x25C3,
     0x25CA, # MathJax_AMS
     0x25EF,

     # MathJax_Main, Miscellaneous Symbols
     (0x2660,0x2663),
     (0x266D,0x266F),

     # MathJax_AMS, Dingbats
     0x2713,
     0x2720,

     # MathJax_Main, Miscellaneous Mathematical
     (0x27E8,0x27E9),
     (0x27EE,0x27EF),

     # MathJax_Main, Supplemental Arrows
     (0x27F5,0x27FA),
     0x27FC,

     # Miscellaneous Mathematical Symbols-B
     0x2997,
     0x2998,
     0x29EB,
     0x29F5,
     0x29F8,
     0x29F9,

     # MathJax_Main, Supplemental Mathematical
     0x2A3F,
     0x2A5E,
     (0x2A7D,0x2A7E),
     (0x2A85,0x2A8C),
     (0x2A95,0x2A96),
     (0x2AAF,0x2AB0),
     (0x2AB5,0x2ABA),
     (0x2AC5,0x2AC6),
     (0x2ACB,0x2ACC),

     0xFFFD           # Specials
     ],
    ["Normal",
     0x210E,             # Planck Constant
     (0x1D400, 0x1D433), # Bold
     (0x1D434, 0x1D467), # Italic
     (0x1D468, 0x1D49B), # Bold Italic
     (0x1D6A4, 0x1D6A5), # dotless i j
     (0x1D6A8, 0x1D6E1), # Greek Bold
     (0x1D6E2, 0x1D71B), # Greek Italic
     (0x1D71C, 0x1D755), # Greek BoldItalic
     (0x1D7CE, 0x1D7D7)  # Bold digits
     ], 
    ["Script", 
     0x210A, # Script g
     0x210B, # Script H
     0x2110, # Script I
     0x2112, # Script L
     0x211B, # Script R
     0x212C, # Script B
     0x212F, # Script e
     0x2130, # Script E
     0x2131, # Script F
     0x2133, # Script M
     0x2134, # Script o
     (0x1D49C, 0x1D4CF), # Script
     (0x1D4D0, 0x1D503) # Bold Script
     ],
    ["Fraktur",
     0x210C, # Script H
     0x2111, # Script I
     0x211C, # Script R
     0x2128, # Script z
     0x212D, # Script C
     (0x1D504, 0x1D537), # Fraktur
     (0x1D56C, 0x1D59F) # Bold Fraktur
    ],
    ["DoubleStruck",
     0x2102, # DoubleStruck C
     0x210D, # DoubleStruck H
     0x2115, # DoubleStruck N
     0x2119, # DoubleStruck P
     0x211A, # DoubleStruck Q
     0x211D, # DoubleStruck R
     0x2124, # DoubleStruck Z
     (0x213C, 0x2140), # DoubleStruck pi, gamma, Gamma, Sigma
     (0x2145, 0x2149), # DoubleStruck Italic D, d, e, i, j
     (0x1D538, 0x1D56B), # DoubleStruck
     (0x1D7D8, 0x1D7E1) # DoubleStruck digits
     ],
    ["SansSerif",
     (0x1D5A0, 0x1D5D3), # Sans-Serif
     (0x1D5D4, 0x1D607), # Sans-Serif Bold
     (0x1D608, 0x1D63B), # Sans-Serif Italic
     (0x1D63C, 0x1D66F), # Sans-Serif BoldItalic
     (0x1D756, 0x1D7CB), # Greek Sans-Serif Bold
     (0x1D7E2, 0x1D7EB), # Sans-Serif digits
     (0x1D7EC, 0x1D7F5)  # Sans-Serif Bold digits
     ],
    ["Monospace",
     (0x1D670,0x1D6A3), # Monospace
     (0x1D7F6,0x1D7FF), # Monospace digits
     ],
    ["Latin",
     (0x0080, 0x00FF), # Latin-1 Supplement
     (0x0100, 0x017F), # Latin Extended-A
     (0x0180, 0x024F), # Latin Extended-B
     (0x1E00, 0x1EFF), # Latin Extended Additional
     (0xA720, 0xA7FF), # Latin Extended-D
     (0xFB00, 0xFB4F) # Alphabetic Presentation Forms
     ],
    ["Alphabets",
     (0x0384, 0x0390), # Greek and Coptic
     (0x03AA, 0x03B0), # Greek and Coptic
     (0x03CA, 0x03CE), # Greek and Coptic
     (0x0400, 0x04FF), # Cyrillic
     0x0E3F, # thai currency symbol baht
     (0x13A0, 0x13FF), # Cherokee
     (0x2100, 0x214F), # Letterlike Symbols
     (0x3040, 0x309F), # Hiragana
     (0xFE70, 0xFFEF), # Arabic Presentation Forms-B
     (0x10140, 0x1018F) # Ancient Greek Numbers
     ],
    ["Marks",
     (0x02B0, 0x02FF), # Spacing Modifier Letters
     (0x0300, 0x036F), # Combining Diacritical Marks
     (0x2000, 0x206F), # General Punctuation
     (0x20D0, 0x20FF), # Combining Diacritical Marks for Symbols
     (0x2E00, 0x2E7F), # Supplemental Punctuation
     (0x3000, 0x303F) # CJK Symbols and Punctuation
     ],
    ["Arrows",
     (0x2190, 0x21FF), # Arrows
     (0x27F0, 0x27FF), # Supplemental Arrows-A
     (0x2900, 0x297F) # Supplemental Arrows-B
     ],
    ["Operators",
     (0x2200, 0x22FF), # Mathematical Operators
     (0x2A00, 0x2AFF) # Supplemental Mathematical Operators
     ],
    ["Symbols",
     (0x2300, 0x23FF), # Miscellaneous Technical
     (0x27C0, 0x27EF), # Miscellaneous Mathematical Symbols-A 
     (0x2980, 0x29FF) # Miscellaneous Mathematical Symbols-B
    ],
    ["Shapes",
     (0x2400, 0x243F), # Control Pictures
     (0x2500, 0x257F), # Box Drawing
     (0x2580, 0x259F), # Block Elements
     (0x25A0, 0x25FF), # Geometric Shapes
     (0x2600, 0x26FF), # Miscellaneous Symbols
     (0x2B00, 0x2BFF)  # Miscellaneous Symbols and Arrows
     ],
    ["Misc",
     (0x0250, 0x02AF), # IPA Extensions
     (0x1D00, 0x1D7F), # Phonetic Extensions
     (0x1D80, 0x1DBF), # Phonetic Extensions Supplement
     (0x2070, 0x209F), # Superscripts and Subscripts
     (0x20A0, 0x20CF), # Currency Symbols
     (0x2150, 0x218F), # Number Forms
     (0x2460, 0x24FF), # Enclosed Alphanumerics
     (0x2700, 0x27BF)  # Dingbats
     ],
    ["Variants"], # Used for oldstyle numbers, caligraphic and glyph variants
    ["NonUnicode"] # Font for remaining non-Unicode glyphs
    ]
