import {ParserTest} from './parser-tests.js';
import 'mathjax3/js/input/tex/configmacros/ConfigMacrosConfiguration.js';


class ParserConfigMacrosTest extends ParserTest {

  constructor() {
    super();
    this.packages = ['base', 'configmacros'];
    Object.assign(this.settings, {macros:{}});
  }

  runTest(name, macro, tex1, tex2, expected) {
    Object.assign(this.settings.macros, macro);
    super.runTest(name, tex1, expected);
    super.runTest(name, tex2, expected);
  }
  
}

let parserTest = new ParserConfigMacrosTest();

parserTest.runTest(
  'Macros Simple', {RR: '{\\bf R}'},
  '{\\bf R}', '\\RR', 
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
        {"kind": "TeXAtom",
         "texClass": 0,
         "attributes": {},
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
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {"mathvariant": "bold"},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "R"}]}],
              "isInferred": true}]}],
      "isInferred": true}]}
);

parserTest.runTest(
  'Macros Argument', {bold: ['{\\bf #1}', 1]},
  '{\\bf bold}', '\\bold{bold}',
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
        {"kind": "TeXAtom",
         "texClass": 0,
         "attributes": {},
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
              {"kind": "mi",
               "texClass": 0,
               "attributes": {"mathvariant": "bold"},
               "inherited": {"displaystyle": true,
                             "scriptlevel": 0,
                             "mathvariant": "italic"},
               "properties": {},
               "childNodes": [
                 {"kind": "text",
                  "text": "b"}]},
              {"kind": "mi",
               "texClass": 0,
               "attributes": {"mathvariant": "bold"},
               "inherited": {"displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "o"}]},
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {"mathvariant": "bold"},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "l"}]},
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {"mathvariant": "bold"},
                  "inherited": {"displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "d"}]}],
              "isInferred": true}]}],
      "isInferred": true}]}
);

parserTest.runTest(
  'Macros Aux Argument',
  {foo: ['\\mbox{first } #1 \\mbox{ second } #2', 2, ['[', ']']]},
  '\\mbox{first } hi \\mbox{ second } there',
  '\\foo[hi]{there}',
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
        {"kind": "mstyle",
         "texClass": 0,
         "attributes": {"displaystyle": false,
                        "scriptlevel": 0},
         "inherited": {},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": 0,
            "attributes": {},
            "inherited": {"displaystyle": false,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mtext",
               "texClass": 0,
               "attributes": {},
               "inherited": {"displaystyle": false,
                             "scriptlevel": 0},
               "properties": {},
               "childNodes": [
                 {"kind": "text",
                  "text": "first "}],
               "isSpacelike": true}],
            "isInferred": true,
            "isSpacelike": true}],
         "isSpacelike": true},
        {"kind": "mi",
         "texClass": 0,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0,
                       "mathvariant": "italic"},
         "properties": {},
         "childNodes": [
           {"kind": "text",
            "text": "h"}]},
        {"kind": "mi",
         "texClass": 0,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0,
                       "mathvariant": "italic"},
         "properties": {},
         "childNodes": [
           {"kind": "text",
            "text": "i"}]},
        {"kind": "mstyle",
         "texClass": 0,
         "attributes": {"displaystyle": false,
                        "scriptlevel": 0},
         "inherited": {},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": 0,
            "attributes": {},
            "inherited": {"displaystyle": false,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mtext",
               "texClass": 0,
               "attributes": {},
               "inherited": {"displaystyle": false,
                    "scriptlevel": 0},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": " second "}],
                  "isSpacelike": true}],
              "isInferred": true,
              "isSpacelike": true}],
          "isSpacelike": true},
        {"kind": "mi",
          "texClass": 0,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0,
            "mathvariant": "italic"},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "t"}]},
        {"kind": "mi",
          "texClass": 0,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0,
            "mathvariant": "italic"},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "h"}]},
        {"kind": "mi",
          "texClass": 0,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0,
            "mathvariant": "italic"},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "e"}]},
        {"kind": "mi",
          "texClass": 0,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0,
            "mathvariant": "italic"},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "r"}]},
        {"kind": "mi",
          "texClass": 0,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0,
            "mathvariant": "italic"},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "e"}]}],
      "isInferred": true}]}
);
