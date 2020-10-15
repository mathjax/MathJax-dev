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
import {JsonTest} from './base-test.js';
import * as fs from 'fs';
import * as process from 'process';
import * as path from 'path';

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
  static baseDir = __dirname;
  static testDir = 'json';

  static testsRecursive = function(path, result) {
    if (typeof path === 'undefined') {
      return;
    }
    if (fs.lstatSync(path).isDirectory()) {
      let files = fs.readdirSync(path);
      files.forEach(
        x => TestFactory.testsRecursive(path ? path + '/' + x : x, result));
      return;
    }
    if (path.match(/\.json$/)) {
      result.push(path);
    }
  }

  static allJsonTests = function(jsonDir) {
    let dir = TestFactory.getDir(jsonDir);
    let files = [];
    TestFactory.testsRecursive(dir, files);
    let tests = files.map(TestFactory.create);
    return tests;
  }

  static someJsonTests = function() {
    return process.argv.filter(x => x.match(/\.json$/))
      .map(TestFactory.create);
  }

  static getDir = function(dir) {
    try {
      fs.lstatSync(dir).isDirectory();
      return dir;
    } catch (e) {
      dir = path.join(TestFactory.baseDir, '..', dir);
    }
    try {
      fs.lstatSync(dir).isDirectory();
      return dir;
    } catch (e) {
      dir = path.join(TestFactory.testDir, dir);
    }
    try {
      fs.lstatSync(dir).isDirectory();
      return dir;
    } catch (e) {
      dir = path.join(TestFactory.baseDir, '..', TestFactory.testDir, dir);
    }
    try {
      fs.lstatSync(dir).isDirectory();
      return dir;
    } catch (e) {
      return dir;
    }
  }

  static runTests = function(jsonDir = TestFactory.testDir) {
    let tests = TestFactory.someJsonTests();
    tests = tests.length ? tests : TestFactory.allJsonTests(jsonDir);
    tests.forEach( x => x.runTests());
  }

}
