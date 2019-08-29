import {mathjax} from '../mathjax3/mathjax.js';

import {TeX} from '../mathjax3/input/tex.js';
import {CHTML} from '../mathjax3/output/chtml.js';
import {RegisterHTMLHandler} from '../mathjax3/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/adaptors/chooseAdaptor.js';
import {STATE} from '../mathjax3/core/MathItem.js';

import {SerializedMmlVisitor} from '../mathjax3/core/MmlTree/SerializedMmlVisitor.js';

const adaptor = chooseAdaptor();
RegisterHTMLHandler(adaptor);

const tex = (process.argv[3] || '');

const html = mathjax.document('', {
  InputJax: new TeX(),
  OutputJax: new CHTML()
});

const visitor = new SerializedMmlVisitor(html.mmlFactory);
const toMML = (node) => visitor.visitTree(node);

mathjax.handleRetriesFor(() => {

    let math = html.convert(tex, {end: STATE.CONVERT});
    console.log(toMML(math));

}).catch(err => console.log(err.stack));
