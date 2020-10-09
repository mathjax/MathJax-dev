/*************************************************************
 *
 *  Copyright (c) 2020 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


/**
 * @fileoverview Factory for tests based on JSON input files.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

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
    let tests = files.map(
      file => TestFactory.create(TestFactory.testDir + '/' + file));
    return tests;
  }

}
