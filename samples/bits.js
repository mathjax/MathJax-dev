import {BitField} from '../mathjax3/js/util/BitField.js';

const MyBits = BitField('test1', 'test2');

const bits = new MyBits();

MyBits.allocate('test3');

bits.set('test2');
bits.set('test3');
bits.clear('test2');
console.log(bits.bits.toString(2));
console.log(bits.isSet('test1'), bits.isSet('test2'), bits.isSet('test3'));
