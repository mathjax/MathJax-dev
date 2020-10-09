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
 * @fileoverview Various test classes that use JSON input.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {JsonTest} from './test.js';
import ParseUtil from '../node_modules/mathjax-full/js/input/tex/ParseUtil.js';


export class KeyvalTest extends JsonTest {

  runTest(name, input, expected) {
    this.test(
      name,
      t => {
        try {
          let keyval = ParseUtil.keyvalOptions(input);
          t.deepEqual(keyval, expected, name);
        } catch (e) {
          t.deepEqual(e.message, expected, name);
        }
      }
    );
  }

}
