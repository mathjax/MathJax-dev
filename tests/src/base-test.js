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
 * @fileoverview Basic abstract test classes.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

/* globals System: true */

export class Test {

  runTest(name, input, expected, rest) {}

}


export class JsonTest extends Test { 

  json = {};
  name = '';
  tests = {};
  
  constructor(json) {
    super();
    this.json = json;
    this.parseJson();
  }
  
  parseJson()  {
    this.name = this.json.name || '';
    this.tests = this.json.tests || {};
  }

  runTests() {
    describe(
      'Running tests from ' + this.name, () =>
        {             
          for (const [name, {input, expected, ...rest}] of Object.entries(this.tests)) {
            this.runTest(name, input, expected, rest);
          }});
  }
  
}
