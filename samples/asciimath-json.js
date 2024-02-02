import {mathjax} from 'mathjax-full/js/mathjax.js';

import {AsciiMath} from 'mathjax-full/js/input/asciimath.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';

RegisterHTMLHandler(chooseAdaptor());

const html = mathjax.document('<html></html>', {
  InputJax: new AsciiMath()
});

import {JsonMmlVisitor} from 'mathjax-full/js/core/MmlTree/JsonMmlVisitor.js';
const visitor = new JsonMmlVisitor();
const toJSON = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[2] || '', {end: STATE.CONVERT});
    math.setTeXclass();
    console.log(JSON.stringify(toJSON(math)));

}).catch(err => console.log(err.stack));
