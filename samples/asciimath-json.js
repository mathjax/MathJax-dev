import {mathjax} from '../mathjax3/js/mathjax.js';

import {AsciiMath} from '../mathjax3/js/input/asciimath.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
import {STATE} from '../mathjax3/js/core/MathItem.js';

RegisterHTMLHandler(chooseAdaptor());

const html = mathjax.document('<html></html>', {
  InputJax: new AsciiMath()
});

import {JsonMmlVisitor} from '../mathjax3/js/core/MmlTree/JsonMmlVisitor.js';
const visitor = new JsonMmlVisitor();
const toJSON = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[3] || '', {end: STATE.CONVERT});
    math.setTeXclass();
    console.log(JSON.stringify(toJSON(math)));

}).catch(err => console.log(err.stack));
