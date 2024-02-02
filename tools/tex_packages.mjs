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


import {mathjax} from '../mathjax3/mjs/mathjax.js';
import {TeX} from '../mathjax3/mjs/input/tex.js';
import {AllPackages} from '../mathjax3/mjs/input/tex/AllPackages.js';
import {Configuration, ConfigurationHandler} from '../mathjax3/mjs/input/tex/Configuration.js';
import {MapHandler} from '../mathjax3/mjs/input/tex/MapHandler.js';
import {AbstractParseMap, EnvironmentMap, DelimiterMap, RegExpMap, MacroMap, CommandMap} from '../mathjax3/mjs/input/tex/TokenMap.js';
import {AutoloadConfiguration} from '../mathjax3/mjs/input/tex/autoload/AutoloadConfiguration.js';

import * as fs from 'fs';

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

MacroMap.prototype.outputEntry = function(entry) {
  return entry;
};

CommandMap.prototype.outputEntry = function(entry) {
  return `\\${entry}`;
};



/**
 *
 *  RST output generation
 *
 */

// RST constant elements
function rstIntro(name) {
  let str = 'The `' + name + '` extension implements the ``' + name + '`` ';
  str += 'style package from LaTeX.\n';
  str += '**...Explanation...**\n';
  str += 'See the `CTAN page <https://www.ctan.org/pkg/' + name + '>`__\n';
  str += 'for more information and documentation of `' + name + '`.';
  return str;
}

function rstExplicitLoading(name) {
  let str = 'To load the `' + name + '` extension, add ``\'[tex]/\'' + name + '\'`` ';
  str += 'to the ``load`` array of the ``loader`` block of your\n';
  str += 'MathJax configuration, and add ``\'' + name + '\'`` to the';
  str += ' ``packages`` array of the ``tex`` block.\n\n';
  return str;
}

function rstIsAutoloaded(name) {
  let str = 'This extension is loaded automatically when the `autoload` ';
  str += 'extension is used.\n';
  str += rstExplicitLoading(name);
  return str;
}

function rstIsNotAutoloaded(name) {
  let str = 'This package is not autoloaded, so you must';
  str += ' request it explicitly if you want to use it.\n';
  str += rstExplicitLoading(name);
  return str;
}

function isAutoloaded(name) {
  return !!AutoloadConfiguration.options.autoload[name];
}

function rstAutoload(name) {
  return isAutoloaded(name) ? rstIsAutoloaded(name) : rstIsNotAutoloaded(name);
}


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

// RST Title
function rstTitle(title) {
  let underline = new Array(title.length + 1).join('-');
  return `\n${title}\n${underline}\n\n`;
}

// RST Options paragraph
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
    str += 'The `' + name + '` extension implements the following macros:\n';
    str += commands.sort(alphaCompare).join(', ');
  }
  if (envs.length) {
    str += commands.length ? '\n\nAnd the following environments:\n' :
      'The `' + name + '` extension implements the following environments:\n\n';
    str += envs.sort(alphaCompare).join(', ');
  }
  return str;
}

Configuration.prototype.toRst = function(keys) {
  let str = rstHeader(this.name);
  str += '\n\n';
  str += rstIntro(this.name);
  str += '\n\n';
  str += rstAutoload(this.name);
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

// Command Index methods
let commandMap = new Map();
let envMap = new Map();


function compileCommandTable() {
  commandMap.clear();
  envMap.clear();
  for (let pkg of AllPackages.concat(extraPackages)) {
    let config = ConfigurationHandler.get(pkg);
    if (!config) continue;
    for (let kind of ['character', 'macro']) {
      for (let key of config.handler[kind]) {
        let handler = MapHandler.getMap(key);
        if (handler instanceof RegExpMap) continue;
        for (let char of handler.map.keys()) {
          char = handler.outputEntry(char);
          let com = commandMap.get(char);
          if (com) {
            if (com.indexOf(pkg) === -1) {
              com.push(pkg);
            }
          } else {
            commandMap.set(char, [pkg]);
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
          if (com.indexOf(pkg) === -1) {
            com.push(pkg);
          }
        } else {
          envMap.set(char, [pkg]);
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
     (' ' + packages.map(
       p => (p === 'base' || p === 'ams' || isAutoloaded(p)) ? `**${p}**` : `*${p}*`)
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


// Output of the symbol index.
// Usage: rstSymbolIndex('/tmp/index.rst');
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


// Output of sekeleton documentation for all packages.
// Usage: rstAllPackages()
function rstAllPackages() {
  for (let pkg of AllPackages.concat(extraPackages)) {
    rstConfiguration(pkg, `/tmp/${pkg}.rst`);
  }
}

rstAllPackages();
rstSymbolIndex('/tmp/index.rst');



/**
 *
 *  HTML output generation
 *
 */

AbstractParseMap.prototype.toHtml = function() {
  let str = '<table rules="all" frame="box" cellpadding="5">';
  str += '\n<thead>\n<tr><th>Macro Name</th><th>Macro Output</th></thead>';
  let commands = [];
  for (let [char, def] of this.map.entries()) {
    commands.push(`<tr><td>${this.outputHtml(char)}</td><td>$${this.outputHtml(char, def._args?.length)}$</td></tr>`);
  }
  str += '\n' + commands.join('\n');
  str += '\n</table>';
  return str;
};

EnvironmentMap.prototype.toHtml = function() {
  let str = '<table rules="all" frame="box" cellpadding="5">';
  str += '\n<thead>\n<tr><th>Environment Name</th><th>Macro Output</th></thead>';
  let commands = [];
  for (let char of this.map.keys()) {
    commands.push(`<tr><td>${char}</td><td>$${this.outputHtml(char)}$</td></tr>`);
  }
  str += '\n' + commands.join('\n');
  str += '\n</table>';
  return str;
};

AbstractParseMap.prototype.outputHtml = function(entry, args = 0) {
  if (args <= 1) {
    return `\\${entry}`;
  }
  let rest = '';
  let count = 1;
  while (count < args) {
    rest += `{${count++}}`;
  }
  return `\\${entry}${rest}`;
};

EnvironmentMap.prototype.outputHtml = function(entry) {
  return `\\begin{${entry}} ABC \\end{${entry}}`;
};

DelimiterMap.prototype.outputHtml = function(entry) {
  return entry;
};

// MacroMap.prototype.outputEntry = function(entry) {
//   return entry;
// };

// CommandMap.prototype.outputEntry = function(entry) {
//   return `\\${entry}`;
// };


// HTML constant elements
function htmlTitle(config, name) {
  return `MathJax ${config} Macros Test: Table ${name}`;
}

function htmlHeader(config, name) {
  let str = '';
  str += '\n<!DOCTYPE html>';
  str += '\n<html>';
  str += '\n<head>';
  str += `\n<title>${htmlTitle(config, name)}</title>`;
  str += '\n<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';
  str += '\n<meta http-equiv="X-UA-Compatible" content="IE=edge" />';
  str += '\n' + htmlMathJaxConfig(config);
  str += '\n' + htmlMathJaxScript();
  str += '\n</head>';
  return str;
}

function htmlMathJaxConfig(name) {
  let str = '';
  str += '\n<script>';
  str += '\n  window.MathJax = {';
  str += `\n    loader: {load: ['[tex]/${name}']},`;
  str += '\n    tex: {';
  str += '\n      inlineMath: [';
  str += '\n        [\'$\',\'$\'],      ';
  str += '\n        [\'\\(\',\'\\)\']';
  str += '\n      ],';
  str += `\n      packages: {'[+]': ['${name}']}`;
  str += '\n    }';
  str += '\n  }';
  str += '\n</script>';
  return str;
}

function htmlMathJaxScript() {
  return '<script id="MathJax-script" async type="module" src="./bundle/tex-chtml.js"></script>';
}

function htmlTable(name, table) {
  let str = htmlHeader(name, table._name);
  str += '\n\n<body>';
  str += `\n<h1>${htmlTitle(name, table.name)}</h1>`;
  str += `\n${table.toHtml()}`;
  str += '\n</body>\n</html>';
  return str;
}

Configuration.prototype.toHtml = function() {
  let commands = [];
  for (let kind of ['character', 'macro', 'delimiter']) {
    for (let key of this.handler[kind]) {
      let handler = MapHandler.getMap(key);
      if (handler instanceof RegExpMap) continue;
      let str = htmlTable(this.name, handler);
      fs.writeFileSync(`/tmp/${this.name}_${key}.html`, str);
    }
  }
  let envs = [];
  if (this.handler['environment']) {
    for (let key of this.handler['environment']) {
      let handler = MapHandler.getMap(key);
      if (handler instanceof RegExpMap) continue;
      let str = htmlTable(this.name, handler);
      fs.writeFileSync(`/tmp/${key}.html`, str);
    }
  }
};

// Output of a single package.
// Usage: htmlConfiguration('physics', '/tmp/physics.html');
function htmlConfiguration(name) {
  let config = ConfigurationHandler.get(name);
  if (config) {
    config.toHtml();
  }
}

function htmlAllPackages() {
  for (let pkg of AllPackages.concat(extraPackages)) {
    htmlConfiguration(pkg);
  }
}

htmlAllPackages();
