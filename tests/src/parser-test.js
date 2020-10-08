import {mathjax} from '../node_modules/mathjax-full/js/mathjax.js';

import {TeX} from '../node_modules/mathjax-full/js/input/tex.js';
import {SVG} from '../node_modules/mathjax-full/js/output/svg.js';
import {RegisterHTMLHandler} from "../node_modules/mathjax-full/js/handlers/html.js";
import {chooseAdaptor} from "../node_modules/mathjax-full/js/adaptors/chooseAdaptor.js";
import {JsonMmlVisitor} from '../node_modules/mathjax-full/js/core/MmlTree/JsonMmlVisitor.js';
import {STATE} from '../node_modules/mathjax-full/js/core/MathItem.js';

import {TagsFactory} from '../node_modules/mathjax-full/js/input/tex/Tags.js';
import {MapHandler} from "../node_modules/mathjax-full/js/input/tex/MapHandler.js";

import {JsonTest, Test} from './test.js';

import {AllPackages} from '../node_modules/mathjax-full/js/input/tex/AllPackages.js';
import '../node_modules/mathjax-full/js/input/tex/base/BaseConfiguration.js';
import '../node_modules/mathjax-full/js/input/tex/ams/AmsConfiguration.js';

let fs = require('fs');

RegisterHTMLHandler(chooseAdaptor());

export class ParserJsonTest extends JsonTest {

  packages = ['ams', 'base'];
  settings = {tags: 'none'};
  name = '';

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


  runTest(name, tex, expected, rest) {
    this.test(
      name,
      t => {
        mathjax.handleRetriesFor(function() {
          let options = {packages: this.packages};
          Object.assign(options, this.settings);
          let html = mathjax.document('<html></html>', {
            InputJax: new TeX(options), OutputJax: new SVG()
          });
          let root = html.convert(tex, {end: STATE.CONVERT});
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
