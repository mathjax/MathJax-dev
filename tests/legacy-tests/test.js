/* globals System: true */

let test = require('tape');
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

    this.createStream();
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
    process.stdout.write(this.constructor.name + ': ' + this.time + 'ms\n');
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
    for (const [name, {input, expected, ...rest}] of Object.entries(this.tests)) {
      this.runTest(name, input, expected, rest);
    }
    this.printTime();
  }
  
}
