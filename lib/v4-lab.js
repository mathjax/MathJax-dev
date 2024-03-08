/*************************************************************
 *
 *  Copyright (c) 2019 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * @fileoverview  The code that handles the v3-lab browser document
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import 'mathjax-full/js/util/asyncLoad/esm.js';

import {TeX} from 'mathjax-full/js/input/tex.js';
import {ConfigurationHandler} from 'mathjax-full/js/input/tex/Configuration.js';
import {STATE} from 'mathjax-full/js/core/MathItem.js';
import {browserAdaptor} from 'mathjax-full/js/adaptors/browserAdaptor.js';

import {source} from 'mathjax-full/components/src/source.js';


/*****************************************************************/

/**
 * A mixin to add complexity() to a document so that the checkboxes
 *   can control their functions.
 *
 * @param {Constructor<MathDocument>}    The document class to be extended
 * @returns {Constructor<MathDocument>}  The augmented class
 */
function V3DocumentMixin(documentClass) {

  return class extends documentClass {

    /**
     * Call the superclass' complexity() method depending on the checkbox settings.
     *
     * @override
     */
    complexity() {
      if (Lab.menu.collapse || Lab.menu.compute) {
        this.complexityVisitor.options.makeCollapsible = Lab.menu.collapse;
        super.complexity(true);
      }
      return this;
    }

    /**
     * Rerender the math on the page using the Lab's Typeset() function
     *
     * @override
     */
    rerender() {
      Lab.Typeset();
      return this;
    }

  };
}

/*****************************************************************/

/**
 * The configuration object for loader/startup
 */
window.MathJax = {
  loader: {
    load: [
      'input/tex-full',
      'input/mml',
      '[mml]/mml3',
      'output/chtml',
      'ui/menu'
    ],
    source: source,
    failed: (err) => console.log(err),
    require: (url) => import(url)
  },
  output: {
    fontPath: '../node_modules/%%FONT%%-font'
  },
  options: {
    compileError(doc, math, err) {console.log(err); return doc.compileError(math, err)},
    typesetError(doc, math, err) {console.log(err); return doc.typesetError(math, err)}
  },
  startup: {
    input: ['tex', 'mml'],
    output: 'chtml',
    ready: () => Lab.Startup(),
    invalidOption: 'fatal'
  },
  tex: {
    packages: ['base', 'autoload']
  },
  mml: {
    forceReparse: true
  },
  svg: {},
  chtml: {
    fontURL: './node_modules/mathjax-modern-font/chtml/woff'
  }
};

/*****************************************************************/

/**
 * The object that manages the lab
 */
const Lab = window.Lab = {
  input: document.getElementById('input'),      // the input textarea
  output1: document.getElementById('output1'),  // where MathJax output will be displayed
  output2: document.getElementById('output2'),  // where second copy of MathJax output will be displayed
  mathml: document.getElementById('mathml'),    // where MathML output will be displayed
  adaptor: new browserAdaptor(),                // for creating new nodes more easily

  doc: null,                                    // the current MathDocument
  mathItem: null,                               // a MathItem for the current display
  jax: {},                                      // an array of input jax objects
  prevTex: '',                                  // the saved input so we can switch back from MathML, if unchanged
  ready: false,                                 // true when everything is loaded and ready to go

  render: {
    display: true,                              // true when TeX input is in display mode
    format: 'TeX',                              // the input format
    jax: 'CHTML',                               // the output format
    MML: false,                                 // true when MathML output is to be shown
    secondOutput: false                         // true when second output is to be shown
  },
  mmlincludes: {                                // MathML menu settings
    showSRE: false,
    showTex: false,
    texHints: true,
  },
  texinput: {                                   // tex input settings
    tags: 'none',
    tagSide: 'right',
    tagIndent: '0.8em',
    mathStyle: 'TeX',
    allowTexHTML: true
  },
  mmlinput: {                                   // MathML input settings
    allowHtmlInTokenNodes: false,
    fixMisplacedChildren: true
  },
  verify: {                                     // MathML verification options
    checkArity: true,
    checkAttributes: false,
    checkMathvariants: true,
    fullErrors: false,
    fixMmultiscripts: true,
    fixMtables: true
  },
  output: {                                     // output jax settings
    breakInline: false,
    mathmlSpacing: false,
    mtextInheritFont: false,
    merrorInheritFont: false,
    mtextFont: '',
    merrorFont: 'serif',
    displayAlign: 'center',
    displayIndent: '0',
    displayOverflow: 'overflow',
    htmlHDW: 'auto',
    font: 'modern',
    fontCache: 'local',
    adaptiveCSS: true,
    matchFontHeight: true
  },
  menu: {
    speech: false,                              // true when speech should be generated
    braille: false,                             // true when Braille should be generated
    collapse: false,                            // true when mactions should be inserted for complex math
    compute: false,                             // true when complexity should be computed
    enrich: false                               // true when semantic enrichment is to be performed
  },
  packages: {
    mml: {},                                    // the list of element ids for the MML package checkboxes
    tex: {},                                    // the list of element ids for the TeX package checkboxes
    text: {}                                    // the list of element ids for the TextMacros package checkboxes
  },
  details: {                                    // which details are open
    render: true,
    mmlincludes: false,
    menu: true,
    texinput: false,
    mmlinput: false,
    verify: false,
    output: false,
    mml: false,
    tex: true,
    text: false
  },

  keepOptions: [
    ['render', {
      format: ['TeX', 'MathML'],
      jax: ['CHTML', 'SVG']
    }],
    ['mmlincludes', {}, 'setMmlFlag', {
      showSRE: 'SRE attributes',
      showTex: 'LaTeX attributes',
      texHints: 'TeX hints'
    }],
    'menu',
    ['texinput', {
      tags: ['none', 'ams', 'all'],
      tagSide: ['left', 'right'],
      tagIndent: ['0em', '0.8em', '1em', '2em', '-1em'],
      mathStyle: ['TeX', 'ISO', 'French', 'upright'],
    }, 'setTexInput'],
    ['mmlinput', {}, 'setMmlInput'],
    ['verify', {}, 'setVerify'],
    ['output', {
      mtextFont: ['', 'serif', 'Arial', 'Times', 'Courier'],
      merrorFont: ['', 'serif', 'Arial', 'Times', 'Courier'],
      displayAlign: ['left', 'center', 'right'],
      displayIndent: ['-5em', '-2em', '-1em', '0', '1em', '2em', '5em'],
      displayOverflow: ['overflow', 'scroll', 'linebreak', 'scale', 'truncate'],
      htmlHDW: ['auto', 'ignore', 'use', 'force'],
      font: ['asana', 'bonum', 'dejavu', 'fira', 'modern', 'pagella', 'schola', 'stix2', 'termes', 'tex'],
      fontCache: ['none', 'local', 'global']
    }, 'setOutput', {breakInline: 'Inline breaks'}],
    'packages',
    'details'
  ],

  /*************************************************************/


  /**
   * Add <math> tag if it is missing from MathML input
   */
  readInput() {
    let input = this.input.value;
    if (this.render.format !== 'MathML') {
      return input;
    }
    input = input.trim();
    if (!input.match(/^<math/)) {
      input = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + input;
    }
    if (!input.match(/\/math>$/)) {
      input += '</math>';
    }
    return input;
  },

  /**
   * Create a MathItem to typeset
   *
   * @param {string} input         The math input string to typeset
   * @param {HTMLElement} output   The DOM element in which to display the output
   */
  MathItem(input, output) {
    output.innerHTML = '';
    const text = output.appendChild(document.createTextNode(''));
    const math = new this.doc.options.MathItem(input, this.jax[this.render.format], this.render.display);
    this.mathItem = math;
    math.setMetrics(...this.metrics);
    math.start = {node: text, n: 0, delim: ''};
    math.end = {node: text, n: 0, delim: ''};
    return math;
  },

  /**
   * Perform the typesetting of the math in the proper format
   */
  Typeset() {
    this.doc = MathJax.startup.document;
    if (!this.ready || this.doc.menu.loading) return;

    //
    // Clear the old math and make a blank text node to use as the start/end node for the MathItem below
    //
    this.prevTex = '';

    //
    // Create a new MathItem from the input using the proper input jax and display mode,
    //   set its metrics, and link it to the text element created above, then
    //   add it to the document's math list.
    //
    const input = this.readInput();
    this.mathItem = this.MathItem(input, this.output1);
    this.doc.clear();
    this.doc.math.push(this.mathItem);

    //
    // Produce a second copy, if requested
    //
    if (this.render.secondOutput) {
      let math2 = this.MathItem(input, this.output2);
      this.doc.math.push(math2);
    } else {
      this.output2.innerHTML = '';
    }

    //
    // Reset the TeX numbering/labels, and clear the menu store
    //
    Object.values(this.jax).map(jax => jax.reset());
    this.doc.menu.clear();

    //
    // Typeset the math, and output the MathML
    //
    return MathJax.typesetPromise().then(() => {
      this.doc = MathJax.startup.document;
      this.outputMML(Array.from(this.doc.math)[0]);
    }).catch(err => {
      console.log('Error: ' + (err.message || err));
      if (err.stack) console.log(err.stack);
    });
  },

  /**
   * Serialize the internal MathML, shortening data-semantic-* attributes for easier viewing,
   *  and output the results.
   */
  outputMML(math) {
    this.mathml.innerHTML = '';
    if (this.render.MML && math.root) {
      const mml = this.doc.menu.toMML(math);
      const text = mml.replace(/data-semantic/g, 'DS');
      this.mathml.appendChild(document.createTextNode(text));
    }
  },

  /*************************************************************/

  /**
   * Record the current state in the URL and reload the page
   */
  Keep() {
    window.location.search = [
      '?',
      this.writeOptions(this.keepOptions),
      '/',
      encodeURIComponent(this.input.value)
    ].join('');
  },

  /**
   * Read the data stored in the URL and set the internal state and input elements
   *   to correspond to those values.
   */
  Load() {
    const data = decodeURIComponent(window.location.search.substr(1));
    this.input.value = this.readOptions(this.keepOptions, data);
  },

  /**
   * Produce the string of data for saving the settings
   *
   * @param {(string|[string,object])[]} data   The description of the data to save
   * @return {string}                           The data string for the encoded options
   */
  writeOptions(data) {
    const groups = [];
    for (const item of data) {
      const params = [];
      const [name, values] = (Array.isArray(item) ? item : [item, {}]);
      for (const [key, option] of Object.entries(this[name])) {
        switch(typeof option) {
        case 'boolean':
          params.push(option ? 'T' : 'F');
          break;
        case 'string':
          params.push((values[key] || []).indexOf(option));
          break;
        case 'object':
          for (const input of Object.values(option)) {
            params.push(input.checked ? '1' : '0');
          }
          params.push('/');
          break;
        }
      }
      groups.push(params.join(''));
    }
    return groups.join('/');
  },

  /**
   * Read a data string and set the options based on that
   *
   * @param {(string|[string,object])[]} data   The description of the data to save
   * @param {string} params                     The data string containing the encoded options
   */
  readOptions(data, params) {
    let i = 0;
    for (const item of data) {
      const [name, values] = (Array.isArray(item) ? item : [item, {}]);
      const options = this[name];
      for (const key of Object.keys(options)) {
        let c = params.charAt(i++);
        if (c === '/') {
          i--;
          break;
        }
        switch(typeof options[key]) {
        case 'boolean':
          options[key] = (c === 'T');
          break;
        case 'string':
          options[key] = (values[key][parseInt(c)] || '');
          break;
        case 'object':
          for (const input of Object.values(options[key])) {
            input.checked = (c === '1');
            c = params.charAt(i++);
            if (c === '/') i--;
          }
          while (params.charAt(i++) !== '/' && i < params.length) {}
          break;
        }
      }
      while (params.charAt(i++) !== '/' && i < params.length) {}
    }
    return params.slice(i);
  },

  /*************************************************************/

  /**
   * @param {string} type  The package type (mml, tex, text)
   * @returns {string[]}   An array of the packages that are checked
   */
  getPackages(type) {
    const packages = this.packages[type];
    let result = [];
    for (let key of Object.keys(packages)) {
      if (packages[key].checked) {
        result.push(key);
      }
    }
    return result;
  },

  /**
   * Create the checkbox elements for all the packages that are available
   *
   * @param {string} type  The package type (mml, tex, text)
   */
  createPackageCheckboxes(type) {
    let div = document.getElementById(`${type}-package`);
    if (type === 'mml') {
      this.createCheckbox(type, 'mml3', false, div);
      return;
    }
    for (let key of Array.from(ConfigurationHandler.keys()).sort()) {
      if (type === 'tex' && ConfigurationHandler.get(key).parser !== 'tex') continue;
      const config = (type === 'tex' ? MathJax.config.tex :
                      MathJax.config.tex.textmacros || {packages: ['text-base']});
      this.createCheckbox(type, key, config.packages.indexOf(key) >= 0, div);
    }
  },

  /**
   * Create a package checkbox
   *
   * @param {string} type         The package type (mml, tex, text)
   * @param {string} key          The package name
   * @param {boolean} checked     Whether it should be checked or not
   * @param {HTMLElement} div     The <div> where the checkbox should go
   * @return {HTMLInputElement}   The newly created checkbox
   */
  createCheckbox(type, key, checked, div) {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = key;
    checkbox.value = key;
    checkbox.id = type + '-' + key;
    checkbox.onchange = () => this.newPackages();
    checkbox.checked = checked;
    let label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.appendChild(document.createTextNode(key));
    checkbox.appendChild(label);
    let span = div.appendChild(document.createElement('span'));
    span = span.appendChild(document.createElement('span'));  
    span.appendChild(checkbox);
    span.appendChild(label);
    this.packages[type][key] = checkbox;
  },

  /**
   * Create a new TeX input jax for the given set of packages,
   *   and set its adaptor and mmlFactory, then use that jax
   *   for the input jax of the current document, and retypeset
   *   using the new set of packages.
   */
  newPackages() {
    if (this.render.format === 'TeX') {
      const tex = MathJax.config.tex;
      tex.tags = this.texinput.tags;
      if (tex.tags === 'ams' && !this.packages.tex.ams.checked) {
        tex.tags = this.texinput.tags = document.getElementById('tags').value = 'none';
      }
      tex.packages = this.getPackages('tex');
      if (this.packages.tex.textmacros.checked) {
        tex.textmacros = {packages: this.getPackages('text')};
        this.disablePackages('text', false);
      } else {
        delete tex.textmacros;
        this.disablePackages('text', true);
      }
      if (this.packages.tex.texhtml.checked) {
        tex.allowTexHTML = this.texinput.allowTexHTML;
        document.getElementById('allowTexHTML').disabled = false;
      } else {
        document.getElementById('allowTexHTML').disabled = true;
        delete tex.allowTexHTML;
      }
      this.newTexInput();
    }
    return this.Typeset();
  },

  /**
   * Get a new TeX input jax
   */
  newTexInput() {
    const jax = this.jax.TeX = new TeX(MathJax.config.tex);
    jax.setAdaptor(this.doc.adaptor);
    jax.setMmlFactory(this.doc.mmlFactory);
    this.doc.inputJax[0] = jax;
  },

  /**
   * Get a new output jax
   */
  newOutput() {
    const jax = (this.render.jax === 'CHTML' ?
                 new MathJax._.output.chtml_ts.CHTML(MathJax.config.chtml) :
                 new MathJax._.output.svg_ts.SVG(MathJax.config.svg));
    jax.setAdaptor(this.doc.adaptor);
    this.doc.menu.jax[this.render.jax] = jax;
    this.doc.outputJax = jax;
  },

  /**
   * Disable/enable all the package checkboxes
   *
   * @param {string} type  The package type (mml, tex, text)
   * @param {boolean} disabled    True to disable, false to enable
   */
  disablePackages(type, disabled) {
    for (const input of Object.values(this.packages[type])) {
      input.disabled = disabled;
    }
  },
  
  /*************************************************************/

  /**
   * Sets the input format to the given type
   *
   * @param {value: string}    The input format (Display TeX, Inline TeX, or MathML)
   */
  setFormat(value) {
    const format = value.split(/ /);
    const changed = (this.render.format !== format[0]);
    if (changed) {
      //
      //  Attach the proper input jax to the current document
      //
      this.render.format = format[0];
      const jax = this.jax[this.render.format];
      this.doc.inputJax = [jax];
      jax.setAdaptor(this.doc.adaptor);
      jax.setMmlFactory(this.doc.mmlFactory);
    }
    let tex = '';
    if (format[0] === 'TeX') {
      //
      // Switch to TeX input by setting the display flag,
      //   enabling the package checkboxes and setting the
      //   input textarea to the original TeX (or blank)
      //
      this.render.display = format[1] === 'D';
      this.disablePackages('mml', true);
      this.disablePackages('tex', false);
      this.disablePackages('text', MathJax.config.tex.packages.indexOf('textmacros') < 0);
      if (changed) {
        this.input.value = this.prevTex;
      }
    } else {
      //
      // Switch to MathML input by disabling the package checkboxes,
      //   saving the current TeX code for later, and using the
      //   serlialized internal MathML as the new input
      //
      this.disablePackages('mml', false);
      this.disablePackages('tex', true);
      this.disablePackages('text', true);
      tex = this.input.value;
      const mml = this.doc.menu.toMML(this.mathItem);
      this.input.value = mml;
    }
    this.Typeset();
    this.prevTex = tex;
  },

  /**
   * Set the output renderer to the given one
   *
   * @param {string} value   The renderer to select (CHTML or SVG)
   */
  setRenderer(value) {
    this.render.jax = value;
    document.getElementById('fontCache').disabled = (value === 'CHTML');
    document.getElementById('adaptiveCSS').disabled = (value === 'SVG');
    document.getElementById('matchFontHeight').disabled = (value === 'SVG');
    this.setVariable('renderer', value);
    const promises = this.doc.menu.constructor.loadingPromises;
    const promise = promises.get('output/' + value.toLowerCase()) || Promise.resolve();
    promise.then(() => {
      this.newOutput();
      this.Typeset();
    });
  },

  /**
   * Set a TeX input option and retypeset
   *
   * @param {HTMLElement} node   The input element being updated
   */
  setTexInput(node) {
    const key = node.id;
    const value = this.nodeValue(node);
    this.texinput[key] = value;
    MathJax.config.tex[key] = value;
    this.jax.TeX.parseOptions.options[key] = value;
    if (key === 'mathStyle') {
      this.jax.TeX.parseOptions.mathStyle = this.jax.TeX.parseOptions.constructor.getVariant.get(value);
    }
    if (key === 'tags') {
      if (value === 'ams' && !this.packages.tex.ams.checked) {
        this.packages.tex.ams.checked = true;
      }
      this.newPackages();
    }
    this.Typeset();
  },

  /**
   * Set a MathML input option and retypeset
   *
   * @param {HTMLElement} node   The input element being updated
   */
  setMmlInput(node) {
    const key = node.id;
    const value = this.nodeValue(node);
    this.mmlinput[key] = value;
    MathJax.config.mml[key] = value;
    this.jax.MathML.mathml.options[key] = value;
    this.Typeset();
  },

  /**
   * Set a MathML verification option and retypeset
   *
   * @param {HTMLElement} node   The input element being updated
   */
  setVerify(node) {
    const key = node.id;
    const value = this.nodeValue(node);
    this.verify[key] = value;
    if (!MathJax.config.mml.verify) {
      MathJax.config.mml.verify = {};
    }
    MathJax.config.mml.verify[key] = value;
    this.jax.MathML.mathml.options.verify[key] = (value === 'on' || value === true);
    this.Typeset();
  },

  /**
   * Set an output option
   *
   * @param {HTMLElement} node   The input element being updated
   */
  setOutput(node) {
    const key = node.id;
    const value = this.nodeValue(node);
    this.output[key] = value;
    if (key === 'font') {
      this.setFont('mathjax-' + value);
      return;
    }
    if (key === 'fontCache') {
      MathJax.config.svg[key] = value;
    } else if (key === 'adaptiveCSS' || key === 'matchFontHeight') {
      MathJax.config.chtml[key] = value;
    } else {
      MathJax.config.chtml[key] = MathJax.config.svg[key] = value;
    }
    if (key === 'breakInline') {
      this.setVariable('breakInline', value);
    } else {
      this.doc.outputJax.options[key] = value;
    }
    if (key === 'matchFontHeight') {
      this.initMetrics();
    }
    if (key === 'font' ||
        (key === 'fontCache' && this.render.jax === 'SVG') ||
        (key === 'adaptiveCSS' && this.render.jax === 'CHTML')) {
      this.newOutput();
    }
    this.Typeset();
  },

  /**
   * Configure and load a font
   */
  setFont(font) {
    MathJax.config.chtml.font = MathJax.config.svg.font = MathJax.config.output.font = font;
    MathJax.config.loader.paths[font] = `../node_modules/${font}-font`;
    if (MathJax._.output.chtml) {
      MathJax.loader.load(`[${font}]/chtml`).then(() => {
        MathJax.config.chtml.fontURL = `./node_modules/${font}-font/chtml/woff`;
        MathJax.config.chtml.dynamicPrefix = `[${font}]/chtml/dynamic`;
        MathJax.config.chtml.fontData = Object.values(MathJax._.output.fonts[font].chtml_ts)[0];
        if (this.render.jax === 'CHTML') {
          this.newOutput();
          this.Typeset();
        }
      });
    }
    if (MathJax._.output.svg) {
      MathJax.loader.load(`[${font}]/svg`).then(() => {
        MathJax.config.svg.dynamicPrefix = `[${font}]/svg/dynamic`;
        MathJax.config.svg.fontData = Object.values(MathJax._.output.fonts[font].svg_ts)[0];
        if (this.render.jax === 'SVG') {
          this.newOutput();
          this.Typeset();
        }
      });
    }
  },

  /**
   * Set the details flag
   *
   * @param {HTMLDetailsElement} node   The details tag being opened or closed
   */
  setDetails(node) {
    const type = node.id.replace(/-.*/, '');
    this.details[type] = node.open;
  },

  /**
   * Sets whether or not to show the internal MathML
   *
   * @param {boolean} checked   Whether to show the MathML or not (true = show)
   */
  setMathML(checked) {
    this.render.MML = checked;
    this.Typeset();
  },

  /**
   * Sets whether or not to show the second copy of the MathJax output.  This
   * is useful for testing with tools that keep an internal state, like menu,
   * explorer etc. to verify that there are no interferences with multiple
   * math items in the page.
   *
   * @param {boolean} checked   Whether or not to show the second outputMathML.
   */
  setSecondOutput(checked) {
    this.render.secondOutput = checked;
    this.output2.style.display = (checked ? '' : 'none');
    this.Typeset();
  },

  /**
   * Sets whether or not to enrich the MathML
   *
   * @param {boolean} checked   Whether to enrich or not (true = enrich)
   */
  setEnrich(checked) {
    this.menu.enrich = checked;
    if (!checked) {
      this.setVariable('speech', false, true);
      this.setVariable('braille', false, true);
      this.setVariable('collapsible', false, true);
    }
    this.setVariable('enrich', checked);
  },

  /**
   * @param {boolean} checked   Whether to generate speech
   */
  setSpeech(checked) {
    this.menu.speech = checked;
    if (checked) {
      this.setEnrich(true);
    }
    this.setVariable('speech', checked);
  },

  /**
   * @param {boolean} checked   Whether to generate braille
   */
  setBraille(checked) {
    this.menu.braille = checked;
    if (checked) {
      this.setEnrich(true);
    }
    this.setVariable('braille', checked);
  },

  /**
   * Sets whether or not to compute complexity values in the enriched MathML
   *
   * @param {boolean} checked   Whether to compute complexity or not (true = compute)
   */
  setCompute(checked) {
    this.menu.compute = checked;
    if (checked) {
      this.setEnrich(true);
    } else {
      this.setCollapse(false);
    }
  },

  /**
   * Sets whether or not to add maction elements for complex math
   *
   * @param {boolean} checked   Whether to add mactions or not (true = add)
   */
  setCollapse(checked) {
    this.menu.collapse = checked;
    this.setVariable('collapsible', checked);
  },

  /**
   * Sets the value for one of the MAthML inclusion options
   *
   * @param{HTMLElement} input   The form element that is changing
   */
  setMmlFlag(input) {
    this.mmlincludes[input.id] = input.checked;
    this.setVariable(input.id, input.checked);
    this.Typeset();
  },

  /**
   * Loads an a11y module (complexity or explorer) if it hasn't already been loaded
   *
   * @param{string} component   The name of the component to load
   */
  loadA11y(component) {
    if (!MathJax._.a11y || !MathJax._.a11y[component]) {
      this.doc.menu.loadA11y(component);
    }
  },

  /**
   * Get a node's value
   *
   * @param{HTMLElement} node         The node whose value is needed
   */
  nodeValue(node) {
    return (node.checked !== undefined ? node.checked : node.value);
  },

  /*************************************************************/

  /**
   * Ask the output renderer to determine the measure the (font and container) metrics
   *   for the output area and save them to be used for the MathItems during typesetting.
   */
  initMetrics() {
    let {em, ex, containerWidth, scale} = MathJax.getMetricsFor(this.output1);
    this.metrics = [em, ex, containerWidth, scale];
  },

  /**
   * Add callbacks to the menu items that need to be synchronized with checkboxes
   *   and set their values to correspond to the current state
   */
  initMenu() {
    this.setVariable('renderer', this.render.jax, true);
    this.setVariable('enrich', this.menu.enrich, true);
    this.setVariable('speech', this.menu.speech, true);
    this.setVariable('braille', this.menu.braille, true);
    this.setVariable('collapsible', this.menu.collapse, true);
    this.setVariable('showSRE', this.mmlincludes.showSRE, true);
    this.setVariable('showTex', this.mmlincludes.showTex, true);
    this.setVariable('texHints', this.mmlincludes.texHints, true);
    this.setVariable('overflow', this.capitalize(this.output.displayOverflow), true);
    this.setVariable('breakInline', this.output.breakInline, true);

    this.menuVariable('enrich').registerCallback(() => {
      const checked = this.doc.menu.settings.enrich;
      this.menu.enrich = checked;
      document.getElementById('enrich').checked = checked;
      if (!checked) {
        for (const key of ['speech', 'braille', 'collapse', 'compute']) {
          this.menu[key] = false,
          document.getElementById(key).checked = false;
        }
      }
    });

    this.menuVariable('speech').registerCallback(() => {
      const checked = this.doc.menu.settings.speech;
      this.menu.speech = checked;
      document.getElementById('speech').checked = checked;
      if (checked) {
        this.menu.enrich = checked;
        document.getElementById('enrich').checked = checked;
      }
    });

    this.menuVariable('braille').registerCallback(() => {
      const checked = this.doc.menu.settings.braille;
      this.menu.braille = checked;
      document.getElementById('braille').checked = checked;
      if (checked) {
        this.menu.enrich = checked;
        document.getElementById('enrich').checkd = checked;
      }
    });

    this.menuVariable('collapsible').registerCallback(() => {
      const checked = this.doc.menu.settings.collapsible;
      document.getElementById('collapse').checked = checked;
      this.menu.compute = this.menu.collapse = checked;
      document.getElementById('compute').checked = checked;
      if (checked) {
        this.menu.enrich = checked;
        document.getElementById('enrich').checked = checked;
      }
      this.Typeset();
    });
    this.menuVariable('semantics').registerCallback(() => this.outputMML(this.mathItem));
    this.menuVariable('renderer').registerCallback(() => {
      this.render.jax = this.doc.menu.settings.renderer;
      document.getElementById('jax').value = this.render.jax
    });
    this.menuVariable('showSRE').registerCallback(() => {
      this.mmlincludes.showSRE = this.doc.menu.options.settings.showSRE;
      document.getElementById('showSRE').checked = this.mmlincludes.showSRE;
      this.outputMML(this.mathItem);
    });
    this.menuVariable('showTex').registerCallback(() => {
      this.mmlincludes.showTex = this.doc.menu.options.settings.showTex;
      document.getElementById('showTex').checked = this.mmlincludes.showTex;
      this.outputMML(this.mathItem);
    });
    this.menuVariable('texHints').registerCallback(() => {
      this.mmlincludes.texHints = this.doc.menu.options.settings.texHints;
      document.getElementById('texHints').checked = this.mmlincludes.texHints;
      this.outputMML(this.mathItem);
    });
    this.menuVariable('overflow').registerCallback(() => {
      this.output.displayOverflow = this.doc.menu.options.settings.overflow.toLowerCase();
      document.getElementById('displayOverflow').value = this.output.displayOverflow;
      this.Typeset();
    });
    this.menuVariable('breakInline').registerCallback(() => {
      this.output.breakInline = this.doc.menu.options.settings.breakInline;
      document.getElementById('breakInline').checked = this.output.breakInline;
      this.Typeset();
    });
  },

  /**
   * Get a named variable object from the menu's variable pool
   *
   * @param {string} name    The name of the variable to get
   */
  menuVariable(name) {
    return this.doc.menu.menu.pool.lookup(name);
  },

  /**
   * Set a menu variable and call its callbacks
   *
   * @param {string} name              The name of the variable to set
   * @param {string | boolean} value   The new value for the variable
   * @param {boolean} force            Whether to force the change (to run actions and callbacks)
   *                                     even if the value is already equal to the new value
   */
  setVariable(name, value, force) {
    if (value !== this.doc.menu.settings[name] || force) {
      const variable = this.menuVariable(name);
      variable.setValue(value);
      const item = variable.items[0];
      if (item) {
        item.executeCallbacks_();
      }
    }
  },

  /**
   * Augment a handler's document using the mixin for complexity() and explorable()
   *
   * @param {Handler} handler   The handler to be augmented
   */
  menuHandler(handler) {
    handler.documentClass = V3DocumentMixin(handler.documentClass);
    return handler;
  },

  /*************************************************************/

  /**
   * Check a keypress in the input textarea to see if it should force
   *   typesetting (e.g., SHIFT-RETURN does this)
   *
   * @param {HTMLTextarea} textarea   The textarea node
   * @param {KeyEvent} event          The key event to check
   */
  checkKey(textarea, event) {
    if (!event) event = window.event;
    var code = event.which || event.keyCode;
    if ((event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) &&
        (code === 13 || code === 10)) {
      if (event.preventDefault) event.preventDefault();
      event.returnValue = false;
      this.Typeset();
    }
  },

  /*************************************************************/

  /**
   * Initialize the lab once all the components have been loaded
   */
  Startup() {
    //
    // Create the form elements, and read any parameters from the URL,
    //   then set the form elements to their correct values
    //
    this.createFormElements();
    if (window.location.search !== '') this.Load();
    if (this.render.format === 'MathML') {
      Lab.disablePackages('tex', true);
      Lab.disablePackages('text', true);
    } else {
      Lab.disablePackages('mml', true);
      Lab.disablePackages('text', MathJax.config.tex.packages.indexOf('textmacros') < 0);
    }
    this.initFormElements();
    //
    // Extend the handler created by the startup module to include the menu handler
    //
    const startup = MathJax.startup;
    startup.extendHandler(handler => this.menuHandler(handler), 20);
    //
    // Transfer the checkbox information into the MathJax configuration
    //
    this.initOptions();
    //
    // Run the startup module's initialization
    //
    startup.getComponents();
    startup.makeMethods();
    //
    // Get the input jax and document that were created by the startup module,
    //   and add our hooks into the menu for synchronizing the checkboxes
    //
    this.jax = {
      TeX: startup.input.tex,
      MathML: startup.input.mml
    };
    this.jax.MathML.mmlFilters.add(() => document.getElementById('mml-mml3').checked, 0);
    this.doc = startup.document;
    this.initMenu();
    //
    //  Load any needed extensions
    //
    if (this.menu.enrich) {
      this.loadA11y('explorer')
    }
    if (this.menu.complexity) {
      this.loadA11y('complexity');
    }

    //
    //  Initialize the rest of the lab
    //
    this.initMetrics();
    this.ready = true;
    MathJax.startup.promiseResolve();
    return MathJax.typesetPromise().then(() => {
      return this.newPackages().then(() => {
        document.getElementById('keep').disabled = false;
        document.getElementById('typeset').disabled = false;
      });
    }).catch(error => console.warn(error));
  },

  /**
   * Creates the needed form elements for the keep options
   */
  createFormElements() {
    for (const data of this.keepOptions) {
      const [name, values, change, labels = {}] = (Array.isArray(data) ? data : [data, {}, false]);
      if (name === 'packages') {
        Object.keys(this.packages).map(type => this.createPackageCheckboxes(type));
      } else if (change) {
        this.createOptionElements(name, change, values, labels);
      }
    }
  },

  /**
   * Creates the input elements for an option collection
   *
   * @param {string} name     The name of the option collection
   * @param {string} change   The method to call when an option changes
   * @param {object} values   The object containing the option data
   * @param {object} labels   The object containing the optional label text
   */
  createOptionElements(name, change, values, labels) {
    const adaptor = this.adaptor;
    const parent = document.getElementById(`${name}-details`);
    const onchange = `Lab.${change}(this)`;
    let div;
    for (const [key, value] of Object.entries(this[name])) {
      if (!div) {
        div = parent.appendChild(adaptor.node('div'));
      }
      const label = labels[key] || key;
      switch(typeof value) {
      case 'boolean':
        div.appendChild(adaptor.node('input', {type: 'checkbox', id: key, onchange: onchange}));
        div.appendChild(adaptor.node('label', {for: key}, [adaptor.text(' ' + label)]));
        div.appendChild(adaptor.node('br'));
        break;
      case 'string':
        div = parent.appendChild(adaptor.node('div'));
        div.appendChild(adaptor.node('label', {for: key}, [adaptor.text(label + ':')]));
        div.appendChild(adaptor.text(' '));
        const select = div.appendChild(adaptor.node('select', {id: key, onchange: onchange}));
        for (const option of values[key]) {
          select.appendChild(adaptor.node('option', {value: option}, [adaptor.text(option || '(none)')]));
        }
        div = null;
        break;
      }
    }
  },

  /**
   * Set the initial values of the form elements.
   */
  initFormElements() {
    this.setFormOptions(this.menu);
    this.setFormOptions(this.mmlincludes);
    this.setFormOptions(this.texinput);
    this.setFormOptions(this.mmlinput);
    this.setFormOptions(this.verify);
    this.setFormOptions(this.output);
    this.setFormOptions(this.render);
    const format = this.render.format + (this.render.format === 'TeX' ? ' ' + (this.render.display ? 'D' : 'I') : '');
    document.getElementById('format').value = format;
    for (const [type, open] of Object.entries(this.details)) {
      document.getElementById(`${type}-details`).open = open;
    }
    this.output2.style.display = (this.render.secondOutput ? '' : 'none');
    document.getElementById('fontCache').disabled = (this.render.jax === 'CHTML');
    document.getElementById('adaptiveCSS').disabled = (this.render.jax === 'SVG');
    document.getElementById('matchFontHeight').disabled = (this.render.jax === 'SVG');
  },

  /**
   * @param {object} options   The {[name: string]: string | boolean} set of options and their values
   */
  setFormOptions(options) {
    for (const [id, value] of Object.entries(options)) {
      const input = document.getElementById(id);
      if (!input) continue;
      if (typeof value === 'boolean') {
        input.checked = value;
      } else {
        input.value = value;
      }
    }
  },

  /**
   * Set the MathJax configuration to be the initial values given in the form
   */
  initOptions() {
    MathJax.config.options.menuOptions = {
      settings: {
        renderer: this.render.jax,
        enrich: this.menu.enrich,
        speech: this.menu.speech,
        braille: this.menu.braille,
        collapsible: this.menu.collapse,
        showSRE: this.mmlincludes.showSRE,
        showTex: this.mmlincludes.showTex,
        texHints: this.mmlincludes.texHints,
        overflow: this.capitalize(this.output.displayOverflow),
        breakInline: !!this.output.breakInLine
      }
    };
    this.initTeX();
    this.initMathML();
    this.initOutput();
  },

  /**
   * Set the TeX input options
   */
  initTeX() {
    const config = MathJax.config.tex;
    for (const [key, value] of Object.entries(this.texinput)) {
      if (key === 'allowTexHTML' && !this.packages.tex.texhtml.checked) continue;
      if (key === 'tags' && value === 'ams') continue;  // handled later
      config[key] = value;
    }
  },

  /**
   * Set the MathML input options
   */
  initMathML() {
    const config = MathJax.config.mml;
    for (const [key, value] of Object.entries(this.mmlinput)) {
      config[key] = value;
    }
    if (!config.verify) config.verify = {};
    for (const [key, value] of Object.entries(this.verify)) {
      config.verify[key] = value;
    }
    const options = document.getElementById('verify-details');
    options.parentNode.appendChild(options);
  },

  /**
   * Set the output initial values
   */
  initOutput() {
    const chtml = MathJax.config.chtml;
    const svg = MathJax.config.svg;
    for (const [key, value] of Object.entries(this.output)) {
      if (key === 'breakInline') {
        chtml.linebreaks = {inline: value};
        svg.linebreaks = {inline: value};
      } else {
        if (key === 'font') {
          this.setFont('mathjax-' + value);
          continue;
        }
        if (key !== 'fontCache') {
          chtml[key] = value;
        }
        if (key !== 'adaptiveCSS' && key !== 'matchFontHeight') {
          svg[key] = value;
        }
      }
    }
  },

  /**
   * Capitalize a string
   */
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
  }

  /*************************************************************/

};
