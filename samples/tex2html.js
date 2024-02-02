import {mathjax} from 'mathjax-full/js/mathjax.js';

import {TeX} from 'mathjax-full/js/input/tex.js';
import {CHTML} from 'mathjax-full/js/output/chtml.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';

const adaptor = chooseAdaptor();
RegisterHTMLHandler(adaptor);

let html = mathjax.document('<html></html>', {
  InputJax: new TeX(),
  OutputJax: new CHTML()
});


mathjax.handleRetriesFor(() => {
    let math = html.convert(process.argv[2] || '', {end: STATE.TYPESET});
    console.log(adaptor.outerHTML(math));

}).catch(err => console.log(err.stack));
