import {mathjax} from 'mathjax-full/js/mathjax.js';

import {MathML} from 'mathjax-full/js/input/mathml.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('<html></html>', {
  InputJax: new MathML()
});

import {TestMmlVisitor as MmlVisitor} from 'mathjax-full/js/core/MmlTree/TestMmlVisitor.js';
let visitor = new MmlVisitor();
let toMathML = (node => visitor.visitTree(node, html.document));

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[2] || '<math></math>', {end: STATE.COMPILE});
    console.log(toMathML(math));

}).catch(err => console.log(err.stack));
