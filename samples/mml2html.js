import {mathjax} from 'mathjax-full/js/mathjax.js';

import {MathML} from 'mathjax-full/js/input/mathml.js';
import {CHTML} from 'mathjax-full/js/output/chtml.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';

const adaptor = chooseAdaptor();
RegisterHTMLHandler(adaptor);

let html = mathjax.document('<html></html>', {
  InputJax: new MathML(),
  OutputJax: new CHTML()
});

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[2] || '<math></math>', {end: STATE.TYPESET});
    console.log(adaptor.outerHTML(math));

}).catch(err => console.log(err.stack));
