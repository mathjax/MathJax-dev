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
 * @fileoverview All classes that test the TeX parser.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {mathjax} from '../node_modules/mathjax-full/js/mathjax.js';

import {TeX} from '../node_modules/mathjax-full/js/input/tex.js';
import {RegisterHTMLHandler} from "../node_modules/mathjax-full/js/handlers/html.js";
import {chooseAdaptor} from "../node_modules/mathjax-full/js/adaptors/chooseAdaptor.js";
import {JsonMmlVisitor} from '../node_modules/mathjax-full/js/core/MmlTree/JsonMmlVisitor.js';
import {STATE} from '../node_modules/mathjax-full/js/core/MathItem.js';

import {TagsFactory} from '../node_modules/mathjax-full/js/input/tex/Tags.js';
import {MapHandler} from "../node_modules/mathjax-full/js/input/tex/MapHandler.js";
import {AllPackages} from '../node_modules/mathjax-full/js/input/tex/AllPackages.js';

import {JsonTest, Test} from './test.js';

let fs = require('fs');

RegisterHTMLHandler(chooseAdaptor());


/**
 * Parser tests from JSON input files.
 */
export class ParserJsonTest extends JsonTest {

  packages = ['ams', 'base'];
  settings = {tags: 'none'};
  name = '';

  /**
   * @override
   */
  constructor(json) {
    super(json);
    this.packages = this.json['packages'] || this.packages;
    this.name = this.json['name'] || this.name;
    this.settings = this.json['settings'] || this.settings;
    this.processSettings();
    console.log('\u001B\u005B\u0033\u0034\u006D' +
                'Running tests from ' + (this.name || this.constructor.name) +
                '\u001B\u005B\u0033\u0037\u006D');
  }

  processSettings() {
    // Processing regular expressions.
    for (let set of ['digit', 'letter', 'special']) {
      if (this.settings[set]) {
        this.settings[set] = RegExp(this.settings[set]);
      }
    }
  }

  document(options) {
    return mathjax.document('<html></html>', {
      InputJax: new TeX(options)
    });
  }

  /**
   * @override
   */
  runTest(name, tex, expected, rest) {
    this.test(
      name,
      t => {
        mathjax.handleRetriesFor(function() {
          let options = {packages: this.packages};
          Object.assign(options, this.settings);
          let root = this.document(options).convert(tex, {end: STATE.CONVERT});
          let jv = new JsonMmlVisitor();
          root.setTeXclass(null);
          let actual = jv.visitTree(root);
          t.deepEqual(actual, expected, name);
        }.bind(this)).catch(err => {
          console.log(err.message);
          console.log(err.stack.replace(/\n.*\/system\.js:(.|\n)*/, ''));
        });
      }
    );
  }

}


import {SVG} from '../node_modules/mathjax-full/js/output/svg.js';

/**
 * Parser tests for packages that require an output jax.
 */
export class ParserOutputTest extends ParserJsonTest {

  /**
   * @override
   */
  document(options) {
    return mathjax.document('<html></html>', {
      InputJax: new TeX(options), OutputJax: new SVG()
    });
  }
  
}

import {Configuration} from '../node_modules/mathjax-full/js/input/tex/Configuration.js';
import {CharacterMap} from '../node_modules/mathjax-full/js/input/tex/SymbolMap.js';
import ParseMethods from '../node_modules/mathjax-full/js/input/tex/ParseMethods.js';

/**
 * Parser tests for multi relations method.
 */
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


/**
 * Parser tests for macro configurations.
 */
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

