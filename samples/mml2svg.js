import {mathjax} from '../mathjax3/js/mathjax.js';

import {MathML} from '../mathjax3/js/input/mathml.js';
import {SVG} from '../mathjax3/js/output/svg.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
import {STATE} from '../mathjax3/js/core/MathItem.js';

const adaptor = chooseAdaptor();
RegisterHTMLHandler(adaptor);

let html = mathjax.document('<html></html>', {
  InputJax: new MathML(),
  OutputJax: new SVG()
});

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[3] || '<math></math>', {end: STATE.TYPESET});
    console.log(adaptor.outerHTML(math));

}).catch(err => console.log(err.stack));
