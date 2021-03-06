import {liteAdaptor} from '../mathjax3/js/adaptors/liteAdaptor.js';
import {jsdomAdaptor} from '../mathjax3/js/adaptors/jsdomAdaptor.js';

let JSDOM = require('jsdom').JSDOM;

const adaptor = liteAdaptor();
const jsdom = jsdomAdaptor(JSDOM);

const math = process.argv[2] || '';

console.log(adaptor.outerHTML(adaptor.root(adaptor.parse(math))));
console.log(jsdom.outerHTML(jsdom.root(jsdom.parse(math))));
