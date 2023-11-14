import {mathjax} from 'mathjax-full/js/mathjax.js';

import {AsciiMath} from 'mathjax-full/js/input/asciimath.js';
import {CHTML} from 'mathjax-full/js/output/chtml.js';
import {adaptor, htmlDocument} from './lib/chooseHTML.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';

const OPTIONS = {
  InputJax: new AsciiMath(),
  OutputJax: new CHTML()
};

const HTML = [
  'This is some math: `x = y` and `x < z`.',
  '<div>',
  'text',
  '<!-- comment -->',
  '<p>',
  '`(x+1)/(x-1)`',
  'and',
  '`int x dx`',
  '</p>',
  '` x<br> y `',
  '<span>and more `z-1`</span>',
  '</div>'
].join('\n');

const html = htmlDocument(HTML, OPTIONS);

mathjax.handleRetriesFor(() => {

  html.render();
  console.log(adaptor.outerHTML(adaptor.parent(adaptor.body(html.document))));

}).catch(err => console.log(err.stack));
