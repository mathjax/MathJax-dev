import {ParserJsonTest} from './parser-test.js';
import {KeyvalTest, ParserMultirelTest, ParserConfigMacrosTest} from './other-test.js';
import {JsonTest} from './test.js';
let fs = require('fs');

export class TestFactory {

  static factory = {
    'keyvalTest': KeyvalTest,
    'parserConfigMacros': ParserConfigMacrosTest,
    'parserMultirel': ParserMultirelTest,
    'parserTest': ParserJsonTest,
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
