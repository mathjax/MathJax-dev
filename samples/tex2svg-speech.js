import {mathjax} from '../mathjax3/js/mathjax.js';
import '../mathjax3/js/util/asyncLoad/node.js';

import {TeX} from '../mathjax3/js/input/tex.js';
import {MathML} from '../mathjax3/js/input/mathml.js';
import {SVG} from '../mathjax3/js/output/svg.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
import {STATE} from '../mathjax3/js/core/MathItem.js';
import {AllPackages} from '../mathjax3/js/input/tex/AllPackages.js';
import {EnrichHandler} from '../mathjax3/js/a11y/semantic-enrich.js';

const adaptor = chooseAdaptor();
EnrichHandler(RegisterHTMLHandler(adaptor), new MathML());

let html = mathjax.document('<html></html>', {
  enrichSpeech: 'deep',
  InputJax: new TeX({packages: ['base']}),
  OutputJax: new SVG(),
  renderActions: {
    removeAttributes:
    [
      40,
      (doc) => {},
      (math, doc) => {
        math.root.walkTree(node => {
          const attributes = node.attributes.getAllAttributes();
          for (const name of Object.keys(attributes)) {
            if (name !== 'data-semantic-speech' && name.match(/^data-semantic-/)) {
              delete attributes[name];
            }
          }
        });
      }
    ]
  }
});


mathjax.handleRetriesFor(() => {

  let math = html.convert(process.argv[2] || '', {end: STATE.ATTACHSPEECH});
  console.log(adaptor.outerHTML(math));

}).catch(err => console.log(err.stack));
