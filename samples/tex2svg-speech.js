import {mathjax} from '../mathjax3/js/mathjax.js';
import '../mathjax3/js/util/asyncLoad/node.js';

import {TeX} from '../mathjax3/js/input/tex.js';
import {MathML} from '../mathjax3/js/input/mathml.js';
//import {SVG} from '../mathjax3/js/output/svg.js';
import {CHTML} from '../mathjax3/js/output/chtml.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
//import '../mathjax3/js/input/tex/AllPackages.js';
import {EnrichHandler} from '../mathjax3/js/a11y/semantic-enrich.js';

const adaptor = chooseAdaptor();
EnrichHandler(RegisterHTMLHandler(adaptor), new MathML());

let html = mathjax.document('<html></html>', {
  enrichSpeech: 'shallow',
  InputJax: new TeX({packages: ['base']}),
  OutputJax: new CHTML() //new SVG()
});

import {SerializedMmlVisitor as MmlVisitor} from '../mathjax3/js/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new MmlVisitor();
let toMml = (node => visitor.visitTree(node, html.document));

mathjax.handleRetriesFor(() => {

    html.TestMath(process.argv[3] || '').compile().enrich();
    let math = html.math.pop();
    math.root.walkTree(node => {
        const attributes = node.attributes.getAllAttributes();
        for (const name of Object.keys(attributes)) {
            if (name !== 'data-semantic-speech' && name.match(/^data-semantic-/)) {
                delete attributes[name];
            }
        }
    });
    math.typeset(html);
    console.log(adaptor.outerHTML(math.typesetRoot));

}).catch(err => console.log(err.stack));
