import {mathjax} from '../mathjax3/js/mathjax.js';

import {TeX} from '../mathjax3/js/input/tex.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
import {STATE} from '../mathjax3/js/core/MathItem.js';
import {AllPackages} from '../mathjax3/js/input/tex/AllPackages.js';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('<html></html>', {
  InputJax: new TeX({packages: AllPackages})
});

import {JsonMmlVisitor} from '../mathjax3/js/core/MmlTree/JsonMmlVisitor.js';
let visitor = new JsonMmlVisitor();
let toJSON = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[3] || '', {end: STATE.CONVERT});
    math.setTeXclass();
    console.log(JSON.stringify(toJSON(math)));

}).catch(err => console.log(err.stack));
