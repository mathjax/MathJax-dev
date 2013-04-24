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

PREFIX = "GyreTermes" 

MATHFONT="texgyretermes-math.otf"
MAINFONTS = None

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
    }

REMAPACCENT = {
    }

REMAPACCENTUNDER = {
    }

STIXVARIANT = None
STIXVARIANTFONTS = []

TEXCALIGRAPHIC = None
TEXCALIGRAPHICFONTS = []

TEXOLDSTYLE = None
TEXOLDSTYLEFONTS = []

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
