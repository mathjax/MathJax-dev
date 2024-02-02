import {mathjax} from 'mathjax-full/js/mathjax.js';

import {TeX} from 'mathjax-full/js/input/tex.js';
import {CHTML} from 'mathjax-full/js/output/chtml.js';
import {adaptor, htmlDocument} from './lib/chooseHTML.js';

const OPTIONS = {
  InputJax: new TeX(),
  OutputJax: new CHTML()
};

const HTML = process.argv[2] || `
  This is \\$ some math: \\(\\sin(x+1)\\) and \\(\\bf x \\scr X \\mathbb X \\sf X \\cal X \\frak X\\).
  \\[x+1\\over x-1\\]
`;

const html = htmlDocument(HTML, OPTIONS);

mathjax.handleRetriesFor(() => {

  html.render();
  console.log(adaptor.outerHTML(adaptor.parent(adaptor.body(html.document))));

}).catch(err => console.log(err.stack));
