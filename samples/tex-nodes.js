import {mathjax} from '../mathjax3/js/mathjax.js';

import {TeX} from '../mathjax3/js/input/tex.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('<html></html>',{
  InputJax: new TeX()
});

import {TestMmlVisitor} from '../mathjax3/js/core/MmlTree/TestMmlVisitor.js';
let visitor = new TestMmlVisitor();
let toMathML = (node => visitor.visitTree(node, html.document));

mathjax.handleRetriesFor(() => {

    html.TestMath(process.argv[3] || '').compile();
    let math = html.math.pop().root;
    math.setTeXclass();
    console.log(toMathML(math));

}).catch(err => console.log(err.stack));
