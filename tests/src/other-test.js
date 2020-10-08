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
