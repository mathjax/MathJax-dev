import {mathjax} from './node_modules/mathjax-full/js/mathjax.js';

import {TeX} from './node_modules/mathjax-full/js/input/tex.js';
import {RegisterHTMLHandler} from "./node_modules/mathjax-full/js/handlers/html.js";
import {chooseAdaptor} from "./node_modules/mathjax-full/js/adaptors/chooseAdaptor.js";
import {JsonMmlVisitor} from './node_modules/mathjax-full/js/core/MmlTree/JsonMmlVisitor.js';
import {STATE} from './node_modules/mathjax-full/js/core/MathItem.js';

import {TagsFactory} from './node_modules/mathjax-full/js/input/tex/Tags.js';
import {MapHandler} from "./node_modules/mathjax-full/js/input/tex/MapHandler.js";

import {Test} from './test.js';
import './node_modules/mathjax-full/js/input/tex/base/BaseConfiguration.js';
import './node_modules/mathjax-full/js/input/tex/ams/AmsConfiguration.js';


RegisterHTMLHandler(chooseAdaptor());

export class ParserTest extends Test {

  
  constructor() {
    super();
    this.packages = ['ams', 'base'];
    this.settings = {tags: 'none'};
    console.log('\u001B\u005B\u0033\u0034\u006D' +
                'Running tests from ' + this.constructor.name +
                '\u001B\u005B\u0033\u0037\u006D');
  }

  // Tests exclusively the timing of the Translate method.
  runTest(name, tex, expected) {
    this.test(
      name,
      t => {
        mathjax.handleRetriesFor(function() {
          let options = {packages: this.packages};
          Object.assign(options, this.settings);
          let html = mathjax.document('<html></html>', {
            InputJax: new TeX(options),
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
  
  ignoreTest(name, tex, expected) {
  }
  
}
