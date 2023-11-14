import {mathjax} from 'mathjax-full/js/mathjax.js';

import {TeX} from 'mathjax-full/js/input/tex.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';
import {AllPackages} from 'mathjax-full/js/input/tex/AllPackages.js';
import {CHTML} from 'mathjax-full/js/output/chtml.js';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('<html></html>', {
  InputJax: new TeX({packages: AllPackages}),
  OutputJax: new CHTML({})
});

import {SerializedMmlVisitor as MmlVisitor} from 'mathjax-full/js/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new MmlVisitor();
let toMml = (node => visitor.visitTree(node, html.document));

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[2] || '', {end: STATE.CONVERT});
    console.log(toMml(math));

}).catch(err => console.log(err.stack));
