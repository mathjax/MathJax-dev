import {mathjax} from '../mathjax3/mathjax.js';

import {MathML} from '../mathjax3/input/mathml.js';
import {RegisterHTMLHandler} from '../mathjax3/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/adaptors/chooseAdaptor.js';

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

    html.TestMath(process.argv[3] || '<math></math>').compile();
    let math = html.math.pop();
    console.log(math.root.toString());

}).catch(err => console.log(err.stack));
