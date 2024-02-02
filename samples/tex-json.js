import {mathjax} from 'mathjax-full/js/mathjax.js';

import {TeX} from 'mathjax-full/js/input/tex.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';
import {AllPackages} from 'mathjax-full/js/input/tex/AllPackages.js';
import {CHTML} from 'mathjax-full/js/output/chtml.js';
import 'mathjax-full/js/input/tex/physics/PhysicsConfiguration.js';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('<html></html>', {
  InputJax: new TeX({packages: ['base', 'physics']}),
  OutputJax: new CHTML()
});

import {JsonMmlVisitor} from 'mathjax-full/js/core/MmlTree/JsonMmlVisitor.js';
let visitor = new JsonMmlVisitor();
let toJSON = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[2] || '', {end: STATE.CONVERT});
    math.setTeXclass();
    console.log(JSON.stringify(toJSON(math)));

}).catch(err => console.log(err.stack));
