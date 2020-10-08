import {ParserJsonTest} from './parser-test.js';
import {Configuration} from './node_modules/mathjax-full/js/input/tex/Configuration.js';
import {CharacterMap} from './node_modules/mathjax-full/js/input/tex/SymbolMap.js';
import ParseMethods from './node_modules/mathjax-full/js/input/tex/ParseMethods.js';


export class ParserMultirelTest extends ParserJsonTest {

  constructor(json) {
    // Just some things bogus attributes for testing.
    new CharacterMap('shadow', ParseMethods.mathchar0mo, {
      sim: ['\u223C', {something: 'nothing'}],
      simeq: ['\u2243', {something: 'nothing'}],
      asymp: ['\u224D', {something: 'else'}],
      cong: ['\u224D', {anything: 'nothing'}],
      lesssim: ['\u2272', {lspace: '1pt'}],
      gtrsim: ['\u2278', {rspace: '1pt'}]
    });
    Configuration.create('multirel-test', {handler: {macro: ['shadow']}, priority: 4});
    super(json);
    this.packages = ['base', 'ams', 'multirel-test'];
  }

}


export class ParserConfigMacrosTest extends ParserJsonTest {

  constructor(json) {
    super(json);
    this.packages = ['base', 'configmacros'];
    Object.assign(this.settings, {macros:{}});
  }

  runTest(name, input, expected, {macro, control}) {
    Object.assign(this.settings.macros, macro);
    super.runTest(name, control, expected);
    super.runTest(name, input, expected);
  }
  
}

