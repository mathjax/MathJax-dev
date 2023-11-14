import {mathjax} from 'mathjax-full/js/mathjax.js';

import {TeX} from 'mathjax-full/js/input/tex.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';
import {AllPackages} from 'mathjax-full/js/input/tex/AllPackages.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';

import {AbstractTags, TagsFactory} from 'mathjax-full/js/input/tex/Tags.js';

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

let html = mathjax.document(
  '',
  {InputJax: new TeX({packages: {'[-]': ['bussproofs']}, tags: 'noID'})});

import {SerializedMmlVisitor} from 'mathjax-full/js/core/MmlTree/SerializedMmlVisitor.js';
let visitor = new SerializedMmlVisitor();
let toMml = (node => visitor.visitTree(node));

mathjax.handleRetriesFor(() => {

    let math = html.convert(process.argv[2] || '', {end: STATE.COMPILE});
    console.log(toMml(math));

}).catch(err => console.log(err.stack));
