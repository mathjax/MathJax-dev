import {mathjax} from '../mathjax3/js/mathjax.js';

import {TeX} from '../mathjax3/js/input/tex.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
import {STATE} from '../mathjax3/js/core/MathItem.js';

import '../mathjax3/js/input/tex/ams/AmsConfiguration.js';
import '../mathjax3/js/input/tex/tag_format/TagFormatConfiguration.js';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('', {
    InputJax: new TeX({
        tags: 'all',
        packages: ['base', 'ams', 'tagFormat'],
        tagFormat: {
            number: (n) => '#'+n.toString(),
            tag: (tag) => '[' + tag + ']',
            id: (id) => 'eqn-' + id,
            url: (id, base) => base + '@' + id
        }
    })
});

import {SerializedMmlVisitor} from '../mathjax3/js/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new SerializedMmlVisitor();
let toMml = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[2] || '', {end: STATE.COMPILE});
    console.log(toMml(math));

}).catch(err => console.log(err.stack));
