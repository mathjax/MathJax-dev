import {MathML} from "mathjax-full/js/input/mathml.js";
import {CHTML} from "mathjax-full/js/output/chtml.js";
import {SVG} from "mathjax-full/js/output/svg.js";
import {HTMLMathItem} from "mathjax-full/js/handlers/html/HTMLMathItem.js";
import {HTMLDocument} from "mathjax-full/js/handlers/html/HTMLDocument.js";
import {handleRetriesFor} from "mathjax-full/js/util/Retries.js";
import {browserAdaptor} from "mathjax-full/js/adaptors/browserAdaptor.js";

let mml = new MathML({forceReparse: true});
let chtml = new CHTML({fontURL: '../../node_modules/mathjax-modern-font/chtml/woff'});
let svg = new SVG({});

let docs = {
  CHTML: new HTMLDocument(document, browserAdaptor(), {InputJax: mml, OutputJax: chtml}),
  SVG:   new HTMLDocument(document, browserAdaptor(), {InputJax: mml, OutputJax: svg})
};

const samples = [
  '<mjx-samples>',
  '<mjx-description>',
  '',
  '</mjx-description>',
  '<mjx-tables>',
  '<mjx-chtml-table>',
  '',
  '</mjx-chtml-table>',
  '<mjx-svg-table>',
  '',
  '</mjx-svg-table>',
  '</mjx-tables>',
  '</mjx-samples>'
];

const div = document.createElement('div');
const template = document.getElementsByTagName('mjx-template')[0];

function CreateMathML() {
    const mathml = template.innerHTML;
    template.innerHTML = mathml.replace(/\&/g, '&amp;')
                               .replace(/</g, '&lt;')
                               .replace(/>/g, '&gt;')
                               .replace(/\n/g, '<br/>')
                               .replace(/\s/g, '\u00A0');
    Substitute(mathml, window.variables, '');
}

function Substitute(mml, data, descr) {
  if (data.length === 0) {
    addMathML(mml, descr);
    return;
  }
  const n = data.length - 1;
  const [name, values] = data[n];
  const rest = data.slice(0, n);
  const re = new RegExp('\\{'+name+'\\}', 'g');
  for (const value of values) {
    Substitute(mml.replace(re, value), rest, name + ': <b>' + value + '</b><br/>' + descr);
  }
}

function addMathML(mml, descr) {
  samples[2] = descr;
  samples[6] = samples[9] = mml;
  div.innerHTML = samples.join('\n');
  template.parentNode.insertBefore(div.firstChild, template);
}

CreateMathML();

function linkTables(n, m, arrow) {
    let N = String(n);
    if (N.length == 1) {
        N = '0' + N;
    }
    return '<a href="tables-' + N + '.html"' + (n === m ? ' disabled="true"' : '') + '>&#x' + arrow + ';</a>';
}

const testNo = parseInt(window.location.pathname.match(/-(\d+)\.html$/)[1]);
const maxTest = 60;

const nav = document.body.appendChild(document.createElement('div'));
nav.id = "navigation";
nav.innerHTML = [
    linkTables(testNo - 1, 0, '25C4'),
    linkTables(testNo + 1, maxTest + 1, '25BA')
].join(' ');


chtml.options.elements = ['mjx-chtml-table'];
svg.options.elements = ['mjx-svg-table'];

docs.CHTML.render();
docs.SVG.render();

