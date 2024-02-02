import {mathjax} from 'mathjax-full/js/mathjax.js';

import {MathML} from 'mathjax-full/js/input/mathml.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';

RegisterHTMLHandler(chooseAdaptor());

const MML = new MathML();
MML.mmlFilters.add((math) => {
    const adaptor = MML.adaptor;
    const mml = adaptor.tags(math.data, 'mfenced');
    for (const mfenced of mml) {
        const open  = (adaptor.hasAttribute(mfenced, 'open') ? adaptor.getAttribute(mfenced, 'open') : '(');
        const close = (adaptor.hasAttribute(mfenced, 'close') ? adaptor.getAttribute(mfenced, 'close') : ')');
        const sep   = (adaptor.hasAttribute(mfenced, 'separators') ? adaptor.getAttribute(mfenced, 'separators') : '+').split('');
        const mrow = adaptor.node('mrow');
        if (open) {
            adaptor.append(mrow, adaptor.node('mo', {}, [adaptor.text(open)]));
        }
        let c = '';
        for (const child of adaptor.childNodes(mfenced)) {
            if (c) {
                adaptor.append(mrow, adaptor.node('mo', {}, [adaptor.text(c)]));
            }
            adaptor.append(mrow, child);
            c = sep.shift() || c;
        }
        if (close) {
            adaptor.append(mrow, adaptor.node('mo', {}, [adaptor.text(close)]));
        }
        adaptor.replace(mrow, mfenced);
    }
});

const html = mathjax.document('<html></html>', {InputJax: MML});

mathjax.handleRetriesFor(() => {

  let math = html.convert(process.argv[2] || '<math></math>', {end: STATE.COMPILE});
  console.log(math.toString());

}).catch(err => console.log(err.stack));
