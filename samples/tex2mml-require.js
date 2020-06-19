import {mathjax} from '../mathjax3/js/mathjax.js';

import {TeX} from '../mathjax3/js/input/tex.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
import {APPEND} from '../mathjax3/js/util/Options.js';
import {STATE} from '../mathjax3/js/core/MathItem.js';

import '../mathjax3/js/input/tex/base/BaseConfiguration.js';
import '../mathjax3/js/input/tex/require/RequireConfiguration.js';
import '../mathjax3/js/input/tex/config_macros/ConfigMacrosConfiguration.js';
import '../mathjax3/js/input/tex/autoload/AutoloadConfiguration.js';

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

import {SerializedMmlVisitor} from '../mathjax3/js/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new SerializedMmlVisitor();
let toMml = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

  let math = html.convert(process.argv[2] || '', {end: STATE.ENRICHED});
  console.log(toMml(math));

}).catch(err => console.log(err.stack));
