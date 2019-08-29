import {mathjax} from '../mathjax3/mathjax.js';

import {TeX} from '../mathjax3/input/tex.js';
import {RegisterHTMLHandler} from '../mathjax3/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/adaptors/chooseAdaptor.js';
import {AllPackages} from '../mathjax3/input/tex/AllPackages.js';

import {AbstractTags, TagsFactory} from '../mathjax3/input/tex/Tags.js';

class NoIdTags extends AbstractTags {
    formatId(id) {
        return 'abc-' + id;
    }

    makeTag() {
        const tag = super.makeTag();
        const attributes = tag.attributes.getAllAttributes();
        delete attributes.id;
        return tag;
    }
}

TagsFactory.add('noID', NoIdTags);


RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('', {InputJax: new TeX({packages: AllPackages, tags: 'noID'})});

import {SerializedMmlVisitor} from '../mathjax3/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new SerializedMmlVisitor();
let toMml = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

    html.TestMath(process.argv[3] || '').compile();
    let math = html.math.pop().root;
    console.log(toMml(math));

}).catch(err => console.log(err.stack));
