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
    },
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
]
