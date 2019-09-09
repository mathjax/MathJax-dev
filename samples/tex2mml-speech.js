import {mathjax} from '../mathjax3/js/mathjax.js';
import '../mathjax3/js/util/asyncLoad/node.js';

import {TeX} from '../mathjax3/js/input/tex.js';
import {MathML} from '../mathjax3/js/input/mathml.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
//import '../mathjax3/js/input/tex/AllPackages.js';
import {EnrichHandler} from '../mathjax3/js/a11y/semantic-enrich.js';

EnrichHandler(RegisterHTMLHandler(chooseAdaptor()), new MathML());

let html = mathjax.document('<html></html>', {
//  enrichSpeech: 'shallow',
  InputJax: new TeX({packages: ['base']})
});

import {SerializedMmlVisitor as MmlVisitor} from '../mathjax3/js/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new MmlVisitor();
let toMml = (node => visitor.visitTree(node, html.document));

mathjax.handleRetriesFor(() => {

    html.TestMath(process.argv[3] || '').compile().enrich();
    let math = html.math.pop().root;
    math.setTeXclass();
    console.log(toMml(math));

}).catch(err => console.log(err.stack));
