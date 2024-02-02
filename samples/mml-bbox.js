import {mathjax} from 'mathjax-full/js/mathjax.js';

import {MathML} from 'mathjax-full/js/input/mathml.js';
import {CHTML} from 'mathjax-full/js/output/chtml.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';

const adaptor = chooseAdaptor();
RegisterHTMLHandler(adaptor);

const html = mathjax.document('<html></html>', {
    InputJax: new MathML(),
    OutputJax: new CHTML()
});

function showBBox(node, jax, document, space) {
    jax.math.root = node;
    if (!node.isInferred) {
        const {h, d, w} = jax.getBBox(jax.math, document);
        console.log(space + node.toString(), [h, d, w], node.attributes.get('mathvariant'));
    }
    if (!node.isToken && !node.isKind('annotation') && !node.isKind('annotation-xml')) {
      for (const child of node.childNodes) {
        showBBox(child, jax, document, space + '  ');
      }
    }
}

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[2] || '<math></math>', {end: STATE.TYPESET});
    let chtml = html.options.OutputJax;
    console.log('');
    showBBox(chtml.math.root, chtml, html, '');
    console.log('');
    console.log(adaptor.outerHTML(math));

}).catch(err => console.log(err.stack));
