import {mathjax} from '../mathjax3/js/mathjax.js';

import {AsciiMath} from '../mathjax3/js/input/asciimath.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
import {STATE} from '../mathjax3/js/core/MathItem.js';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('<html></html>', {
  InputJax: new AsciiMath()
});

import {SerializedMmlVisitor as MmlVisitor} from '../mathjax3/js/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new MmlVisitor();
let toMml = (node => visitor.visitTree(node, html.document));

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[2] || '', {end: STATE.CONVERT});
    console.log(toMml(math));

}).catch(err => console.log(err.stack));
