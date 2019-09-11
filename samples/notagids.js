import {mathjax} from '../mathjax3/js/mathjax.js';

import {TeX} from '../mathjax3/js/input/tex.js';
import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';
import {AllPackages} from '../mathjax3/js/input/tex/AllPackages.js';
import {STATE} from '../mathjax3/js/core/MathItem.js';

import {AbstractTags, TagsFactory} from '../mathjax3/js/input/tex/Tags.js';

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

import {SerializedMmlVisitor} from '../mathjax3/js/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new SerializedMmlVisitor();
let toMml = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[3] || '', {end: STATE.COMPILE});
    console.log(toMml(math));

}).catch(err => console.log(err.stack));
