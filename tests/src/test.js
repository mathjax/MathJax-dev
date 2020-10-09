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
 * @fileoverview Basic test classes.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

/* globals System: true */

let fs = require('fs');

export class Test {

  failedTests = [];
  failed = false;
  time = 0;
  
  constructor() {
    /**
     * @type {Object.<string, number>}
     */
    this.runningTests = {};

    /**
     * @type {Object.<string, number>}
     */
    this.concludedTests = {};

    // this.createStream();
  }


  /**
   * @param {string} name The name of the test.
   * @private
   */
  startTest(name) {
    this.concludedTests[name] = (new Date()).getTime();
  }

  /**
   * @param {string} name The name of the test.
   * @private
   */
  registerTest(name) {
    this.runningTests[name] = true;
  }

  stopTest(name) {
    this.concludedTests[name] =
        (new Date()).getTime() - this.concludedTests[name];
    delete this.runningTests[name];
  }


  printTime() {
    if (Object.keys(this.runningTests).length) {
      setTimeout(this.printTime.bind(this), 100);
      return;
    }
    for (var test in this.concludedTests) {
      this.time += this.concludedTests[test];
      delete this.concludedTests[test];
    }
    process.stdout.write(this.name + ': ' + this.time + 'ms\n');
  }

  test(name, func) {
    this.registerTest(name);
    test(name, function(t) {
      this.startTest(name);
      t.plan(1);
      func(t);
      this.stopTest(name);
    }.bind(this));
  }

  createStream() {
    test.createStream({ objectMode: true }).on('data', result => {
      if (result.type !== 'assert') return;
      process.stdout.write('Running test ' + result.name + '\t' +
                           (result.ok ?
                            ('\u001B\u005B\u0033\u0032\u006D' + 'PASS' +
                             '\u001B\u005B\u0033\u0037\u006D') :
                            ('\u001B\u005B\u0033\u0031\u006D' + 'FAIL' +
                             '\u001B\u005B\u0033\u0037\u006D')) +
                           '\n');
      if (result.ok) return;
      this.failed = true;
      this.failedTests.push(result.name);
      process.stdout.write('Actual: \n');
      process.stdout.write(JSON.stringify(result.actual) + '\n');
      process.stdout.write('Expected: \n');
      process.stdout.write(JSON.stringify(result.expected) + '\n');
    });
  }

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
    // this.printTime();
  }
  
}
