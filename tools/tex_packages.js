#! /usr/bin/env node

/*************************************************************************
 *
 *  tex_packages
 *
 *  Tool for extracting macros, etc. from MathJax's TeX packages.
 *
 * ----------------------------------------------------------------------
 *
 *  Copyright (c) 2018 The MathJax Consortium
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

//
//  Load the packages needed for MathJax
//
var {mathjax} = require('../mathjax3/js/mathjax.js');
var {TeX} = require('../mathjax3/js/input/tex.js');
var {AllPackages} = require('../mathjax3/js/input/tex/AllPackages.js');
var {Configuration, ConfigurationHandler} = require('../mathjax3/js/input/tex/Configuration.js');
var {MapHandler} = require('../mathjax3/js/input/tex/MapHandler.js');
var {AbstractParseMap, EnvironmentMap, DelimiterMap, MacroMap, CharacterMap, RegExpMap} = require('../mathjax3/js/input/tex/SymbolMap.js');


AbstractParseMap.prototype.toString = function() {
  let str = `Table: ${this._name}: \n`;
  let commands = [];
  for (let char of this.map.keys()) {
    commands.push(this.outputEntry(char));
  }
  return str + commands.join(', ');
};

AbstractParseMap.prototype.outputEntry = function(entry) {
  return `\\${entry}`;
};

EnvironmentMap.prototype.outputEntry = function(entry) {
  return entry;
};

DelimiterMap.prototype.outputEntry = function(entry) {
  return entry;
};

Configuration.prototype.output = function(keys) {
  let str = `\nPackage ${this.name}\n`;
  for (let key of keys) {
    for (let handler of this.handler[key]) {
      if (handler instanceof RegExpMap) continue;
      str += MapHandler.getMap(handler).toString();
    }
  }
  let option = [];
  for (let [key, value] of Object.entries(this.options)) {
    option.push(`${key}: ${value}`);
  }
  if (option.length) {
    str += '\n\nOptions:\n';
    str += option.join('\n');
  }
  return str;
};


var outputConfigurations = function() {
  let jax = new TeX({packages: AllPackages});
  let results = [];
  for (let key of jax.configuration.configurations) {
    results.push(key.item.output(jax.configuration.handlers.keys()));
  }
  return results.join('\n\n');
};
