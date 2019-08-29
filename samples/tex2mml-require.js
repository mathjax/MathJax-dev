import {mathjax} from '../mathjax3/mathjax.js';

import {TeX} from '../mathjax3/input/tex.js';
import {RegisterHTMLHandler} from '../mathjax3/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/adaptors/chooseAdaptor.js';
import {APPEND} from '../mathjax3/util/Options.js';

import '../mathjax3/input/tex/base/BaseConfiguration.js';
import '../mathjax3/input/tex/require/RequireConfiguration.js';
import '../mathjax3/input/tex/config_macros/ConfigMacrosConfiguration.js';
import '../mathjax3/input/tex/autoload/AutoloadConfiguration.js';

global.mathjax.config.loader.require = require;
global.mathjax.config.loader.source = require('../components/src/source.js').source;
global.mathjax.config.loader.paths.mathjax = '../components/dist';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('<html></html>', {
    InputJax: new TeX({
        packages: {[APPEND]: ['require', 'autoload', 'configMacros']},
        macros: {
            x: ['hi(#1)', 1, [,'\\end']]
        }
    })
});

import {SerializedMmlVisitor} from '../mathjax3/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new SerializedMmlVisitor();
let toMml = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

    html.TestMath(process.argv[3] || '').compile();
    let math = html.math.pop().root;
    math.setTeXclass();
    console.log(toMml(math));

}).catch(err => console.log(err.stack));
