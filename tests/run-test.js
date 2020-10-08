import {TestFactory} from './test-factory.js';
let process = require('process');

let file = process.argv[2];
if (file) {
  TestFactory.create(file).runTests();
}
