import {mathjax} from 'mathjax-full/js/mathjax.js';

import {adaptor, htmlDocument} from './lib/chooseHTML.js';

const HTML = process.argv[3] || `
  <p id="test">abx</p>
  <p class="fred">fred</p>
  <p>def</p>
  <div class="fred">div</div>
`;

const html = htmlDocument(HTML);

//console.log(adaptor.elementsByClass(adaptor.body(html.document), 'fred'));
console.log(adaptor.getElements(['.fred'], html.document));
