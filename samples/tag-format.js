import {mathjax} from '../mathjax3/mathjax.js';

import {TeX} from '../mathjax3/input/tex.js';
import {RegisterHTMLHandler} from '../mathjax3/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/adaptors/chooseAdaptor.js';

import '../mathjax3/input/tex/ams/AmsConfiguration.js';
import '../mathjax3/input/tex/tag_format/TagFormatConfiguration.js';

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

import {SerializedMmlVisitor} from '../mathjax3/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new SerializedMmlVisitor();
let toMml = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

    html.TestMath(process.argv[3] || '').compile();
    let math = html.math.pop().root;
    console.log(toMml(math));

}).catch(err => console.log(err.stack));
