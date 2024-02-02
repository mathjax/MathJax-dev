import {mathjax} from 'mathjax-full/js/mathjax.js';
import 'mathjax-full/js/util/asyncLoad/node.js';

import {TeX} from 'mathjax-full/js/input/tex.js';
import {MathML} from 'mathjax-full/js/input/mathml.js';
import {SVG} from 'mathjax-full/js/output/svg.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';
import {AllPackages} from 'mathjax-full/js/input/tex/AllPackages.js';
import {EnrichHandler} from 'mathjax-full/js/a11y/semantic-enrich.js';

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
