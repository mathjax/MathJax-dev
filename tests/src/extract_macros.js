/*************************************************************
 *
 *  Copyright (c) 2020 The MathJax Consortium
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
 * @fileoverview A method to extract all macros that exist in a TeX parser
 *     package.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {mathjax} from '../node_modules/mathjax-full/js/mathjax.js';

import {TeX} from '../node_modules/mathjax-full/js/input/tex.js';
import {RegisterHTMLHandler} from '../node_modules/mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from '../node_modules/mathjax-full/js/adaptors/chooseAdaptor.js';
import {JsonMmlVisitor} from '../node_modules/mathjax-full/js/core/MmlTree/JsonMmlVisitor.js';
import {STATE} from '../node_modules/mathjax-full/js/core/MathItem.js';
import {ConfigurationHandler} from '../node_modules/mathjax-full/js/input/tex/Configuration.js';

import {TagsFactory} from '../node_modules/mathjax-full/js/input/tex/Tags.js';
import {MapHandler} from '../node_modules/mathjax-full/js/input/tex/MapHandler.js';
import * as sm from '../node_modules/mathjax-full/js/input/tex/SymbolMap.js';
import {AllPackages} from '../node_modules/mathjax-full/js/input/tex/AllPackages.js';

import {JsonTest, Test} from './base-test.js';

import {SVG} from '../node_modules/mathjax-full/js/output/svg.js';

import * as fs from 'fs';

RegisterHTMLHandler(chooseAdaptor());

let DIR = __dirname + '/../json/tex_packages/';

// fs.mkdirSync(DIR, {recursive: true});
// console.log(AllPackages);

let jv = new JsonMmlVisitor();

let packageMkdir = function(conf) {
  let dir = DIR + '/' + conf.name;
  if (Object.values(conf.handler).some(x => x.length)) {
    try {
      fs.accessSync(dir);
    } catch (e) {
      console.log('Creating package directory: ' + conf.name);
      fs.mkdirSync(dir, {recursive: true});
    }
  }
};


let document = function(packages, output = false) {
  let param = output ?
      {InputJax: new TeX({packages: packages}), OutputJax: new SVG()} :
      {InputJax: new TeX({packages: packages})};
  return mathjax.document('<html></html>', param);
};



let convert = function(command, packages) {
  let doc = document(packages);
  let root = doc.convert(command, {end: STATE.CONVERT});
  root.setTeXclass(null);
  return [jv.visitTree(root), doc.options.InputJax._parseOptions.error];
};

let collateCharacters = function(map, packages) {
  let result = {};
  for (let [key, char] of map.map) {
    let [conversion] = convert(`\\${key}`, packages);
    result[key] = {'input': `\\${key}`, 'expected': conversion};
  }
  return result;
};

let collateMacros = function(map) {
  
};

let specialMacrosMappings = {
  overwithdelims: 'A\\overwithdelims[ ] B',
  atopwithdelims: 'A\\atopwithdelims[ ] B',
  abovewithdelims: 'A\\abovewithdelims[ ] 1pt B',
  above: 'A\\above 1pt B',
  root: '\\root 4 \\of x',
  uproot: '\\sqrt[\\uproot{2}\\beta]{k}',
  leftroot: '\\sqrt[\\leftroot{-2}\\beta]{k}',
  left: '\\left(A\\right.',
  right: '\\left.A\\right)',
  middle: '\\left.\\middle(A\\right.',
  rule: '\\rule 2pt 10pt',
  Rule: '\\Rule{2pt}{10pt}{1cm}',
  Space: '\\Space{2cm}{2cm}{1cm}',
  buildrel: '\\buildrel{a}\\over b',
  skew: '\\skew{5}A B C',
  mmlToken: '\\mmlToken{mi}{a}',
  toggle: '\\toggle{A}{B}\\endtoggle',
  verb: '\\verb+\\A+',
  unicode: '\\unicode{2525}',
  genfrac: '\\genfrac{\{}{\}}{10pt}{0}{A}{B}'
};


let specialMacros = function(key, char, packages) {
  let str = specialMacrosMappings[key] || '';
  if (key.match(/^(b|B)i(g{1,2})((l|r|m){0,1})$/)) {
    str = `\\${key}(`;
  }
  if (key.match(/^hfi(l+)$/)) {
    str = `\\begin{array}{c}ab\\\\ \\${key} b\\end{array}`;
  }
  if (key.match(/limits$/)) {
    str = `\\sum\\${key}^A_B`;
  }
  if (key.match(/^(raise|lower|move(left|right))$/) ||
      key.match(/^.{0,1}(skip|space|kern)$/)) {
    str = `A\\${key} 2pt B C`;
  }
  if (key.match(/^shove/)) {
    str = `\\begin{multline}\\${key} a\\\\ b\\\\ c\\end{multline}`;
  }
  if (key.match(/^(cr|h.*line)$/)) {
    str = `\\array{a\\\\\\${key} b}`;
  }
  let [conversion, error] = str ? convert(str, packages) : [str, true];
  return [str, error ? null : conversion];
};

let convertMacro = function(key, char, packages) {
  let [str, conversion] = specialMacros(key, char, packages);
  if (str && conversion) {
    return [str, conversion];
  }
  let strings = {
    0: `\\${key} A`,
    1: `\\${key}{A}{B}`,
    2: `\\${key}{A}{B}{C}`,
    3: `\\${key}{A}{B}{C}{D}`
  };
  let error = true;
  let count = 0;
  while (error && count < 4) {
    str = strings[count++];
    [conversion, error] = convert(str, packages);
  }
  if (error) {
    console.log('Error: ' + char._symbol);
    str = '';
  }
  return [str, conversion];
};

let collateCommands = function(map, packages) {
  let result = {};
  for (let [key, char] of map.map) {
    let [entry, conversion] = convertMacro(key, char, packages);
    if (entry) {
      result[key] = {'input': entry, 'expected': conversion};
    }
  }
  return result;
};

let collateEnvironments = function(map) {
  
};

let writeJson = function(json, name, pkg) {
  let dir = `${DIR}/${pkg}/${name}.json`;
  fs.writeFileSync(dir, JSON.stringify(json, null, 2));
};

for (let pkg of ConfigurationHandler.keys()) {
  if (pkg === 'bussproofs' || pkg === 'newcommand') continue;
  let configuration = ConfigurationHandler.get(pkg);
  packageMkdir(configuration);
  let packages = pkg === 'base' ? [pkg] : ['base', pkg];
  for (let handlers of Object.values(configuration.handler)) {
    for (let handler of handlers) {
      let table = MapHandler.getMap(handler);
      if (table instanceof sm.RegExpMap) continue;
      //TODO: Be careful if the table is a delimiter table!
      if (table instanceof sm.DelimiterMap) continue;
      if (table instanceof sm.CharacterMap) {
        let json = {
          name: `${pkg} ${table.name} table test`,
          factory: 'parserTest',
          packages: packages,
          tests: collateCharacters(table, packages)
        };
        writeJson(json, table.name, pkg);
      }
      if (table instanceof sm.EnvironmentMap) continue;
      if (table instanceof sm.CommandMap) {
        console.log(`${pkg}: ${table.name}`);
        let json = {
          name: `${pkg} ${table.name} table test`,
          factory: 'parserTest',
          packages: packages,
          tests: collateCommands(table, packages)
        };
        writeJson(json, table.name, pkg);
      }
      // Not sure what do with those.
      if (table instanceof sm.MacroMap) continue;
    }
  }
}


