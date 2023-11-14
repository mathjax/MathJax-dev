import {CHTML} from 'mathjax-full/js/output/chtml.js';
import {liteAdaptor} from 'mathjax-full/js/adaptors/liteAdaptor.js';
import {HTMLDocument} from 'mathjax-full/js/handlers/html/HTMLDocument.js';

const chtml = new CHTML();

const adaptor = liteAdaptor();
const html = new HTMLDocument('', adaptor, {OutputJax: chtml});

console.log(adaptor.textContent(chtml.styleSheet(html)));

