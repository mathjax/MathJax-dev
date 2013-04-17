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

MATHFONT = "STIXMath-Regular.otf"

MAINFONTS = {
    "Regular": "STIX-Regular.otf",
    "Bold": "STIX-Bold.otf",
    "Italic": "STIX-Italic.otf",
    "BoldItalic": "STIX-BoldItalic.otf"
    }

FONTDATA = {
    "FileVersion": "2.1",
    "Year": "2013",
    "TeX_factor": None, # Leave None for automatic computation
    "baselineskip": 1.2,
    "lineH": .8,
    "lineD": .2,
    "hasStyleChar": True
    }

RULECHAR = 0x2212

REMAP = {
    0x2F3: 0x2DA, 0x2F4: 0x2CA,     # ring below, middle grave
    0xFE37: 0x23DE, 0xFE38: 0x23DF, # OverBrace, UnderBrace
    0x3008: 0x27E8, 0x3009: 0x27E9, # langle, rangle
    0x2758: 0x2223                  # VerticalSeparator
    }

REMAPACCENT = {
    "\u2192": "\u20D7"
    }

REMAPACCENTUNDER = {
    }

# Delimiters that are not in the Open Type Math Table
DELIMITERS = {
    0x003D: # equal sign
    {
        "dir": "H",
        "HW": [0x003D],
        "stretch": [(0x003D,"rep")]
    },
    0x219E: # left two-headed arrow
    {
        "dir": "H",
        "HW": [0x219E],
        "stretch": [(0x219E,"left"),(0x2212,"rep")]
    },
    0x219F: # upwards two headed arrow
    {
        "dir": "V",
        "HW": [0x219F],
        "stretch": [(0x23D0,"ext"),(0x219F,"top")]
    },
    0x21A0: # right two-headed arrow
    {
        "dir": "H",
        "HW": [0x21A0],
        "stretch": [(0x21A0,"right"),(0x2212,"rep")]
    },
    0x21A1: # downwards two headed arrow
    {
      "dir": "V",
      "HW": [0x21A1],
      "stretch": [(0x23D0,"ext"),(0x21A1,"bot")]
    },
    0x21A5: # up arrow from bar
    {
      "dir": "V",
      "HW": [0x21A5],
      "stretch": [(0x5F,"bot",.05,-.01,.8), (0x23D0,"ext"), (0x2191,"top")]
    },
    0x21A7: # down arrow from bar
    {
      "dir": "V",
      "HW": [0x21A7]
      # ((0x22A4,"top","BOLD",0.04,0,.6], (0x23D0,"ext"),(0x2193,"bot"))
    },
    0x21A8: # up down arrow with base
    {
      "dir": "V",
      "HW": [0x21A8],
      "stretch": [(0x2191,"top"), (0x23D0,"ext"), (0x2913,"bot")]
    },
    0x21A9: # left hook arrow
    {
      "dir": "H",
      "HW": [0x21A9]
      # ((0x2190,"left"),(0x2212,"rep"), (0xE0B5,"right","NONUNI"))
    },
    0x21AA: # right hook arrow
    {
      "dir": "H",
      "HW": [0x21AA]
#      "stretch": ((0xE0B4,"left",NONUNI],(0x2212,"rep"), (0x2192,"right"))
    },
    0x21B0: # up arrow with top leftwards
    {
      "dir": "V",
      "HW": [0x21B0],
      "stretch": [(0x21B0,"top"), (0x23D0,"ext",.152)]
    },
    0x21B1: # up arrow with top right
    {
      "dir": "V",
      "HW": [0x21B1],
      "stretch": [(0x21B1,"top"), (0x23D0,"ext",-.195)]
    },
    0x21B2: # down arrow with tip left
    {
      "dir": "V",
      "HW": [0x21B2],
      "stretch": [(0x21B2,"bot"), (0x23D0,"ext",.152)]
    },
    0x21B3: # down arrow with tip right
    {
      "dir": "V",
      "HW": [0x21B3],
      "stretch": [(0x21B3,"bot"), (0x23D0,"ext",-.195)]
    },
    0x21B4: # right arrow with corner down
    {
      "dir": "H",
      "HW": [0x21B4],
      "stretch": [(0x2212,"rep",0,.4), (0x21B4,"right")]
    },
    0x21B5: # down arrow with corner left
    {
      "dir": "V",
      "HW": [0x21B5],
      "stretch": [(0x21B5,"bot"), (0x23D0,"ext",.57)]
    },
    0x21C1: # right harpoon with barb down
    {
      "dir": "H",
      "HW": [0x21C1],
      "stretch": [(0x21C1,"right"),(0x2212,"rep")]
    },
    0x21CB: # left harpoon over right harpoon
    {
      "dir": "H",
      "HW": [0x21CB],
      "stretch": [(0x296A,"left"),(0x3D,"rep"), (0x296D,"right")]
    },
    0x21CC: # right harpoon over left harpoon
    {
      "dir": "H",
      "HW": [0x21CC],
      "stretch": [(0x296B,"left"), (0x3D,"rep"), (0x296C,"right")]
    },
    0x21E0: # left dashed arrow
    {
      "dir": "H",
      "HW": [0x21E0]
#      "stretch": {left:[0x21E0,GENERAL], rep:[0xE121,NONUNI,0,0,0,0,.1], fullExtenders:true}
    },
    0x21E1: # up dashed arrow
    {
      "dir": "V",
      "HW": [0x21E1]
#      "stretch": {ext:[0xE12D,NONUNI], top:[0x21E1,GENERAL], fullExtenders: true}
    },
    0x21E2: # right dashed arrow
    {
      "dir": "H",
      "HW": [0x21E2]
#      "stretch": {right:[0x21E2,VARIANT], rep:[0xE12E,NONUNI,0,0,0,0,.1], fullExtenders:true}
    },
    0x21E3: # down dashed arrow
    {
      "dir": "V",
      "HW": [0x21E3]
      #      "stretch": {ext:[0xE12C,NONUNI], bot:[0x21E3,GENERAL], fullExtenders: true}
    },
    0x21E4: # left arrow to bar
    {
      "dir": "H",
      "HW": [0x21E4],
      "stretch": [(0x21E4,"left"),(0x2212,"rep")]
    },
    0x21E5: # right arrow to bar
    {
      "dir": "H",
      "HW": [0x21E5],
      "stretch": [(0x21E5,"right"), (0x2212,"rep")]
    },
    0x21FD: # left open-headed arrow
    {
      "dir": "H",
      "HW": [0x21FD],
      "stretch": [(0x21FD,"left"), (0x2212,"rep")]
    },
    0x21FE: # right open-headed arrow
    {
      "dir": "H",
      "HW": [0x21FE],
      "stretch": [(0x21FE,"right"), (0x2212,"rep")]
    },
    0x21FF: # left right open-headed arrow
    {
      "dir": "H",
      "HW": [0x21FF],
      "stretch": [(0x21FD,"left"), (0x2212,"rep"), (0x21FE,"right")]
    },
    0x2223: # \vert
    {
        "dir": "V",
        "HW": [0x2223],
        "stretch": [(0x2223,"ext")]
    },
    0x2225: # \Vert
    {
        "dir": "V",
        "HW": [0x2225],
        "stretch": [(0x2225,"ext")]
    },
#        0x23AA: # \bracevert
#        {
#          "dir": "V"
#          "HW": [[1.01,SIZE1]],
#          "stretch": {top:[0x23AA,SIZE1], ext:[0x23AA,SIZE1], bot:[0x23AA,SIZE1]}
#        },
    0x23AF: # horizontal line
    {
        "dir": "H",
        "HW": [0x23AF],
        "stretch": [(0x23AF,"rep")]
    },
#      0x23B0: # \lmoustache
#      {
#            "dir": "V",
#            "HW": [[1.0,SIZE1]],
#            "stretch": {top:[0x23A7,SIZE1], ext:[0x23AA,SIZE1], bot:[0x23AD,SIZE1]}
#      },
#      0x23B1: # \rmoustache
#      {
#            "dir": "V",
#            "HW": [[1.0,SIZE1]],
#            "stretch": {top:[0x23AB,SIZE1], ext:[0x23AA,SIZE1], bot:[0x23A9,SIZE1]}
#        },
    0x23D0: # vertical line extension
    {
        "dir": "V",
        "HW": [0x23D0,0x7C,0x2223],
        "stretch": [(0x2223,"ext")]
    },
    0x2906: # leftwards double arrow from bar
    {
      "dir": "H",
      "HW": [0x2906],
      "stretch": [(0x21D0,"left"), (0x3D,"rep"), (0x2AE4,"right",0,-.09)]
    },
    0x2907: # rightwards double arrow from bar
    {
      "dir": "H",
      "HW": [0x2907],
      "stretch": ((0x22A8,"left",0,-.09), (0x3D,"rep"), (0x21D2,"right"))
    },
    0x2912: # up arrow to bar
    {
      "dir": "V",
      "HW": [0x2912],
      "stretch": [(0x2912,"top"), (0x23D0,"ext")]
    },
    0x2913: # down arrow to bar
    {
      "dir": "V",
      "HW": [0x2913],
      "stretch": [(0x2913,"bot"), (0x23D0,"ext")]
    },
    0x294E: # left barb up right barb up harpoon
    {
      "dir": "H",
      "HW": [0x294E],
      "stretch": [(0x21BC,"left"), (0x2212,"rep"), (0x21C0,"right")]
    },
    0x294F: # up barb right down barb right harpoon
    {
      "dir": "V",
      "HW": [0x294F],
      "stretch": [(0x21BE,"top"), (0x23D0,"ext"), (0x21C2,"bot")]
    },
    0x2950: # left barb dow right barb down harpoon
    {
      "dir": "H",
      "HW": [0x2950],
      "stretch": [(0x21BD,"left"), (0x2212,"rep"), (0x21C1,"right")]
    },
    0x2951: # up barb left down barb left harpoon
    {
      "dir": "V",
      "HW": [0x2951],
      "stretch": [(0x21BF,"top"), (0x23D0,"ext"), (0x21C3,"bot")]
    },
    0x2952: # left harpoon with barb up to bar
    {
      "dir": "H",
      "HW": [0x2952],
      "stretch": [(0x2952,"left"), (0x2212,"rep")]
    },
    0x2953: # right harpoon with barb up to bar
    {
      "dir": "H",
      "HW": [0x2953],
      "stretch": [(0x2953,"right"), (0x2212,"rep")]
    },
    0x2954: # up harpoon with barb right to bar
    {
      "dir": "V",
      "HW": [0x2954],
      "stretch": [(0x2954,"top"), (0x23D0,"ext")]
    },
    0x2955: # down harpoon with barb right to bar
    {
      "dir": "V",
      "HW": [0x2955],
      "stretch": [(0x2955,"bot"), (0x23D0,"ext")]
    },
    0x2956: # left harpoon with barb down to bar
    {
      "dir": "H",
      "HW": [0x2956],
      "stretch": [(0x2956,"left"), (0x2212,"rep")]
    },
    0x2957: # right harpoon with barb down to bar
    {
      "dir": "H",
      "HW": [0x2957],
      "stretch": [(0x2957,"right"), (0x2212,"rep")]
    },
    0x2958: # up harpoon with barb left to bar
    {
      "dir": "V",
      "HW": [0x2958],
      "stretch": [(0x2958,"top"),(0x23D0,"ext")]
    },
    0x2959: # down harpoon with barb left to bar
    {
      "dir": "V",
      "HW": [0x2959],
      "stretch": [(0x2959,"bot"),(0x23D0,"ext")]
    },
    0x295A: # leftwards harpoon with barb up from bar
    {
      "dir": "H",
      "HW": [0x295A]
#      "stretch": {left:[0x21BC,GENERAL], rep:[0x2212,GENERAL], right:[0x22A3,"BOLD",0,.1,.6]}
    },
    0x295B: # rightwards harpoon with barb up from bar
    {
      "dir": "H",
      "HW": [0x295B]
#      "stretch": {left:[0xE0B6,NONUNI], rep:[0x2212,GENERAL], right:[0x21C0,GENERAL]}
    },
    0x295C: # up harpoon with barb right from bar
    {
      "dir": "V",
      "HW": [0x295C],
      "stretch": [(0x5F,"bot",.05,-.01,.8), (0x23D0,"ext"), (0x21BE,"top")]
    },
    0x295D: # down harpoon with barb right from bar
    {
      "dir": "V",
      "HW": [0x295D]
#      "stretch": {top:[0x22A4,"BOLD",0.04,0,.6], ext:[0x23D0,GENERAL], bot:[0x21C2,GENERAL]}
    },
    0x295E: # leftwards harpoon with barb down from bar
    {
      "dir": "H",
      "HW": [0x295E]
#      "stretch": ((0x21BD,"left"),(0x2212,"rep"), (0x22A3,"right","BOLD",0,.1,.6))
    },
    0x295F: # rightwards harpoon with barb down from bar
    {
      "dir": "H",
      "HW": [0x295F]
#      "stretch": {left:[0xE0B6,NONUNI], rep:[0x2212,GENERAL], right:[0x21C1,GENERAL]}
    },
    0x2960: # up harpoon with barb left from bar
    {
      "dir": "V",
      "HW": [0x2960],
      "stretch": [(0x5F,"bot",.05,-.01,.8), (0x23D0,"ext"), (0x21BF,"top")]
    },
    0x2961: # down harpoon with barb left from bar
    {
      "dir": "V",
      "HW": [0x2961]
      # "stretch": {top:[0x22A4,"BOLD",0.04,0,.6], ext:[0x23D0,GENERAL], bot:[0x21C3,GENERAL]}
    },
    0x2980: # triple vertical bar
    {
      "dir": "V",
      "HW": [0x2980],
      "stretch": [(0x2980,"ext")]
    },
    0x2997: # left black tortoise shell
    {
      "dir": "V",
      "HW": [0x2997]
      # "stretch": {top:[0xE10D,NONUNI,.1,.05], ext:[0x23D0,GENERAL,-.1], bot:[0xE10C,NONUNI,.1]}
    },
    0x2998: # right black tortoise shell
    {
      "dir": "V",
      "HW": [0x2998]
      # stretch: {top:[0xE10C,NONUNI,-.1,.05], ext:[0x23D0,GENERAL], bot:[0xE10D,NONUNI,-.1]}
    },
    0x02CD: # low macron
    {
      "dir": "H",
      "HW": [0x02CD],
      "stretch": [(0x2CD,"rep")]
    },
    0x002D: {"alias": 0x23AF, "dir": "H"}, # minus
    0x005E: {"alias": 0x02C6, "dir": "H"}, # wide hat
    0x005F: {"alias": 0x23AF, "dir": "H"}, # low line
    0x007E: {"alias": 0x02DC, "dir": "H"}, # wide tilde
    0x00AF: {"alias": 0x23AF, "dir": "H"}, # macron
    0x02C9: {"alias": 0x23AF, "dir": "H"}, # macron
    0x2015: {"alias": 0x23AF, "dir": "H"}, # horizontal line
    0x2017: {"alias": 0x23AF, "dir": "H"}, # horizontal line
    0x2212: {"alias": 0x23AF, "dir": "H"}, # minus
    0x2215: {"alias": 0x002F, "dir": "V"}, # division slash
    0x2329: {"alias": 0x27E8, "dir": "V"}, # langle
    0x232A: {"alias": 0x27E9, "dir": "V"}, # rangle
    0x2500: {"alias": 0x2212, "dir": "H"}, # horizontal line
    0x2758: {"alias": 0x2223, "dir": "V"}, # vertical separator
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

# Delimiters that should be moved to fontdata-extra.js
DELIMITERS_EXTRA = [
    0x003D, # equal sign
    0x219E, # left two-headed arrow
    0x21A0, # right two-headed arrow
    0x21A4, # left arrow from bar
    0x21A5, # up arrow from bar
    0x21A6, # right arrow from bar
    0x21A7, # down arrow from bar
    0x21B0, # up arrow with top leftwards
    0x21B1, # up arrow with top right
    0x21BC, # left harpoon with barb up
    0x21BD, # left harpoon with barb down
    0x21BE, # up harpoon with barb right
    0x21BF, # up harpoon with barb left
    0x21C0, # right harpoon with barb up
    0x21C1, # right harpoon with barb down
    0x21C2, # down harpoon with barb right
    0x21C3, # down harpoon with barb left
    0x21DA, # left triple arrow
    0x21DB, # right triple arrow
    0x23B4, # top square bracket
    0x23B5, # bottom square bracket
    0x23DC, # top paren
    0x23DD, # bottom paren
    0x23E0, # top tortoise shell
    0x23E1, # bottom tortoise shell
    0x2906, # leftwards double arrow from bar
    0x2907, # rightwards double arrow from bar
    0x294E, # left barb up right barb up harpoon
    0x294F, # up barb right down barb right harpoon
    0x2950, # left barb dow right barb down harpoon
    0x2951, # up barb left down barb left harpoon
    0x295A, # leftwards harpoon with barb up from bar
    0x295B, # rightwards harpoon with barb up from bar
    0x295C, # up harpoon with barb right from bar
    0x295D, # down harpoon with barb right from bar
    0x295E, # leftwards harpoon with barb down from bar
    0x295F, # rightwards harpoon with barb down from bar
    0x2960, # up harpoon with barb left from bar
    0x2961, # down harpoon with barb left from bar
    0x02C7, # caron
    0x02CD, # low macron
    0x02F7, # low tilde
    0x219F, # upwards two headed arrow
    0x21A1, # downwards two headed arrow
    0x21A8, # up down arrow with base
    0x21A9, # left hook arrow
    0x21AA, # right hook arrow
    0x21B2, # down arrow with tip left
    0x21B3, # down arrow with tip right
    0x21B4, # right arrow with corner down
    0x21B5, # down arrow with corner left
    0x21CB, # left harpoon over right harpoon
    0x21CC, # right harpoon over left harpoon
    0x21E0, # left dashed arrow
    0x21E1, # up dashed arrow
    0x21E2, # right dashed arrow
    0x21E3, # down dahsed arrow
    0x21E4, # left arrow to bar
    0x21E5, # right arrow to bar
    0x21FD, # left open-headed arrow
    0x21FE, # right open-headed arrow
    0x21FF, # left right open-headed arrow
    0x27E6, # left white square bracket
    0x27E7, # right white square bracket
    0x27EA, # left double angle bracket
    0x27EB, # right double angle bracket
    0x290A, # up triple arrow
    0x290B, # down triple arrow
    0x2912, # up arrow to bar
    0x2913, # down arrow to bar
    0x2952, # left harpoon with barb up to bar
    0x2953, # right harpoon with barb up to bar
    0x2954, # up harpoon with barb right to bar
    0x2955, # down harpoon with barb right to bar
    0x2956, # left harpoon with barb down to bar
    0x2957, # right harpoon with barb down to bar
    0x2958, # up harpoon with barb left to bar
    0x2959, # down harpoon with barb left to bar
    0x2980, # triple vertical bar
    0x2997, # left balck tortoise shell
    0x2998  # right balck tortoise shell
]
