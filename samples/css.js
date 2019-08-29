import {CHTML} from '../mathjax3/output/chtml.js';
import {liteAdaptor} from '../mathjax3/adaptors/liteAdaptor.js';
import {HTMLDocument} from '../mathjax3/handlers/html/HTMLDocument.js';

const chtml = new CHTML();

const adaptor = liteAdaptor();
const html = new HTMLDocument('', adaptor, {OutputJax: chtml});

console.log(adaptor.textContent(chtml.styleSheet(html)));

