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
 * @fileoverview The current test runner.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {TestFactory} from './test-factory.js';
let process = require('process');


let file = null;

if (process.argv.length > 2) {
  let last = process.argv[process.argv.length - 1];
  if (!last.match(/^--/) && last.match(/\.json/)) {
    file = last;
  }
}

if (file) {
  TestFactory.create(file).runTests();
  process.exit;
}

if (!file) {
  let tests = TestFactory.allParserTests();
  tests.forEach( x => x.runTests());
}

