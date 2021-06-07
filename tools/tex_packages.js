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


const {mathjax} = require('../mathjax3/js/mathjax.js');
const {TeX} = require('../mathjax3/js/input/tex.js');
const {AllPackages} = require('../mathjax3/js/input/tex/AllPackages.js');
const {Configuration, ConfigurationHandler} = require('../mathjax3/js/input/tex/Configuration.js');
const {MapHandler} = require('../mathjax3/js/input/tex/MapHandler.js');
const {AbstractParseMap, EnvironmentMap, DelimiterMap, RegExpMap} = require('../mathjax3/js/input/tex/SymbolMap.js');

const fs = require('fs');

// Packages not included in AllPackages.
const extraPackages = ['physics', 'colorv2', 'setOptions'];

AbstractParseMap.prototype.toString = function() {
  let str = `Table: ${this._name}: \n`;
  let commands = [];
  for (let char of this.map.keys()) {
    commands.push(this.outputEntry(char));
  }
  return str + commands.join(', ');
};

AbstractParseMap.prototype.toRst = function() {
  let commands = [];
  for (let char of this.map.keys()) {
    commands.push('``' + this.outputEntry(char) + '``');
  }
  return commands;
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


function rstHeader(name) {
  let hashes = new Array(name.length + 1).join('#');
  return `.. _tex-${name}:\n\n${hashes}\n${name}\n${hashes}\n`;
}

function rstCodeBlock(name) {
  return `.. code-block:: javascript\n\n`
    + `   window.MathJax = {\n`
    + `     loader: {load: ['[tex]/${name}']},\n`
    + `     tex: {packages: {'[+]': ['${name}']}}\n`
    + `   };\n`;
}

function rstRequireBlock(name) {
  return 'Alternatively, use ``\\require{' + name +
    '}`\` in a TeX expression to load it\n' +
    'dynamically from within the math on the page, if the `require`\n' +
    'extension is loaded.';
}


// Stringify values. Single quotes for strings, functions are kept intact,
// everything is JSONified.
function rstStringify(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'function') {
    return value;
  }
  return JSON.stringify(value);
}

function rstTitle(title) {
  let underline = new Array(title.length + 1).join('-');
  return `\n${title}\n${underline}\n\n`;
}

function rstOptions(name, options) {
  let str = '\n\n-----\n\n\n';
  str += `.. _tex-${name}-options:\n\n`;
  str += rstTitle(`${name} Options`);
  str += 'Adding the `' + name + '` extension to the ``packages`` array defines an\n';
  str += '``' + name + '`` sub-block of the ``tex`` configuration block with the\n';
  str += 'following values:\n\n';
  str += '.. code-block:: javascript\n\n';
  str += `  MathJax = {\n`;
  str += `    tex: {\n`;
  str += `      ${name}: {\n`;
  let optStr = [];
  for (let [key, value] of Object.entries(options)) {
    optStr.push(`        ${key}: ${rstStringify(value)}`);
  }
  str += optStr.join(',\n');
  str += '\n      }';
  str += '\n    }';
  str += '\n  };\n\n';
  for (let [key, value] of Object.entries(options)) {
    str += `\n.. _tex-${name}-${key}:\n`;
    str += `.. describe:: ${key}: ${rstStringify(value)}`;
    str += `\n\n...\n`;
  }
  return str;
}

function rstCommands(name, handlers) {
  let str = '\n\n-----\n\n\n';
  str += `.. _tex-${name}-commands:\n\n`;
  str += rstTitle(`${name} Commands`);
  let commands = [];
  for (let kind of ['character', 'macro']) {
    for (let key of handlers[kind]) {
      let handler = MapHandler.getMap(key);
      if (handler instanceof RegExpMap) continue;
      commands = commands.concat(handler.toRst());
    }
  }
  let envs = [];
  if (handlers['environment']) {
    for (let key of handlers['environment']) {
      let handler = MapHandler.getMap(key);
      if (handler instanceof RegExpMap) continue;
      envs = envs.concat(handler.toRst());
    }
  }
  if (commands.length) {
    str += 'The `' + name + '` extension implementes the following macros:\n';
    str += commands.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
    }).join(', ');
  }
  if (envs.length) {
    str += commands.length ? '\n\nAnd the following environments:\n' :
      'The `' + name + '` extension implementes the following environments:\n\n';
    str += envs.sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }).join(', ');
  }
  return str;
}

Configuration.prototype.toRst = function(keys) {
  let str = rstHeader(this.name);
  str += '\n' + rstCodeBlock(this.name) + '\n\n\n' + rstRequireBlock(this.name);
  if (this.options[this.name]) {
    str += rstOptions(this.name, this.options[this.name]);
  }
  str += rstCommands(this.name, this.handler);
  str += '\n\n\n|-----|';
  return str;
};

function rstConfiguration(name, file = '') {
  let config = ConfigurationHandler.get(name);
  let str = config ? config.toRst() : '';
  if (file) {
    fs.writeFileSync(file, str);
  }
  return file ? '' : str;
}

// String output of all configurations.
Configuration.prototype.toString = function(keys) {
  let str = '';
  for (let key of keys) {
    for (let handler of this.handler[key]) {
      if (handler instanceof RegExpMap) continue;
      str += MapHandler.getMap(handler).toString();
    }
  }
  let option = [];
  if (this.options[this.name]) {
    for (let [key, value] of Object.entries(this.options[this.name])) {
    option.push(`${key}: ${value}`);
    }
  }
  if (option.length) {
    str += '\n\nOptions:\n';
    str += option.join('\n');
  }
  return str;
};

function outputConfigurations() {
  let jax = new TeX({packages: AllPackages.concat(extraPackages)});
  let results = [];
  for (let key of jax.configuration.configurations) {
    results.push(key.item.toString(jax.configuration.handlers.keys()));
  }
  return results.join('\n\n');
}


let commandMap = new Map();
let envMap = new Map();


function compileCommandTable() {
  commandMap.clear();
  envMap.clear();
  for (let package of AllPackages.concat(extraPackages)) {
    let config = ConfigurationHandler.get(package);
    if (!config) continue;
    for (let kind of ['character', 'macro']) {
      for (let key of config.handler[kind]) {
        let handler = MapHandler.getMap(key);
        if (handler instanceof RegExpMap) continue;
        for (let char of handler.map.keys()) {
          char = handler.outputEntry(char);
          let com = commandMap.get(char);
          if (com) {
            com.push(package);
          } else {
            commandMap.set(char, [package]);
          }
        }
      }
    }
    for (let key of config.handler['environment']) {
      let handler = MapHandler.getMap(key);
      if (handler instanceof RegExpMap) continue;
      for (let char of handler.map.keys()) {
        char = handler.outputEntry(char);
        let com = envMap.get(char);
        if (com) {
          com.push(package);
        } else {
          envMap.set(char, [package]);
        }
      }
    }
  }
}

function rstCommandTable() {
  compileCommandTable();
}
