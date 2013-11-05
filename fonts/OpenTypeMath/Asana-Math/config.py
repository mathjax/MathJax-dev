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

FONTFAMILY_PREFIX = "Asana MathJax"
FONTNAME_PREFIX = "AsanaMathJax"

MATHFONT = "Asana-Math.otf"
MAINFONTS = None

FONTSPLITTING_EXTRA = {
    "Variants": [
        ("zero.onum", 0xE200), # old style numbers
        ("one.onum", 0xE201),
        ("two.onum", 0xE202),
        ("three.onum", 0xE203),
        ("four.onum", 0xE204),
        ("five.onum", 0xE205),
        ("six.onum", 0xE206),
        ("seven.onum", 0xE207),
        ("eight.onum", 0xE208),
        ("nine.onum", 0xE209),
        ("u1D49C.salt", 0xE20A),
        ("uni212C.salt", 0xE20B),
        ("u1D49E.salt", 0xE20C), 
        ("u1D49F.salt", 0xE20D), 
        ("uni2130.salt", 0xE20E), 
        ("uni2131.salt", 0xE20F), 
        ("u1D4A2.salt", 0xE210), 
        ("uni210B.salt", 0xE211), 
        ("uni2110.salt", 0xE212), 
        ("u1D4A5.salt", 0xE213), 
        ("u1D4A6.salt", 0xE214), 
        ("uni2112.salt", 0xE215), 
        ("uni2133.salt", 0xE216), 
        ("u1D4A9.salt", 0xE217), 
        ("u1D4AA.salt", 0xE218), 
        ("u1D4AB.salt", 0xE219), 
        ("u1D4AC.salt", 0xE21A), 
        ("uni211B.salt", 0xE21B), 
        ("u1D4AE.salt", 0xE21C), 
        ("u1D4AF.salt", 0xE21D), 
        ("u1D4B0.salt", 0xE21E), 
        ("u1D4B1.salt", 0xE21F), 
        ("u1D4B2.salt", 0xE220), 
        ("u1D4B3.salt", 0xE221), 
        ("u1D4B4.salt", 0xE222), 
        ("u1D4B5.salt", 0xE223),
    ]
}
FONTSPLITTING_REMOVE = None

FONTDATA = {
    "FileVersion": "2.3",
    "Year": "2013",
    "TeX_factor": None, # Leave None for automatic computation
    "baselineskip": 1.2,
    "lineH": .8,
    "lineD": .2,
    "hasStyleChar": True
}

RULECHAR = 0x0305

REMAP = {
    0x00AF: 0x0304, # MACRON
    0x02B9: 0x2032, # prime
    0x03D2: 0x03A5, # Upsilon with hook
    0x20F0: 0x002A, # (combining star above)
    0x25AA: 0x25A0, # blacksquare
    0x25B4: 0x25B2, # blacktriangle
    0x25B5: 0x25B3, # blacktriangledown
    0x25B8: 0x25B6, # blacktriangleright
    0x25BE: 0x25BC, # blacktriangledown
    0x25BF: 0x25BD, # triangledown
    0x25C2: 0x25C0, # blactriangleleft
    0x25C3: 0x25C1, # triangleleft
    0x2758: 0x2223, # light vertical bar
    0x3008: 0x27E8, # langle
    0x3009: 0x27E9, # rangle
    0xFE37: 0x23DE, 0xFE38: 0x23DF, # over and under braces
}

REMAPACCENT = {
    "\u2192": "\u20D7", # vector arrow
    "\u2032": "\u0300", # grave accent
    "\u2035": "\u0301", # acute accent
    "\u005E": "\u0302", # hat
    "\u007E": "\u0303"  # tilde
}

REMAPACCENTUNDER = {
}

VARIANT = None
VARIANTFONTS = []

TEXCALIGRAPHIC = "offsetA: 0xE20A, noLowerCase: 1"
TEXCALIGRAPHICFONTS = ["VARIANTS"]

TEXOLDSTYLE = "offsetN: 0xE200"
TEXOLDSTYLEFONTS = ["VARIANTS"]

TEXCALIGRAPHICBOLD = None
TEXCALIGRAPHICBOLDFONTS = []

TEXOLDSTYLEBOLD = None
TEXOLDSTYLEBOLDFONTS = []

SANSSERIFGREEK = None
SANSSERIFITALICNUMBER = None
SANSSERIFITALICGREEK = None
SANSSERIFBOLDITALICNUMBER = None

SMALLOPFONTS = None

DELIMITERS = {
    0x002D: {"alias": 0x0305, "dir": "H"}, # hyphen-minus
    0x002F: {"alias": 0x2044, "dir": "H"}, # slash
    0x003D: # equal sign
    {
        "dir": "H",
        "HW": [0x003D],
        "stretch": [(0x003D,"rep")]
    },
    0x005C: # reversed solidus
    {
        "dir": "V",
        "HW": [0x005C]
    },
    0x002D: {"alias": 0x0305, "dir": "H"}, # minus
    0x005E: {"alias": 0x0302, "dir": "H"}, # wide hat
    0x005F: {"alias": 0x0332, "dir": "H"}, # low line
    0x007E: {"alias": 0x0303, "dir": "H"}, # wide tilde
    0x00AF: {"alias": 0x0305, "dir": "H"}, # macron
    0x02C6: {"alias": 0x0302, "dir": "H"},
    0x02C9: {"alias": 0x0305, "dir": "H"}, # macron
    0x02DC: {"alias": 0x0303, "dir": "H"},
    0x2015: {"alias": 0x0305, "dir": "H"}, # horizontal line
    0x2017: {"alias": 0x0305, "dir": "H"}, # horizontal line
    0x203E: {"alias": 0x0305, "dir": "H"}, # overline
    0x2195: # updown arrow
    {
        "dir": "V",
        "HW": [0x2195],
        "stretch": [("arrowup","top"),("glyph3798","ext"),("arrowdown","bot")]
    }, 
    0x21D5: # updown double arrow
    {
        "dir": "V",
        "HW": [0x2195],
        "stretch": [("arrowdblup","top"),("glyph3799","ext"),("arrowdbldown","bot")]
    }, 
    0x2212: {"alias": 0x0305, "dir": "H"}, # minus
    0x2215: {"alias": 0x2044, "dir": "V"}, # division slash
    0x2329: {"alias": 0x27E8, "dir": "V"}, # langle
    0x232A: {"alias": 0x27E9, "dir": "V"}, # rangle
    0x23AA: # \bracevert
    {
        "dir": "V",
        "HW": [0x23AA],
        "stretch": [(0x23AA,"ext")]
    },
    0x23AF: # horizontal line
    {
        "dir": "H",
        "HW": [0x23AF],
        "stretch": [(0x23AF,"rep")]
    },
    0x23B0: {"alias": 0x27C6, "dir": "V"},  # \lmoustache
    0x23B1: {"alias": 0x27C5, "dir": "V"},  # \rmoustache
    0x23D0: # vertical line extension
    {
        "dir": "V",
        "HW": [0x7C],
        "stretch": [(0x7C,"ext")]
    },
    0x2500: {"alias": 0x0305, "dir": "H"},
    0x2758: {"alias": 0x2223, "dir": "V"}, # vertical separator
    0x27EE: {"alias": 0x0028, "dir": "V"},
    0x27EF: {"alias": 0x0029, "dir": "V"},
    0x27F5: {"alias": 0x2190, "dir": "H"}, # long left arrow
    0x27F6: {"alias": 0x2192, "dir": "H"}, # long right arrow
    0x27F7: {"alias": 0x2194, "dir": "H"}, # long left-right arrow
    0x27F8: {"alias": 0x21D0, "dir": "H"}, # long left double arrow
    0x27F9: {"alias": 0x21D2, "dir": "H"}, # long right double arrow
    0x27FA: {"alias": 0x21D4, "dir": "H"}, # long left-right double arrow
    0x27FB: {"alias": 0x21A4, "dir": "H"}, # long left arrow from bar
    0x27FC: {"alias": 0x21A6, "dir": "H"}, # long right arrow from bar
    0x27FD: {"alias": 0x2906, "dir": "H"}, # long left double arrow from bar
    0x27FE: {"alias": 0x2907, "dir": "H"}, # long right double arrow from bar
    0x3008: {"alias": 0x27E8, "dir": "V"}, # langle
    0x3009: {"alias": 0x27E9, "dir": "V"}, # rangle
    0xFE37: {"alias": 0x23DE, "dir": "H"}, # horizontal brace down
    0xFE38: {"alias": 0x23DF, "dir": "H"}  # horizontal brace up
}

DELIMITERS_EXTRA = [
    0x0306,
    0x0333,
    0x033F,
    0x2045,
    0x2046,
    0x20D0,
    0x20D1,
    0x20D6,
    0x20D7,
    0x20E1,
    0x20E9,
    0x20EE,
    0x20EF,
    0x21A9,
    0x21AA,
    0x2210,
    0x2211,
    0x2229,
    0x222B,
    0x222C,
    0x222D,
    0x222E,
    0x222F,
    0x2230,
    0x2231,
    0x2232,
    0x2233,
    0x22C0,
    0x22C1,
    0x22C2,
    0x22C3,
    0x23B4,
    0x23B5,
    0x23DC,
    0x23DD,
    0x23E0,
    0x23E1,
    0x27E6,
    0x27E7,
    0x27EA,
    0x27EB,
    0x29FC,
    0x29FD,
    0x2A00,
    0x2A01,
    0x2A02,
    0x2A03,
    0x2A04,
    0x2A05,
    0x2A06,
    0x2A07,
    0x2A08,
    0x2A09,
    0x2A0C,
    0x2A0D,
    0x2A0E,
    0x2A0F,
    0x2A10,
    0x2A11,
    0x2A12,
    0x2A13,
    0x2A14,
    0x2A15,
    0x2A16,
    0x2A17,
    0x2A18,
    0x2A19,
    0x2A1A,
    0x2A1B,
    0x2A1C
]
