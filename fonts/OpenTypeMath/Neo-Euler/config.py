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
        ("uni0039.onum", 0xE209)
    ]
}

FONTDATA = {
    "FileVersion": "2.3",
    "Year": "2013",
    "TeX_factor": None, # Leave None for automatic computation
    "baselineskip": 1.2,
    "lineH": .8,
    "lineD": .2,
    "hasStyleChar": True
    }

RULECHAR = 0x2212

REMAP = {
    }

REMAPACCENT = {
    }

REMAPACCENTUNDER = {
    }

VARIANT = None
VARIANTFONTS = []

TEXCALIGRAPHIC = None
TEXCALIGRAPHICFONTS = []

TEXOLDSTYLE = "offsetN: 0xE200"
TEXOLDSTYLEFONTS = ["VARIANTS"]

SMALLOPFONTS = None

DELIMITERS = {
    0x23D0: # vertical line extension
    {
        "dir": "V",
        "HW": [0x7C],
        "stretch": [(0x7C,"ext")]
    }
 }

DELIMITERS_EXTRA = [
]
