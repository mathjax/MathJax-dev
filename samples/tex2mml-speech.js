import {mathjax} from '../mathjax3/js/mathjax.js';
import '../mathjax3/js/util/asyncLoad/node.js';

import {TeX} from '../mathjax3/js/input/tex.js';
import {MathML} from '../mathjax3/js/input/mathml.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
import {EnrichHandler} from '../mathjax3/js/a11y/semantic-enrich.js';
import {STATE} from '../mathjax3/js/core/MathItem.js';
import {AllPackages} from '../mathjax3/js/input/tex/AllPackages.js';
import {CHTML} from '../mathjax3/js/output/chtml.js';

EnrichHandler(RegisterHTMLHandler(chooseAdaptor()), new MathML());

let html = mathjax.document('<html></html>', {
  sre: {
    speech: 'deep',
    domain: 'clearspeak',
    style: 'default',
    locale: 'en'
  },
  InputJax: new TeX({packages: AllPackages}),
  OutputJax: new CHTML()   // Needed for bussproofs
});

import {SerializedMmlVisitor as MmlVisitor} from '../mathjax3/js/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new MmlVisitor();
let toMml = (node => visitor.visitTree(node, html.document));

mathjax.handleRetriesFor(() => {

  let math = html.convert(process.argv[2] || '', {end: STATE.ENRICHED});
  console.log(toMml(math));

}).catch(err => console.log(err.stack));
