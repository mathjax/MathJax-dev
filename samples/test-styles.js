import {Styles} from '../mathjax3/js/util/Styles.js';

let JSDOM = require('jsdom').JSDOM;

const document = new JSDOM().window.document;
const span = document.createElement('span');

const cssText = process.argv[2] || '';

let styles = new Styles(cssText);
console.log(styles);
console.log('>> ' + styles.cssText);

span.style.cssText = cssText;
console.log('<< ' +span.style.cssText);
