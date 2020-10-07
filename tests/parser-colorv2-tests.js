import {ParserTest} from './parser-test.js';
import './node_modules/mathjax-full/js/input/tex/colorv2/ColorV2Configuration.js';


class ParserColorV2Test extends ParserTest {

  constructor() {
    super();
    this.packages = ['base', 'colorv2'];
  }

}

let parserTest = new ParserColorV2Test();

parserTest.runTest(
  'Color Open', '\\color{red}{ab}',
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
         "attributes": {"mathcolor": "red"},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": 0,
            "attributes": {},
            "inherited": {"mathcolor": "red",
                          "displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mi",
               "texClass": 0,
               "attributes": {},
               "inherited": {"mathcolor": "red",
                    "displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "a"}]},
                {"kind": "mi",
                  "texClass": 0,
                  "attributes": {},
                  "inherited": {"mathcolor": "red",
                    "displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "b"}]}],
              "isInferred": true}]}],
      "isInferred": true}]}
);
  
  
parserTest.runTest(
  'Color Enclosed', '\\color{red}ab',
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
         "attributes": {"mathcolor": "red"},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": 0,
            "attributes": {},
            "inherited": {"mathcolor": "red",
                          "displaystyle": true,
                          "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mi",
               "texClass": 0,
               "attributes": {},
               "inherited": {"mathcolor": "red",
                    "displaystyle": true,
                    "scriptlevel": 0,
                    "mathvariant": "italic"},
                  "properties": {},
                  "childNodes": [
                    {"kind": "text",
                      "text": "a"}]}],
              "isInferred": true}]},
        {"kind": "mi",
          "texClass": 0,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0,
            "mathvariant": "italic"},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "b"}]}],
      "isInferred": true}]}
);


parserTest.runTest(
  'Color Frac', '\\frac{{\\cal \\color{red}{X}}}{\\color{blue}{\\sf y}}',
  {"kind":"math",
   "texClass":null,
   "attributes":{"display":"block"},
   "inherited":{"displaystyle":true,
                "scriptlevel":0},
   "properties":{},
   "childNodes":[
     {"kind":"mrow",
      "texClass":null,
      "attributes":{},
      "inherited":{
        "displaystyle":true,
        "scriptlevel":0},
      "properties":{},
      "childNodes":[
        {"kind":"mfrac",
         "texClass":null,
         "attributes":{},
         "inherited":{
           "displaystyle":true,
           "scriptlevel":0},
         "properties":{},
         "childNodes":[
           {"kind":"TeXAtom",
            "texClass":0,
            "attributes":{},
            "inherited":{
              "displaystyle":false,
              "scriptlevel":0},
            "properties":{},
            "childNodes":[
              {"kind":"mrow",
               "texClass":0,
               "attributes":{},
               "inherited":{
                 "displaystyle":false,
                 "scriptlevel":0},
               "properties":{},
               "childNodes":[
                 {"kind":"mstyle",
                  "texClass":0,
                  "attributes":{"mathcolor":"red"},
                  "inherited":{
                    "displaystyle":false,
                    "scriptlevel":0},
                  "properties":{},
                  "childNodes":[
                    {"kind":"mrow",
                     "texClass":0,
                     "attributes":{},
                     "inherited":{
                       "mathcolor":"red",
                       "displaystyle":false,
                       "scriptlevel":0},
                     "properties":{},
                     "childNodes":[
                       {"kind":"mi",
                        "texClass":0,
                        "attributes":{"mathvariant":"-tex-calligraphic"},
                        "inherited":{
                          "mathcolor":"red",
                          "displaystyle":false,
                          "scriptlevel":0,
                          "mathvariant":"italic"},
                        "properties":{},
                        "childNodes":[
                          {"kind":"text",
                           "text":"X"}]}],
                     "isInferred":true}]}],
               "isInferred":true}]},
           {"kind":"mstyle",
            "texClass":0,
            "attributes":{"mathcolor":"blue"},
            "inherited":{
              "displaystyle":false,
              "scriptlevel":0},
            "properties":{"texprimestyle":true},
            "childNodes":[
              {"kind":"mrow",
               "texClass":0,
               "attributes":{},
               "inherited":{
                 "mathcolor":"blue",
                 "displaystyle":false,
                 "scriptlevel":0},
               "properties":{"texprimestyle":true},
               "childNodes":[
                 {"kind":"mi",
                  "texClass":0,
                  "attributes":{"mathvariant":"sans-serif"},
                  "inherited":{
                    "mathcolor":"blue",
                    "displaystyle":false,
                    "scriptlevel":0,
                    "mathvariant":"italic"},
                  "properties":{"texprimestyle":true},
                  "childNodes":[
                    {"kind":"text",
                     "text":"y"}]}],
               "isInferred":true}]}]}],
      "isInferred":true}]}
);
