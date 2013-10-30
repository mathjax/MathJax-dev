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

FONTFAMILY_PREFIX = "Neo Euler MathJax"
FONTNAME_PREFIX = "NeoEulerMathJax"

MATHFONT = "euler.otf"
MAINFONTS = None

FONTSPLITTING_EXTRA = {
    "Variants": [
        ("uni0030.onum", 0xE200), # old style numbers
        ("uni0031.onum", 0xE201),
        ("uni0032.onum", 0xE202),
        ("uni0033.onum", 0xE203),
        ("uni0034.onum", 0xE204),
        ("uni0035.onum", 0xE205),
        ("uni0036.onum", 0xE206),
        ("uni0037.onum", 0xE207),
        ("uni0038.onum", 0xE208),
        ("uni0039.onum", 0xE209),
        ("minute.ssty1", 0x2032),
        ("second.ssty1", 0x2033),
        ("uni2034.ssty1", 0x2034),
        ("uni2035.ssty1", 0x2035),
        ("uni2036.ssty1", 0x2036),
        ("uni2037.ssty1", 0x2037),
        ("uni2057.ssty1", 0x2057)
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

RULECHAR = 0x00AF

REMAP = {
    0x203E: 0x00AF, 0x2C9: 0x00AF,
    0x20D0: 0x21BC, 0x20D1: 0x21C0, # combining left and right harpoons
    0x20EC: 0x21C1, 0x20ED: 0x21BD, # combining low right and left harpoons
    0x20F0: 0x2A,                   # combining asterisk
    0xFE37: 0x23DE, 0xFE38: 0x23DF, # OverBrace, UnderBrace
    0x2B9: 0x2032,                  # prime
    0x3D2: 0x3A5,                   # Upsilon
    0x2015: 0x00AF, 0x2014: 0x00AF, # horizontal bars
    0x2017: 0x5F,
    0x2022: 0x2219,                 # bullet
    # 0x2305: 0x22BC, 0x2306: 0x2A5E, # barwedge, doublebarwedge
    # 0x25AA: 0x25A0, 0x25B4: 0x25B2, # blacksquare, blacktriangle
    # 0x25B5: 0x25B3, 0x25B8: 0x25B6, # triangle, blacktriangleright
    # 0x25BE: 0x25BC, 0x25BF: 0x25BD, # blacktriangledown, triangledown
    # 0x25C2: 0x25C0,                 # blacktriangleleft
    0x3008: 0x27E8, 0x3009: 0x27E9,   # langle, rangle
    0x2758: 0x2223,                   # VerticalSeparator
    0x2A2F: 0xD7,                     # cross product
    # 0x25FB: 0x25A1, 0x25FC: 0x25A0, # square, blacksquare

    # 0x226D: "\u224D\u0338"          # \not\asymp
    0x22E2: "\u2291\u0338",           # \not\sqsubseteq
    0x22E3: "\u2292\u0338"            # \not\sqsupseteq
}

REMAPACCENT = {
}

REMAPACCENTUNDER = {
}

VARIANT = None
VARIANTFONTS = ["VARIANTS"]

TEXCALIGRAPHIC = None
TEXCALIGRAPHICFONTS = []

TEXOLDSTYLE = "offsetN: 0xE200"
TEXOLDSTYLEFONTS = ["VARIANTS"]

SANSSERIFGREEK = None
SANSSERIFITALICNUMBER = None
SANSSERIFITALICGREEK = None
SANSSERIFBOLDITALICNUMBER = None

SMALLOPFONTS = None

DELIMITERS = {
    0x002D: {"alias": 0x00AF, "dir": "H"}, # hyphen-minus
    0x003D: # equal sign
    {
        "dir": "H",
        "HW": [0x003D],
        "stretch": [(0x003D,"rep")]
    },
    0x005E: {"alias": 0x23DC, "dir": "H"}, # wide hat
    0x005F: {"alias": 0x00AF, "dir": "H"}, # low line
    0x007E: {"alias": 0x23DC, "dir": "H"}, # wide tilde
    0x00AF:
    {
        "dir": "H",
        "HW": [0x00AF],
        "stretch": [(0x00AF,"rep")]
    },
    0x02C6: {"alias": 0x23DC, "dir": "H"},
    0x00C9: {"alias": 0x00AF, "dir": "H"},
    0x02DC: {"alias": 0x23DC, "dir": "H"},
    0x0302: {"alias": 0x23DC, "dir": "H"},
    0x0303: {"alias": 0x23DC, "dir": "H"},
    0x030C: {"alias": 0x23DD, "dir": "H"},
    0x0332: {"alias": 0x00AF, "dir": "H"},
    0x2015: {"alias": 0x00AF, "dir": "H"},
    0x2017: {"alias": 0x00AF, "dir": "H"},
    0x203E: {"alias": 0x00AF, "dir": "H"},
    0x2190: {"alias": 0x20D6, "dir": "H"},
    0x2191:
    {
        "dir": "V",
        "HW": [0x2191],
        "stretch": [(0x2191,"top"),(0x7C,"ext")]
    },
    0x2192: {"alias": 0x20D7, "dir": "H"},
    0x2193:
    {
        "dir": "V",
        "HW": [0x2193],
        "stretch": [(0x7C,"ext"),(0x2193,"bot")]
    },
    0x2194: {"alias": 0x20E1, "dir": "H"},
    0x2195:
    {
        "dir": "V",
        "HW": [0x2195],
        "stretch": [(0x2191,"top"),(0x7C,"ext"),(0x2193,"bot")]
    },
    0x21D0:
    {
        "dir": "H",
        "HW": [0x21D0,0x27F8]
    },
    0x21D1:
    {
        "dir": "H",
        "HW": [0x21D1],
        "stretch": [(0x21D1,"top"),(0x2016,"ext")]
    },
    0x21D2:
    {
        "dir": "H",
        "HW": [0x21D2,0x27F9]
    },
    0x21D3:
    {
        "dir": "H",
        "HW": [0x21D3],
        "stretch": [(0x2016,"ext"),(0x21D3,"bot")]
    },
    0x21D4:
    {
        "dir": "H",
        "HW": [0x21D0,0x27FA]
    },
    0x21D5:
    {
        "dir": "H",
        "HW": [0x21D5],
        "stretch": [(0x21D1,"top"),(0x2016,"ext"),(0x21D3,"bot")]
    },
    0x2212: {"alias": 0x00AF, "dir": "H"}, # minus
    0x23AA: # \bracevert
    {
        "dir": "V",
        "HW": [0x23AA],
        "stretch": [(0x23AA,"ext")]
    }, 
    0x23AF: {"alias": 0x00AF, "dir": "H"}, # minus
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
    0x2500: {"alias": 0x00AF, "dir": "H"}, # minus
    0x2758: {"alias": 0x23D0, "dir": "V"},
    0x27EE: {"alias": 0x0028, "dir": "V"},
    0x27EF: {"alias": 0x0029, "dir": "V"},
    0x27F5: {"alias": 0x20D6, "dir": "H"}, # long left arrow
    0x27F6: {"alias": 0x20D7, "dir": "H"}, # long right arrow
    0x27F7: {"alias": 0x20E1, "dir": "H"}, # long left-right arrow
    0x27F8: {"alias": 0x21D0, "dir": "H"}, # long left double arrow
    0x27F9: {"alias": 0x21D2, "dir": "H"}, # long right double arrow
    0x27FA: {"alias": 0x21D4, "dir": "H"}, # long left-right double arrow
    0x27FB: {"alias": 0x20D6, "dir": "H"}, # long left arrow from bar
    0x27FC: {"alias": 0x20D7, "dir": "H"}, # long right arrow from bar
    0x27FD: {"alias": 0x21D0, "dir": "H"}, # long left double arrow from bar
    0x27FE: {"alias": 0x21D2, "dir": "H"}, # long right double arrow from bar
    0x3008: {"alias": 0x27E8, "dir": "V"}, # langle
    0x3009: {"alias": 0x27E9, "dir": "V"}, # rangle
    0xFE37: {"alias": 0x23DE, "dir": "H"}, # horizontal brace down
    0xFE38: {"alias": 0x23DF, "dir": "H"}  # horizontal brace up
}

DELIMITERS_EXTRA = [
    0x2044,
    0x20E1,
    0x20EE,
    0x20EF,
    0x220F,
    0x2210,
    0x2211,
    0x2227,
    0x2228,
    0x2229,
    0x222A,
    0x222B,
    0x222C,
    0x222D,
    0x222E,
    0x228E,
    0x22C0,
    0x22C1,
    0x22C2,
    0x22C3,
    0x23DC,
    0x23DD,
    0x2A0C    
]
