import {ParserTest} from './parser-test.js';
import './node_modules/mathjax-full/js/input/tex/newcommand/NewcommandConfiguration.js';

class ParserNewcommandErrorTest extends ParserTest {

  constructor() {
    super();
    this.packages = ['base', 'ams', 'newcommand'];
  }

}

let parserTest = new ParserNewcommandErrorTest();

parserTest.runTest(
  'No Sequence', '\\def\\bar[#1]#3{}', 
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Parameters for \\bar must be numbered sequentially"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Parameters for \\bar must be numbered sequentially"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'No CS', '\\def{\\bar}[#1]#2{}', 
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"\\def must be followed by a control sequence"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
                {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "\\def must be followed by a control sequence"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Illegal Hash', '\\def\\bar[##1]#2{#1}', 
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Illegal use of # in template for \\bar"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
                {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Illegal use of # in template for \\bar"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'No Replacement', '\\def\\bar[#1]#2', 
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Missing replacement string for definition of \\def"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
                {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Missing replacement string for definition of \\def"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Runaway Argument', '\\def\\bar[#1]#2{}\\bar[', 
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Runaway argument for \\bar?"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
                {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Runaway argument for \\bar?"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Illegal CS', '\\newcommand{\\11}{a}', 
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Illegal control sequence name for \\newcommand"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
                {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Illegal control sequence name for \\newcommand"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Illegal Parameter Number', '\\newenvironment{hh}[a]{}{}', 
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Illegal number of parameters specified in \\newenvironment"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Illegal number of parameters specified in \\newenvironment"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Let Undefined CS', '\\let\\aa\\bb \\aa', 
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Undefined control sequence \\aa"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
                {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Undefined control sequence \\aa"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Missing Arguments', '\\def\\bar[#1]#2#3{c + c}\\bar', 
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Use of \\bar doesn't match its definition"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
                {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Use of \\bar doesn't match its definition"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Single Let Error', '\\let\\aa\\textbf\\let\\bb\\aa\\aa', 
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Missing argument for \\aa"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
                {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Missing argument for \\aa"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Double Let Error', '\\let\\aa\\textbf\\let\\bb\\aa\\bb', 
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Missing argument for \\bb"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
                {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Missing argument for \\bb"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Triple Let Error', '\\let\\aa\\textbf\\let\\bb\\aa\\let\\textbf\\sqrt\\textbf[1]',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Missing argument for \\textbf"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
                {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Missing argument for \\textbf"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Illegal Argument Number', '\\newcommand{\\foo}[a]{#1 + #2}',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"Illegal number of parameters specified in \\newcommand"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "Illegal number of parameters specified in \\newcommand"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);

 
parserTest.runTest(
  'Optional Brace Error', '\\def\\bar[{#1}]#2{#1 + #2}',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "merror",
         "texClass": 0,
         "attributes": {
           "data-mjx-error":"You can't use 'macro parameter character #' in math mode"
         },
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": null,
            "attributes": {},
            "inherited": {"displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mtext",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "You can't use 'macro parameter character #' in math mode"}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}]}],
      "isInferred": true}]}
);


parserTest.printTime();
