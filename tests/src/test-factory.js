import * as pt from './parser-test.js';
import {KeyvalTest} from './other-test.js';
import {JsonTest} from './test.js';
let fs = require('fs');

export class TestFactory {

  static factory = {
    'keyvalTest': KeyvalTest,
    'parserConfigMacros': pt.ParserConfigMacrosTest,
    'parserMultirel': pt.ParserMultirelTest,
    'parserOutput': pt.ParserOutputTest,
    'parserTest': pt.ParserJsonTest,
    'test': JsonTest
  }

  static create(filename) {
    let json = JSON.parse(fs.readFileSync(filename));
    let constructor = TestFactory.factory[json.factory] || JsonTest;
    return new constructor(json);
  }
  
  /**
   *  
   * Below is the code for automatically running all tests in the json
   * subdirectory.
   *
   */
  static testDir = 'json';

  // Currently this does not work due to async interactions.
  static allParserTests = function() {
    let files = [];
    if (fs.lstatSync(TestFactory.testDir).isDirectory()) {
      files = fs.readdirSync(TestFactory.testDir).filter(x => x.match(/\.json$/));
    }
    let tests = files.filter(
      file => TestFactory.create(TestFactory.testDir + '/' + file));
    return tests;
  }

}
