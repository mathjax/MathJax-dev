/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/font/STIX-Web/fontdata.js
 *  
 *  Initializes the HTML-CSS OutputJax to use the STIX-Web fonts
 *  for displaying mathematics.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2013 MathJax Project
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (HTMLCSS,AJAX) {
  var VERSION = "2.1";

  var ALPHABETSBOLDITALIC = "STIX_Alphabets-bold-italic",
      ALPHABETSBOLD = "STIX_Alphabets-bold",
      ALPHABETSITALIC = "STIX_Alphabets-italic",
      ALPHABETSREGULAR = "STIX_Alphabets",
      ARROWSBOLD = "STIX_Arrows-bold",
      ARROWSREGULAR = "STIX_Arrows",
      DOUBLESTRUCKBOLDITALIC = "STIX_DoubleStruck-bold-italic",
      DOUBLESTRUCKBOLD = "STIX_DoubleStruck-bold",
      DOUBLESTRUCKITALIC = "STIX_DoubleStruck-italic",
      DOUBLESTRUCKREGULAR = "STIX_DoubleStruck",
      FRAKTURBOLD = "STIX_Fraktur-bold",
      FRAKTURREGULAR = "STIX_Fraktur",
      LATINBOLDITALIC = "STIX_Latin-bold-italic",
      LATINBOLD = "STIX_Latin-bold",
      LATINITALIC = "STIX_Latin-italic",
      LATINREGULAR = "STIX_Latin",
      MAINBOLDITALIC = "STIX_Main-bold-italic",
      MAINBOLD = "STIX_Main-bold",
      MAINITALIC = "STIX_Main-italic",
      MAINREGULAR = "STIX_Main",
      MARKSBOLDITALIC = "STIX_Marks-bold-italic",
      MARKSBOLD = "STIX_Marks-bold",
      MARKSITALIC = "STIX_Marks-italic",
      MARKSREGULAR = "STIX_Marks",
      MATHSIZE1 = "STIX_Math_Size1",
      MATHSIZE2 = "STIX_Math_Size2",
      MATHSIZE3 = "STIX_Math_Size3",
      MATHSIZE4 = "STIX_Math_Size4",
      MATHSIZE5 = "STIX_Math_Size5",
      MISCBOLDITALIC = "STIX_Misc-bold-italic",
      MISCBOLD = "STIX_Misc-bold",
      MISCITALIC = "STIX_Misc-italic",
      MISCREGULAR = "STIX_Misc",
      NONUNICODEBOLDITALIC = "STIX_NonUnicode-bold-italic",
      NONUNICODEBOLD = "STIX_NonUnicode-bold",
      NONUNICODEITALIC = "STIX_NonUnicode-italic",
      NONUNICODEREGULAR = "STIX_NonUnicode",
      NORMALBOLDITALIC = "STIX_Normal-bold-italic",
      NORMALBOLD = "STIX_Normal-bold",
      NORMALITALIC = "STIX_Normal-italic",
      NORMALREGULAR = "STIX_Normal",
      OPERATORSBOLD = "STIX_Operators-bold",
      OPERATORSREGULAR = "STIX_Operators",
      SANSSERIFBOLDITALIC = "STIX_SansSerif-bold-italic",
      SANSSERIFBOLD = "STIX_SansSerif-bold",
      SANSSERIFITALIC = "STIX_SansSerif-italic",
      SANSSERIFREGULAR = "STIX_SansSerif",
      SCRIPTBOLDITALIC = "STIX_Script-bold-italic",
      SCRIPTITALIC = "STIX_Script-italic",
      SCRIPTREGULAR = "STIX_Script",
      SHAPESBOLDITALIC = "STIX_Shapes-bold-italic",
      SHAPESBOLD = "STIX_Shapes-bold",
      SHAPESITALIC = "STIX_Shapes-italic",
      SHAPESREGULAR = "STIX_Shapes",
      SYMBOLSBOLD = "STIX_Symbols-bold",
      SYMBOLSREGULAR = "STIX_Symbols";

  var H = "H", V = "V", EXTRAH = {load:"extra", dir:H}, EXTRAV = {load:"extra", dir:V};

  HTMLCSS.Augment({
    FONTDATA: {
      version: VERSION,

      TeX_factor: 1.125,
      baselineskip: 1.200,
      lineH: 0.800, lineD: 0.200,

      hasStyleChar: true,  // char 0xEFFD encodes font style

      FONTS: {
        ALPHABETSBOLDITALIC: null,
        ALPHABETSBOLD: null,
        ALPHABETSITALIC: null,
        ALPHABETSREGULAR: null,
        ARROWSBOLD: null,
        ARROWSREGULAR: null,
        DOUBLESTRUCKBOLDITALIC: null,
        DOUBLESTRUCKBOLD: null,
        DOUBLESTRUCKITALIC: null,
        DOUBLESTRUCKREGULAR: null,
        FRAKTURBOLD: null,
        FRAKTURREGULAR: null,
        LATINBOLDITALIC: null,
        LATINBOLD: null,
        LATINITALIC: null,
        LATINREGULAR: null,
        MAINBOLDITALIC: null,
        MAINBOLD: null,
        MAINITALIC: null,
        MAINREGULAR: null,
        MARKSBOLDITALIC: null,
        MARKSBOLD: null,
        MARKSITALIC: null,
        MARKSREGULAR: null,
        MATHSIZE1: null,
        MATHSIZE2: null,
        MATHSIZE3: null,
        MATHSIZE4: null,
        MATHSIZE5: null,
        MISCBOLDITALIC: null,
        MISCBOLD: null,
        MISCITALIC: null,
        MISCREGULAR: null,
        NONUNICODEBOLDITALIC: null,
        NONUNICODEBOLD: null,
        NONUNICODEITALIC: null,
        NONUNICODEREGULAR: null,
        NORMALBOLDITALIC: null,
        NORMALBOLD: null,
        NORMALITALIC: null,
        NORMALREGULAR: null,
        OPERATORSBOLD: null,
        OPERATORSREGULAR: null,
        SANSSERIFBOLDITALIC: null,
        SANSSERIFBOLD: null,
        SANSSERIFITALIC: null,
        SANSSERIFREGULAR: null,
        SCRIPTBOLDITALIC: null,
        SCRIPTITALIC: null,
        SCRIPTREGULAR: null,
        SHAPESBOLDITALIC: null,
        SHAPESBOLD: null,
        SHAPESITALIC: null,
        SHAPESREGULAR: null,
        SYMBOLSBOLD: null,
        SYMBOLSREGULAR: null
      },

      VARIANT: {
        "-largeOp": {fonts:[MATHSIZE1,MAIN]},        "-smallOp": {}
      },

      REMAP: {
        {name: "alpha", low: 0x61, high: 0x7A, offset: "A", add: 26},
        {name: "Alpha", low: 0x41, high: 0x5A, offset: "A"},
        {name: "number", low: 0x30, high: 0x39, offset: "N"},
        {name: "greek", low: 0x03B1, high: 0x03C9, offset: "G", add: 26},
        {name: "Greek", low: 0x0391, high: 0x03F6, offset: "G"}
      },

      REMAP: {
        0x3008: 0x27E8,
        0x3009: 0x27E9,
        0x2758: 0x2223,
        0x02F3: 0x02DA,
        0x02F4: 0x02CA,
        0xFE37: 0x23DE,
        0xFE38: 0x23DF
      },

      REMAPACCENT: {
        "\u2192": "\u20D7"
      },

      REMAPACCENTUNDER: {
      },

      DELIMITERS: {
        0x28:
        {
          dir: V,
          HW: [[0.853,MAINREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]],
          stretch: {top:[0xE004,MATHSIZE5], ext:[0xE005,MATHSIZE5], bot:[0xE005,MATHSIZE5]}
        },
        0x29:
        {
          dir: V,
          HW: [[0.853,MAINREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]],
          stretch: {top:[0xE00A,MATHSIZE5], ext:[0xE00B,MATHSIZE5], bot:[0xE00B,MATHSIZE5]}
        },
        0x2D: {alias: 0x23AF, dir: H},
        0x2F:
        {
          dir: V,
          HW: [[0.690,MAINREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x3D:
        {
          dir: H,
          HW: [[0.589,MAINREGULAR]],
          stretch: {rep:[0x3D,MAINREGULAR]}
        },
        0x5B:
        {
          dir: V,
          HW: [[0.818,MAINREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]],
          stretch: {top:[0xE014,MATHSIZE5], ext:[0xE015,MATHSIZE5], bot:[0xE015,MATHSIZE5]}
        },
        0x5C:
        {
          dir: V,
          HW: [[0.690,MAINREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x5D:
        {
          dir: V,
          HW: [[0.818,MAINREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]],
          stretch: {top:[0xE01E,MATHSIZE5], ext:[0xE01F,MATHSIZE5], bot:[0xE01F,MATHSIZE5]}
        },
        0x5E: {alias: 0x02C6, dir: H},
        0x5F: {alias: 0x23AF, dir: H},
        0x7B:
        {
          dir: V,
          HW: [[0.861,MAINREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]],
          stretch: {top:[0xE024,MATHSIZE5], ext:[0xE025,MATHSIZE5], mid:[0xE025,MATHSIZE5], bot:[0xE026,MATHSIZE5]}
        },
        0x7C:
        {
          dir: V,
          stretch: {top:[0x7C,MAINREGULAR], ext:[0x7C,MAINREGULAR]}
        },
        0x7D:
        {
          dir: V,
          HW: [[0.861,MAINREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]],
          stretch: {top:[0xE02B,MATHSIZE5], ext:[0xE025,MATHSIZE5], mid:[0xE025,MATHSIZE5], bot:[0xE02C,MATHSIZE5]}
        },
        0x7E: {alias: 0x02DC, dir: H},
        0xAF: {alias: 0x23AF, dir: H},
        0x2C6:
        {
          dir: H,
          HW: [[0.311,MARKSREGULAR], [0.560,MATHSIZE1], [0.979,MATHSIZE2], [1.460,MATHSIZE3], [1.886,MATHSIZE4], [2.328,MATHSIZE5]]
        },
        0x2C7:
        {
          dir: H,
          HW: [[0.311,MARKSREGULAR], [0.560,MATHSIZE1], [0.979,MATHSIZE2], [1.460,MATHSIZE3], [1.886,MATHSIZE4], [2.328,MATHSIZE5]]
        },
        0x2C9: {alias: 0x23AF, dir: H},
        0x2CD:
        {
          dir: H,
          HW: [[0.312,MARKSREGULAR]],
          stretch: {rep:[0x2CD,MARKSREGULAR]}
        },
        0x2DC:
        {
          dir: H,
          HW: [[0.330,MARKSREGULAR], [0.560,MATHSIZE1], [0.979,MATHSIZE2], [1.460,MATHSIZE3], [1.886,MATHSIZE4], [2.328,MATHSIZE5]]
        },
        0x2F7:
        {
          dir: H,
          HW: [[0.330,MARKSREGULAR], [0.560,MATHSIZE1], [0.979,MATHSIZE2], [1.460,MATHSIZE3], [1.886,MATHSIZE4], [2.328,MATHSIZE5]]
        },
        0x302:
        {
          dir: H,
          HW: [[0.311,MARKSREGULAR], [0.560,MATHSIZE1], [0.979,MATHSIZE2], [1.460,MATHSIZE3], [1.886,MATHSIZE4], [2.328,MATHSIZE5]]
        },
        0x303:
        {
          dir: H,
          HW: [[0.330,MARKSREGULAR], [0.560,MATHSIZE1], [0.979,MATHSIZE2], [1.460,MATHSIZE3], [1.886,MATHSIZE4], [2.328,MATHSIZE5]]
        },
        0x305:
        {
          dir: H,
          HW: [[0.500,MARKSREGULAR], [1.000,MATHSIZE1], [1.500,MATHSIZE2], [2.000,MATHSIZE3], [2.500,MATHSIZE4], [3.000,MATHSIZE5]],
          stretch: {left:[0xE04B,MATHSIZE5], ext:[0xE04B,MATHSIZE5]}
        },
        0x30C:
        {
          dir: H,
          HW: [[0.311,MARKSREGULAR], [0.560,MATHSIZE1], [0.979,MATHSIZE2], [1.460,MATHSIZE3], [1.886,MATHSIZE4], [2.328,MATHSIZE5]]
        },
        0x330:
        {
          dir: H,
          HW: [[0.330,MARKSREGULAR], [0.560,MATHSIZE1], [0.979,MATHSIZE2], [1.460,MATHSIZE3], [1.886,MATHSIZE4], [2.328,MATHSIZE5]]
        },
        0x332:
        {
          dir: H,
          HW: [[0.500,MARKSREGULAR], [1.000,MATHSIZE1], [1.500,MATHSIZE2], [2.000,MATHSIZE3], [2.500,MATHSIZE4], [3.000,MATHSIZE5]],
          stretch: {left:[0xE05A,MATHSIZE5], ext:[0xE05A,MATHSIZE5]}
        },
        0x338:
        {
          dir: V,
          HW: [[0.818,MARKSREGULAR], [0.553,MATHSIZE1], [0.662,MATHSIZE2], [0.818,MATHSIZE3], [0.959,MATHSIZE4], [1.414,MATHSIZE5]]
        },
        0x2015: {alias: 0x23AF, dir: H},
        0x2016:
        {
          dir: V,
          stretch: {top:[0x2016,MARKSREGULAR], ext:[0x2016,MARKSREGULAR]}
        },
        0x2017: {alias: 0x23AF, dir: H},
        0x203E:
        {
          dir: H,
          HW: [[0.500,MARKSREGULAR], [1.000,MATHSIZE1], [1.500,MATHSIZE2], [2.000,MATHSIZE3], [2.500,MATHSIZE4], [3.000,MATHSIZE5]]
        },
        0x20D0:
        {
          dir: H,
          HW: [[0.436,MARKSREGULAR], [0.871,MATHSIZE1], [1.308,MATHSIZE2], [1.744,MATHSIZE3], [2.180,MATHSIZE4], [3.000,MATHSIZE5]],
          stretch: {left:[0xE069,MATHSIZE5], ext:[0xE06E,MATHSIZE5]}
        },
        0x20D1:
        {
          dir: H,
          HW: [[0.436,MARKSREGULAR], [0.871,MATHSIZE1], [1.308,MATHSIZE2], [1.744,MATHSIZE3], [2.180,MATHSIZE4], [3.000,MATHSIZE5]],
          stretch: {rep:[0xE06F,MATHSIZE5]}
        },
        0x20D6:
        {
          dir: H,
          HW: [[0.436,MARKSREGULAR], [0.872,MATHSIZE1], [1.308,MATHSIZE2], [1.744,MATHSIZE3], [2.180,MATHSIZE4], [3.000,MATHSIZE5]],
          stretch: {left:[0xE074,MATHSIZE5], ext:[0xE06E,MATHSIZE5]}
        },
        0x20D7:
        {
          dir: H,
          HW: [[0.436,MARKSREGULAR], [0.872,MATHSIZE1], [1.308,MATHSIZE2], [1.744,MATHSIZE3], [2.180,MATHSIZE4], [3.000,MATHSIZE5]],
          stretch: {rep:[0xE079,MATHSIZE5]}
        },
        0x20E1:
        {
          dir: H,
          stretch: {left:[0xE074,MATHSIZE5], ext:[0xE06E,MATHSIZE5], right:[0xE06E,MATHSIZE5]}
        },
        0x20EC:
        {
          dir: H,
          HW: [[0.436,MARKSREGULAR], [0.871,MATHSIZE1], [1.308,MATHSIZE2], [1.744,MATHSIZE3], [2.180,MATHSIZE4], [3.000,MATHSIZE5]],
          stretch: {rep:[0xE07E,MATHSIZE5]}
        },
        0x20ED:
        {
          dir: H,
          HW: [[0.436,MARKSREGULAR], [0.871,MATHSIZE1], [1.308,MATHSIZE2], [1.744,MATHSIZE3], [2.180,MATHSIZE4], [3.000,MATHSIZE5]],
          stretch: {left:[0xE083,MATHSIZE5], ext:[0xE088,MATHSIZE5]}
        },
        0x20EE:
        {
          dir: H,
          HW: [[0.436,MARKSREGULAR], [0.872,MATHSIZE1], [1.308,MATHSIZE2], [1.744,MATHSIZE3], [2.180,MATHSIZE4], [3.000,MATHSIZE5]],
          stretch: {left:[0xE089,MATHSIZE5], ext:[0xE088,MATHSIZE5]}
        },
        0x20EF:
        {
          dir: H,
          HW: [[0.436,MARKSREGULAR], [0.872,MATHSIZE1], [1.308,MATHSIZE2], [1.744,MATHSIZE3], [2.180,MATHSIZE4], [3.000,MATHSIZE5]],
          stretch: {rep:[0xE08E,MATHSIZE5]}
        },
        0x2140:
        {
          dir: V,
          HW: [[1.022,ALPHABETSREGULAR], [1.450,MATHSIZE1]]
        },
        0x2190:
        {
          dir: H,
          stretch: {left:[0x2190,ARROWSREGULAR], ext:[0x23AF,SYMBOLSREGULAR]}
        },
        0x2191:
        {
          dir: V,
          stretch: {mid:[0x2191,ARROWSREGULAR]}
        },
        0x2192:
        {
          dir: H,
          stretch: {rep:[0x2192,ARROWSREGULAR]}
        },
        0x2193:
        {
          dir: V,
          stretch: {top:[0x2193,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR]}
        },
        0x2194:
        {
          dir: H,
          stretch: {left:[0x2190,ARROWSREGULAR], ext:[0x23AF,SYMBOLSREGULAR], right:[0x23AF,SYMBOLSREGULAR]}
        },
        0x2195:
        {
          dir: V,
          stretch: {top:[0x2193,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR], bot:[0x23D0,SYMBOLSREGULAR]}
        },
        0x219E:
        {
          dir: H,
          HW: [[0.786,ARROWSREGULAR]],
          stretch: {left:[0x219E,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR]}
        },
        0x219F:
        {
          dir: V,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {ext:[0x23D0,SYMBOLSREGULAR], top:[0x219F,ARROWSREGULAR]}
        },
        0x21A0:
        {
          dir: H,
          HW: [[0.786,ARROWSREGULAR]],
          stretch: {right:[0x21A0,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR]}
        },
        0x21A1:
        {
          dir: V,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {ext:[0x23D0,SYMBOLSREGULAR], bot:[0x21A1,ARROWSREGULAR]}
        },
        0x21A4:
        {
          dir: H,
          stretch: {left:[0x2190,ARROWSREGULAR], ext:[0x23AF,SYMBOLSREGULAR], right:[0x23AF,SYMBOLSREGULAR]}
        },
        0x21A5:
        {
          dir: V,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {bot:[0x5F,MAINREGULAR,0.050,-0.010,0.800], ext:[0x23D0,SYMBOLSREGULAR], top:[0x2191,ARROWSREGULAR]}
        },
        0x21A6:
        {
          dir: H,
          stretch: {left:[0x27DD,SYMBOLSREGULAR], ext:[0x23AF,SYMBOLSREGULAR], right:[0x23AF,SYMBOLSREGULAR]}
        },
        0x21A7:
        {
          dir: V,
          HW: [[0.816,ARROWSREGULAR]]
        },
        0x21A8:
        {
          dir: V,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {top:[0x2191,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR], bot:[0x2913,ARROWSREGULAR]}
        },
        0x21A9:
        {
          dir: H,
          HW: [[0.786,ARROWSREGULAR]]
        },
        0x21AA:
        {
          dir: H,
          HW: [[0.786,ARROWSREGULAR]]
        },
        0x21B0:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {top:[0x21B0,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR,0.152]}
        },
        0x21B1:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {top:[0x21B1,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR,-0.195]}
        },
        0x21B2:
        {
          dir: V,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {bot:[0x21B2,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR,0.152]}
        },
        0x21B3:
        {
          dir: V,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {bot:[0x21B3,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR,-0.195]}
        },
        0x21B4:
        {
          dir: H,
          HW: [[0.786,ARROWSREGULAR]],
          stretch: {rep:[0x2212,OPERATORSREGULAR,0.000,0.400], right:[0x21B4,ARROWSREGULAR]}
        },
        0x21B5:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {bot:[0x21B5,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR,0.570]}
        },
        0x21BC:
        {
          dir: H,
          stretch: {left:[0x21BC,ARROWSREGULAR], ext:[0x23AF,SYMBOLSREGULAR]}
        },
        0x21BD:
        {
          dir: H,
          stretch: {left:[0x21BD,ARROWSREGULAR], ext:[0x23AF,SYMBOLSREGULAR]}
        },
        0x21BE:
        {
          dir: V,
          stretch: {mid:[0x21BE,ARROWSREGULAR]}
        },
        0x21BF:
        {
          dir: V,
          stretch: {mid:[0x21BF,ARROWSREGULAR]}
        },
        0x21C0:
        {
          dir: H,
          stretch: {rep:[0x21C0,ARROWSREGULAR]}
        },
        0x21C1:
        {
          dir: H,
          HW: [[0.847,ARROWSREGULAR]],
          stretch: {right:[0x21C1,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR]}
        },
        0x21C2:
        {
          dir: V,
          stretch: {top:[0x21C2,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR]}
        },
        0x21C3:
        {
          dir: V,
          stretch: {top:[0x21C3,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR]}
        },
        0x21CB:
        {
          dir: H,
          HW: [[0.786,ARROWSREGULAR]],
          stretch: {left:[0x296A,ARROWSREGULAR], rep:[0x3D,MAINREGULAR], right:[0x296D,ARROWSREGULAR]}
        },
        0x21CC:
        {
          dir: H,
          HW: [[0.786,ARROWSREGULAR]],
          stretch: {left:[0x296B,ARROWSREGULAR], rep:[0x3D,MAINREGULAR], right:[0x296C,ARROWSREGULAR]}
        },
        0x21D0:
        {
          dir: H,
          stretch: {left:[0x21D0,ARROWSREGULAR], ext:[0xE094,MATHSIZE5]}
        },
        0x21D1:
        {
          dir: V,
          stretch: {mid:[0x21D1,ARROWSREGULAR]}
        },
        0x21D2:
        {
          dir: H,
          stretch: {rep:[0x21D2,ARROWSREGULAR]}
        },
        0x21D3:
        {
          dir: V,
          stretch: {top:[0x21D3,ARROWSREGULAR], ext:[0xE095,MATHSIZE5]}
        },
        0x21D4:
        {
          dir: H,
          stretch: {left:[0x21D0,ARROWSREGULAR], ext:[0xE094,MATHSIZE5], right:[0xE094,MATHSIZE5]}
        },
        0x21D5:
        {
          dir: V,
          stretch: {top:[0x21D3,ARROWSREGULAR], ext:[0xE095,MATHSIZE5], bot:[0xE095,MATHSIZE5]}
        },
        0x21DA:
        {
          dir: H,
          stretch: {left:[0x21DA,ARROWSREGULAR], ext:[0xE096,MATHSIZE5]}
        },
        0x21DB:
        {
          dir: H,
          stretch: {rep:[0x21DB,ARROWSREGULAR]}
        },
        0x21E0:
        {
          dir: H,
          HW: [[0.806,ARROWSREGULAR]]
        },
        0x21E1:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]]
        },
        0x21E2:
        {
          dir: H,
          HW: [[0.806,ARROWSREGULAR]]
        },
        0x21E3:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]]
        },
        0x21E4:
        {
          dir: H,
          HW: [[0.806,ARROWSREGULAR]],
          stretch: {left:[0x21E4,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR]}
        },
        0x21E5:
        {
          dir: H,
          HW: [[0.806,ARROWSREGULAR]],
          stretch: {right:[0x21E5,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR]}
        },
        0x21FD:
        {
          dir: H,
          HW: [[0.806,ARROWSREGULAR]],
          stretch: {left:[0x21FD,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR]}
        },
        0x21FE:
        {
          dir: H,
          HW: [[0.806,ARROWSREGULAR]],
          stretch: {right:[0x21FE,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR]}
        },
        0x21FF:
        {
          dir: H,
          HW: [[0.886,ARROWSREGULAR]],
          stretch: {left:[0x21FD,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR], right:[0x21FE,ARROWSREGULAR]}
        },
        0x220F:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x2210:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x2211:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.450,MATHSIZE1]]
        },
        0x2212: {alias: 0x23AF, dir: H},
        0x2215: {alias: 0x002F, dir: V},
        0x221A:
        {
          dir: V,
          HW: [[1.232,OPERATORSREGULAR], [1.847,MATHSIZE1], [2.460,MATHSIZE2], [3.075,MATHSIZE3]],
          stretch: {top:[0xE09D,MATHSIZE5], ext:[0xE09E,MATHSIZE5], bot:[0xE09E,MATHSIZE5]}
        },
        0x221B:
        {
          dir: V,
          HW: [[1.232,OPERATORSREGULAR], [1.847,MATHSIZE1], [2.460,MATHSIZE2], [3.075,MATHSIZE3]],
          stretch: {top:[0xE0A2,MATHSIZE5], ext:[0xE09E,MATHSIZE5], bot:[0xE09E,MATHSIZE5]}
        },
        0x221C:
        {
          dir: V,
          HW: [[1.232,OPERATORSREGULAR], [1.847,MATHSIZE1], [2.460,MATHSIZE2], [3.075,MATHSIZE3]],
          stretch: {top:[0xE0A6,MATHSIZE5], ext:[0xE09E,MATHSIZE5], bot:[0xE09E,MATHSIZE5]}
        },
        0x2223:
        {
          dir: V,
          HW: [[0.879,OPERATORSREGULAR]],
          stretch: {ext:[0x2223,OPERATORSREGULAR]}
        },
        0x2225:
        {
          dir: V,
          HW: [[0.879,OPERATORSREGULAR]],
          stretch: {ext:[0x2225,OPERATORSREGULAR]}
        },
        0x222B:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x222C:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x222D:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x222E:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x222F:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2230:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2231:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2232:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2233:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x22C0:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x22C1:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x22C2:
        {
          dir: V,
          HW: [[1.032,OPERATORSREGULAR], [1.461,MATHSIZE1]]
        },
        0x22C3:
        {
          dir: V,
          HW: [[1.032,OPERATORSREGULAR], [1.461,MATHSIZE1]]
        },
        0x2308:
        {
          dir: V,
          HW: [[0.926,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]],
          stretch: {mid:[0xE0B8,MATHSIZE5]}
        },
        0x2309:
        {
          dir: V,
          HW: [[0.926,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]],
          stretch: {mid:[0xE0BD,MATHSIZE5]}
        },
        0x230A:
        {
          dir: V,
          HW: [[0.926,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]],
          stretch: {top:[0xE014,MATHSIZE5], ext:[0xE015,MATHSIZE5]}
        },
        0x230B:
        {
          dir: V,
          HW: [[0.926,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]],
          stretch: {top:[0xE01E,MATHSIZE5], ext:[0xE01F,MATHSIZE5]}
        },
        0x2329: {alias: 0x27E8, dir: V},
        0x232A: {alias: 0x27E9, dir: V},
        0x23AF:
        {
          dir: H,
          HW: [[0.315,SYMBOLSREGULAR]],
          stretch: {rep:[0x23AF,SYMBOLSREGULAR]}
        },
        0x23B4:
        {
          dir: H,
          HW: [[0.816,SYMBOLSREGULAR], [0.925,MATHSIZE1], [1.458,MATHSIZE2], [1.991,MATHSIZE3], [2.524,MATHSIZE4], [3.057,MATHSIZE5]],
          stretch: {left:[0xE0CB,MATHSIZE5], ext:[0xE0CC,MATHSIZE5], right:[0xE0CC,MATHSIZE5]}
        },
        0x23B5:
        {
          dir: H,
          HW: [[0.816,SYMBOLSREGULAR], [0.925,MATHSIZE1], [1.458,MATHSIZE2], [1.991,MATHSIZE3], [2.524,MATHSIZE4], [3.057,MATHSIZE5]],
          stretch: {left:[0xE0D2,MATHSIZE5], ext:[0xE0D3,MATHSIZE5], right:[0xE0D3,MATHSIZE5]}
        },
        0x23D0:
        {
          dir: V,
          HW: [[0.304,SYMBOLSREGULAR], [0.690,MAINREGULAR,null,0x007C], [0.879,OPERATORSREGULAR,null,0x2223], [1.350,OPERATORSREGULAR,1.536,0x2223], [1.826,OPERATORSREGULAR,2.078,0x2223], [2.303,OPERATORSREGULAR,2.620,0x2223], [2.779,OPERATORSREGULAR,3.162,0x2223]],
          stretch: {ext:[0x2223,OPERATORSREGULAR]}
        },
        0x23DC:
        {
          dir: H,
          HW: [[0.576,SYMBOLSREGULAR], [0.926,MATHSIZE1], [1.460,MATHSIZE2], [1.886,MATHSIZE3], [2.328,MATHSIZE4], [3.237,MATHSIZE5]],
          stretch: {left:[0xE0D9,MATHSIZE5], ext:[0xE0CC,MATHSIZE5], right:[0xE0CC,MATHSIZE5]}
        },
        0x23DD:
        {
          dir: H,
          HW: [[0.576,SYMBOLSREGULAR], [0.926,MATHSIZE1], [1.460,MATHSIZE2], [1.886,MATHSIZE3], [2.328,MATHSIZE4], [3.237,MATHSIZE5]],
          stretch: {left:[0xE0DF,MATHSIZE5], ext:[0xE0D3,MATHSIZE5], right:[0xE0D3,MATHSIZE5]}
        },
        0x23DE:
        {
          dir: H,
          HW: [[0.576,SYMBOLSREGULAR], [0.925,MATHSIZE1], [1.460,MATHSIZE2], [1.886,MATHSIZE3], [2.328,MATHSIZE4], [3.238,MATHSIZE5]],
          stretch: {left:[0xE0E5,MATHSIZE5], ext:[0xE0CC,MATHSIZE5], rep:[0xE0CC,MATHSIZE5], right:[0xE0E6,MATHSIZE5]}
        },
        0x23DF:
        {
          dir: H,
          HW: [[0.576,SYMBOLSREGULAR], [0.925,MATHSIZE1], [1.460,MATHSIZE2], [1.886,MATHSIZE3], [2.328,MATHSIZE4], [3.238,MATHSIZE5]],
          stretch: {left:[0xE0EC,MATHSIZE5], ext:[0xE0D3,MATHSIZE5], rep:[0xE0D3,MATHSIZE5], right:[0xE0ED,MATHSIZE5]}
        },
        0x23E0:
        {
          dir: H,
          HW: [[0.932,SYMBOLSREGULAR], [1.460,MATHSIZE1], [1.886,MATHSIZE2], [2.312,MATHSIZE3], [2.738,MATHSIZE4], [3.164,MATHSIZE5]]
        },
        0x23E1:
        {
          dir: H,
          HW: [[0.932,SYMBOLSREGULAR], [1.460,MATHSIZE1], [1.886,MATHSIZE2], [2.312,MATHSIZE3], [2.738,MATHSIZE4], [3.164,MATHSIZE5]]
        },
        0x2500: {alias: 0x2212, dir: H},
        0x2758: {alias: 0x2223, dir: V},
        0x2772:
        {
          dir: V,
          HW: [[0.932,MISCREGULAR], [1.230,MATHSIZE1], [1.845,MATHSIZE2], [2.459,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x2773:
        {
          dir: V,
          HW: [[0.932,MISCREGULAR], [1.230,MATHSIZE1], [1.845,MATHSIZE2], [2.459,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x27E6:
        {
          dir: V,
          HW: [[0.930,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x27E7:
        {
          dir: V,
          HW: [[0.930,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x27E8:
        {
          dir: V,
          HW: [[0.926,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x27E9:
        {
          dir: V,
          HW: [[0.926,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.350,MATHSIZE1,1.097], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x27EA:
        {
          dir: V,
          HW: [[0.932,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.845,MATHSIZE2], [2.461,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x27EB:
        {
          dir: V,
          HW: [[0.932,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.845,MATHSIZE2], [2.461,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x27EE:
        {
          dir: V,
          stretch: {top:[0xE004,MATHSIZE5], ext:[0xE005,MATHSIZE5], bot:[0xE005,MATHSIZE5]}
        },
        0x27EF:
        {
          dir: V,
          stretch: {top:[0xE00A,MATHSIZE5], ext:[0xE00B,MATHSIZE5], bot:[0xE00B,MATHSIZE5]}
        },
        0x27F0:
        {
          dir: V,
          stretch: {mid:[0x27F0,ARROWSREGULAR]}
        },
        0x27F1:
        {
          dir: V,
          stretch: {top:[0x27F1,ARROWSREGULAR], ext:[0xE118,MATHSIZE5]}
        },
        0x27F5: {alias: 0x2190, dir: H},
        0x27F6: {alias: 0x2192, dir: H},
        0x27F7: {alias: 0x2194, dir: H},
        0x27F8: {alias: 0x21D0, dir: H},
        0x27F9: {alias: 0x21D2, dir: H},
        0x27FA: {alias: 0x21D4, dir: H},
        0x27FB: {alias: 0x21A4, dir: H},
        0x27FC: {alias: 0x21A6, dir: H},
        0x27FD: {alias: 0x2906, dir: H},
        0x27FE: {alias: 0x2907, dir: H},
        0x2906:
        {
          dir: H,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {left:[0x21D0,ARROWSREGULAR], rep:[0x3D,MAINREGULAR], right:[0x2AE4,OPERATORSREGULAR,0.000,-0.090]}
        },
        0x2907:
        {
          dir: H,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {left:[0x22A8,OPERATORSREGULAR,0.000,-0.090], rep:[0x3D,MAINREGULAR], right:[0x21D2,ARROWSREGULAR]}
        },
        0x290A:
        {
          dir: V,
          stretch: {mid:[0x290A,ARROWSREGULAR]}
        },
        0x290B:
        {
          dir: V,
          stretch: {top:[0x290B,ARROWSREGULAR], ext:[0xE119,MATHSIZE5]}
        },
        0x2912:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {top:[0x2912,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR]}
        },
        0x2913:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {bot:[0x2913,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR]}
        },
        0x294E:
        {
          dir: H,
          HW: [[0.850,ARROWSREGULAR]],
          stretch: {left:[0x21BC,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR], right:[0x21C0,ARROWSREGULAR]}
        },
        0x294F:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {top:[0x21BE,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR], bot:[0x21C2,ARROWSREGULAR]}
        },
        0x2950:
        {
          dir: H,
          HW: [[0.850,ARROWSREGULAR]],
          stretch: {left:[0x21BD,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR], right:[0x21C1,ARROWSREGULAR]}
        },
        0x2951:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {top:[0x21BF,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR], bot:[0x21C3,ARROWSREGULAR]}
        },
        0x2952:
        {
          dir: H,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {left:[0x2952,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR]}
        },
        0x2953:
        {
          dir: H,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {right:[0x2953,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR]}
        },
        0x2954:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {top:[0x2954,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR]}
        },
        0x2955:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {bot:[0x2955,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR]}
        },
        0x2956:
        {
          dir: H,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {left:[0x2956,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR]}
        },
        0x2957:
        {
          dir: H,
          HW: [[0.816,ARROWSREGULAR]],
          stretch: {right:[0x2957,ARROWSREGULAR], rep:[0x2212,OPERATORSREGULAR]}
        },
        0x2958:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {top:[0x2958,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR]}
        },
        0x2959:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {bot:[0x2959,ARROWSREGULAR], ext:[0x23D0,SYMBOLSREGULAR]}
        },
        0x295A:
        {
          dir: H,
          HW: [[0.816,ARROWSREGULAR]]
        },
        0x295B:
        {
          dir: H,
          HW: [[0.816,ARROWSREGULAR]]
        },
        0x295C:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {bot:[0x5F,MAINREGULAR,0.050,-0.010,0.800], ext:[0x23D0,SYMBOLSREGULAR], top:[0x21BE,ARROWSREGULAR]}
        },
        0x295D:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]]
        },
        0x295E:
        {
          dir: H,
          HW: [[0.816,ARROWSREGULAR]]
        },
        0x295F:
        {
          dir: H,
          HW: [[0.816,ARROWSREGULAR]]
        },
        0x2960:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]],
          stretch: {bot:[0x5F,MAINREGULAR,0.050,-0.010,0.800], ext:[0x23D0,SYMBOLSREGULAR], top:[0x21BF,ARROWSREGULAR]}
        },
        0x2961:
        {
          dir: V,
          HW: [[0.818,ARROWSREGULAR]]
        },
        0x2980:
        {
          dir: V,
          HW: [[0.884,SYMBOLSREGULAR]],
          stretch: {ext:[0x2980,SYMBOLSREGULAR]}
        },
        0x2983:
        {
          dir: V,
          HW: [[0.932,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x2984:
        {
          dir: V,
          HW: [[0.932,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.845,MATHSIZE2], [2.460,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x2985:
        {
          dir: V,
          HW: [[0.932,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.848,MATHSIZE2], [2.459,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x2986:
        {
          dir: V,
          HW: [[0.932,SYMBOLSREGULAR], [1.230,MATHSIZE1], [1.848,MATHSIZE2], [2.459,MATHSIZE3], [3.075,MATHSIZE4]]
        },
        0x2997:
        {
          dir: V,
          HW: [[0.932,SYMBOLSREGULAR]]
        },
        0x2998:
        {
          dir: V,
          HW: [[0.932,SYMBOLSREGULAR]]
        },
        0x29F8:
        {
          dir: V,
          HW: [[1.020,SYMBOLSREGULAR], [1.845,MATHSIZE1]]
        },
        0x29F9:
        {
          dir: V,
          HW: [[1.020,SYMBOLSREGULAR], [1.845,MATHSIZE1]]
        },
        0x2A00:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x2A01:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x2A02:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x2A03:
        {
          dir: V,
          HW: [[1.032,OPERATORSREGULAR], [1.461,MATHSIZE1]]
        },
        0x2A04:
        {
          dir: V,
          HW: [[1.032,OPERATORSREGULAR], [1.461,MATHSIZE1]]
        },
        0x2A05:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x2A06:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x2A07:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x2A08:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x2A09:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.451,MATHSIZE1]]
        },
        0x2A0A:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.450,MATHSIZE1]]
        },
        0x2A0B:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A0C:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A0D:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A0E:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A0F:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A10:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A11:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A12:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A13:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A14:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A15:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A16:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A17:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A18:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A19:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A1A:
        {
          dir: V,
          HW: [[1.144,OPERATORSREGULAR], [2.269,MATHSIZE1]]
        },
        0x2A1B:
        {
          dir: V,
          HW: [[1.267,OPERATORSREGULAR], [2.426,MATHSIZE1]]
        },
        0x2A1C:
        {
          dir: V,
          HW: [[1.267,OPERATORSREGULAR], [2.426,MATHSIZE1]]
        },
        0x2AFC:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.230,MATHSIZE1], [1.875,MATHSIZE2]]
        },
        0x2AFF:
        {
          dir: V,
          HW: [[1.022,OPERATORSREGULAR], [1.230,MATHSIZE1], [1.875,MATHSIZE2]]
        },
        0x2B45:
        {
          dir: H,
          stretch: {left:[0x2B45,SHAPESREGULAR], ext:[0xE14D,MATHSIZE5]}
        },
        0x2B46:
        {
          dir: H,
          stretch: {rep:[0x2B46,SHAPESREGULAR]}
        },
        0x3008: {alias: 0x27E8, dir: V},
        0x3009: {alias: 0x27E9, dir: V},
        0xFE37: {alias: 0x23DE, dir: H},
        0xFE38: {alias: 0x23DF, dir: H}
      }

      // FONTMETRICS

  AJAX.loadComplete(HTMLCSS.fontDir + "/fontdata.js");

})(MathJax.OutputJax["HTML-CSS"],MathJax.Ajax);
