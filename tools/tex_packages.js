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
const {AbstractParseMap, EnvironmentMap, DelimiterMap, RegExpMap, MacroMap, CommandMap} = require('../mathjax3/js/input/tex/SymbolMap.js');

const fs = require('fs');

// Packages not included in AllPackages.
const extraPackages = ['physics', 'colorv2', 'mhchem','setOptions'];

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

MacroMap.prototype.outputEntry = function(entry) {
  return entry;
};

CommandMap.prototype.outputEntry = function(entry) {
  return `\\${entry}`;
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

let alphaCompare = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());
    

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
    str += commands.sort(alphaCompare).join(', ');
  }
  if (envs.length) {
    str += commands.length ? '\n\nAnd the following environments:\n' :
      'The `' + name + '` extension implementes the following environments:\n\n';
    str += envs.sort(alphaCompare).join(', ');
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

// Output of a single package.
// Usage: rstConfiguration('physics', '/tmp/physics.rst');
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
            if (com.indexOf(package) === -1) {
              com.push(package);
            }
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
          if (com.indexOf(package) === -1) {
            com.push(package);
          }
        } else {
          envMap.set(char, [package]);
        }
      }
    }
  }
}

let rstTableEnv = '.. list-table::\n   :widths: 70 30\n\n';


function rstCommandTableLine([command, packages]) {
  let str = '   * - ``' + command + '``\n';
  return str + '     -' +
    ((packages.length === 1 && packages[0] === 'base') ? '' :
    (' ' + packages.map(p => extraPackages.indexOf(p) === -1 ? `**${p}**` : `*${p}*`)
     .join(', ')));
}

function rstTable(title, entries) {
  return rstTitle(title) + rstTableEnv +
    entries.map(rstCommandTableLine).join('\n');
}

function rstCommandTables(cmd) {
  let table = [];
  let result = [];
  // Symbols
  for (let [symb, pkg] of cmd.entries()) {
    if (symb.match(/^([a-zA-Z]|\\[a-zA-Z])/)) {
      continue;
    }
    table.push([symb, cmd.get(symb)]);
    cmd.delete(symb);
  }
  result.push(rstTable('Symbols', table));
  let char;
  for (let i = 65; i <= 90; i++) {
    table = [];
    char = String.fromCharCode(i);
    let regExp = new RegExp(
        `^(${char}|${char.toLowerCase()}|\\\\${char}|\\\\${char.toLowerCase()})`);
    for (let [command, packages] of cmd.entries()) {
      if (!command.match(regExp)) {
        result.push(rstTable(char, table));
        break;
      }
      table.push([command, packages]);
      cmd.delete(command);
    }
  }
  result.push(rstTable(char, table));
  return result.join('\n\n');
}

function rstEnvironments(env) {
  return rstTable('Environments', [...env.entries()]);
}


// Usage: var lll = rstSymbolIndex('/tmp/tables.rst');
// Note: Some cleanup is usually necessary on the symbols table.
function rstSymbolIndex(file = ``) {
  compileCommandTable();
  let header = '.. raw:: html\n\n   <style>\n' +
      '   .wy-table-responsive table {width: 100%}\n'+
      '   .rst-content .wy-table-responsive table code.literal {background: inherit}' +
      '   </style>\n\n';
  let entryCompare = (a, b) => alphaCompare(a[0], b[0]);
  let sortedCommands = new Map([...commandMap.entries()].sort(entryCompare));
  let sortedEnvs = new Map([...envMap.entries()].sort(entryCompare));
  let final = header + rstCommandTables(sortedCommands) + '\n\n' + rstEnvironments(sortedEnvs);
  if (file) {
    fs.writeFileSync(file, final);
  }
  return final;
}


function rstAllPackages() {
  for (let package of AllPackages.concat(extraPackages)) {
    rstConfiguration(package, `/tmp/${package}.rst`);
  }
}

