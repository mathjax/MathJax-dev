import {mathjax} from '../mathjax3/js/mathjax.js';

import {MathML} from '../mathjax3/js/input/mathml.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
import {STATE} from '../mathjax3/js/core/MathItem.js';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('<html></html>', {
  InputJax: new MathML()
});

import {TestMmlVisitor as MmlVisitor} from '../mathjax3/js/core/MmlTree/TestMmlVisitor.js';
let visitor = new MmlVisitor();
let toMathML = (node => visitor.visitTree(node, html.document));

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[3] || '<math></math>', {end: STATE.COMPILE});
    console.log(toMathML(math));

}).catch(err => console.log(err.stack));
