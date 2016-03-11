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

FONTFAMILY_PREFIX="Gyre Pagella MathJax"
FONTNAME_PREFIX="GyrePagellaMathJax"

MATHFONT="texgyrepagella-math.otf"
MAINFONTS = None

FONTSPLITTING_EXTRA = {
    "Variants": [
        ("minute.st",0x2032),
        ("uni2033.st",0x2033),
        ("uni2034.st",0x2034),
        ("primereversed.st",0x2035),
        ("uni2036.st",0x2036),
        ("uni2037.st",0x2037),
        ("uni2057.st",0x2057)
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
        0x203E: 0x305,                  # overline
        0xFE37: 0x23DE, 0xFE38: 0x23DF, # OverBrace, UnderBrace
        0x2B9: 0x2032,                  # prime,
        0x3D2: 0x3A5,                   # Upsilon
        0x25B4: 0x25B2,                 # blacktriangle
        0x25B5: 0x25B3, 0x25B8: 0x25B6, # triangle, blacktriangleright
        0x25BE: 0x25BC, 0x25BF: 0x25BD, # blacktriangledown, triangledown
        0x25C2: 0x25C0,                 # blacktriangleleft
        0x3008: 0x27E8, 0x3009: 0x27E9, # langle, rangle
        0x2758: 0x2223,                 # VerticalSeparator
        0x25FB: 0x25A1, 0x25FC: 0x25A0  # square, blacksquare
}

REMAPACCENT = {
    "\u2192": "\u20D7", # vector arrow
    "\u2032": "\u0301", # acute accent
    "\u007E": "\u0303", # tilde
    "\u2035": "\u0300", # grave accent
    "\u005E": "\u0302", # hat
    "\u0060": "\u0300",
    "\u00B4": "\u0301"
}

REMAPACCENTUNDER = {
}

VARIANT = None
VARIANTFONTS = ["VARIANTS"]

TEXCALIGRAPHIC = None
TEXCALIGRAPHICFONTS = []

TEXOLDSTYLE = None
TEXOLDSTYLEFONTS = []

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
    0x005E: {"alias": 0x0302, "dir": "H"}, # wide hat
    0x005F: {"alias": 0x0332, "dir": "H"}, # low line
    0x007E: {"alias": 0x0303, "dir": "H"},
    0x00AF: {"alias": 0x0332, "dir": "H"}, # low line
    0x02C6: {"alias": 0x0302, "dir": "H"},
    0x02C9: {"alias": 0x0305, "dir": "H"}, # macron
    0x02DC: {"alias": 0x0303, "dir": "H"},
    0x2015: {"alias": 0x0305, "dir": "H"}, # horizontal line
    0x2017: {"alias": 0x0305, "dir": "H"}, # horizontal line
    0x203E: {"alias": 0x0305, "dir": "H"}, # overline
    0x2215: {"alias": 0x2044, "dir": "V"}, # division slash
    0x2312: {"alias": 0x23DC, "dir": "H"}, # arc
    0x2322: {"alias": 0x23DC, "dir": "H"}, # frown
    0x2323: {"alias": 0x23DD, "dir": "H"}, # smile
    0x23AA: # \bracevert
    {
        "dir": "V",
        "HW": [0x23AA],
        "stretch": [(0x23AA,"ext")]
    },
    0x23AF: {"alias": 0x0305, "dir": "H"},
    0x23B0:
    {
        "dir": "V",
        "HW": [0x23A7],
        "stretch": [(0x23A7,"top"),(0x23AA,"ext"),(0x23AD, "bot")]
    },
    0x23B1:
    {
        "dir": "V",
        "HW": [0x23AB],
        "stretch": [(0x23AB,"top"),(0x23AA,"ext"),(0x23A9, "bot")]
    },
    0x23D0: # vertical line extension
    {
        "dir": "V",
        "HW": [0x7C],
        "stretch": [(0x7C,"ext")]
    },
    0x2500: {"alias": 0x0305, "dir": "H"},
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
    0xFE38: {"alias": 0x23DF, "dir": "H"},  # horizontal brace up
    0x222B:
    {
        "dir": "V",
        "HW": [0x222B,"integral.v4"],
        "stretch": [("integral.tp","top"),("uni23AE","ext"),("integral.bt","bot")],
        "redefine": True
    },
    0x222C:
    {
        "dir": "V",
        "HW": [0x222C,"uni222C.v4"],
        "stretch": [("uni222C.tp","top"),("uni222C.ex","ext"),("uni222C.bt","bot")],
        "redefine": True
    },
    0x222D:
    {
        "dir": "V",
        "HW": [0x222D,"uni222D.v4"],
        "stretch": [("uni222D.tp","top"),("uni222D.ex","ext"),("uni222D.bt","bot")],
        "redefine": True
    },
    0x2A0C:
    {
        "dir": "V",
        "HW": [0x2A0C,"uni2A0C.v4"],
        "stretch": [("uni2A0C.tp","top"),("uni2A0C.ex","ext"),("uni2A0C.bt","bot")],
        "redefine": True
    },
    0x222E:
    {
        "dir": "V",
        "HW": [0x222F,"contourintegral.v4"],
        "redefine": True
    },
    0x222F:
    {
        "dir": "V",
        "HW": [0x222F,"uni222F.v4"],
        "redefine": True
    },
    0x2230:
    {
        "dir": "V",
        "HW": [0x2230,"uni2230.v4"],
        "redefine": True
    },
    0x2231:
    {
        "dir": "V",
        "HW": [0x2231,"uni2231.v4"],
        "redefine": True
    },
    0x2A11:
    {
        "dir": "V",
        "HW": [0x2A11,"uni2A11.v4"],
        "redefine": True
    },
    0x2232:
    {
        "dir": "V",
        "HW": [0x2232,"uni2232.v4"],
        "redefine": True
    },
    0x2233:
    {
        "dir": "V",
        "HW": [0x2233,"uni2233.v4"],
        "redefine": True
    }
 }

DELIMITERS_EXTRA = [
    0x306,
    0x311,
    0x32C,
    0x32D,
    0x32E,
    0x32F,
    0x330,
    0x333,
    0x33F,
    0x20D0,
    0x20D1,
    0x20D6,
    0x20D7,
    0x20E1,
    0x20E9,
    0x20EC,
    0x20ED,
    0x20EE,
    0x20EF,
    0x2196,
    0x2197,
    0x2198,
    0x2199,
    0x219A,
    0x219B,
    0x219E,
    0x219F,
    0x21A0,
    0x21A1,
    0x21A2,
    0x21A3,
    0x21A5,
    0x21A7,
    0x21A9,
    0x21AA,
    0x21AB,
    0x21AC,
    0x21AD,
    0x21AE,
    0x21B0,
    0x21B1,
    0x21B2,
    0x21B3,
    0x21B6,
    0x21B7,
    0x21BC,
    0x21BD,
    0x21BE,
    0x21BF,
    0x21C0,
    0x21C1,
    0x21C2,
    0x21C3,
    0x21C4,
    0x21C5,
    0x21C6,
    0x21C7,
    0x21C8,
    0x21C9,
    0x21CA,
    0x21CB,
    0x21CC,
    0x21CD,
    0x21CE,
    0x21CF,
    0x21D6,
    0x21D7,
    0x21D8,
    0x21D9,
    0x21DA,
    0x21DB,
    0x21DC,
    0x21DD,
    0x21E6,
    0x21E7,
    0x21E8,
    0x21E9,
    0x21F3,
    0x21F5,
    0x21F6,
    0x220F,
    0x2210,
    0x2211,
    0x222B,
    0x222C,
    0x222D,
    0x222E,
    0x222F,
    0x2230,
    0x2231,
    0x2232,
    0x2233,
    0x2261,
    0x2263,
    0x22A2,
    0x22A3,
    0x22A4,
    0x22A5,
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
    0x27A1,
    0x27E6,
    0x27E7,
    0x27EA,
    0x27EB,
    0x2A00,
    0x2A01,
    0x2A02,
    0x2A03,
    0x2A04,
    0x2A05,
    0x2A06,
    0x2A09,
    0x2A0C,
    0x2A11,
    0x2B04,
    0x2B05,
    0x2B06,
    0x2B07,
    0x2B0C,
    0x2B0D,
    0x2B31
]
