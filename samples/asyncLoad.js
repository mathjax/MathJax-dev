import 'mathjax-full/js/util/asyncLoad/node.js';
import {asyncLoad} from 'mathjax-full/js/util/AsyncLoad.js';

asyncLoad('../js/util/entities/all.js')
    .then(() => console.log("OK"))
    .catch(err => console.log(err));
