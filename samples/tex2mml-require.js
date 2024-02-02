import {mathjax} from 'mathjax-full/js/mathjax.js';

import {TeX} from 'mathjax-full/js/input/tex.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';
import {APPEND} from 'mathjax-full/js/util/Options.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';

import 'mathjax-full/js/input/tex/base/BaseConfiguration.js';
import 'mathjax-full/js/input/tex/require/RequireConfiguration.js';
import 'mathjax-full/js/input/tex/config_macros/ConfigMacrosConfiguration.js';
import 'mathjax-full/js/input/tex/autoload/AutoloadConfiguration.js';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('<html></html>', {
    InputJax: new TeX({
        packages: {[APPEND]: ['require', 'autoload', 'configMacros']},
        macros: {
          RR: "{\\bf R}",
          bold: ["{\\bf #1}", 1]
        }
    })
});

import {SerializedMmlVisitor} from 'mathjax-full/js/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new SerializedMmlVisitor();
let toMml = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

  let math = html.convert(process.argv[2] || '', {end: STATE.ENRICHED});
  console.log(toMml(math));

}).catch(err => console.log(err.stack));
