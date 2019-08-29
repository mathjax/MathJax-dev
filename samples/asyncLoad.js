import {asyncLoad} from '../mathjax3/util/AsyncLoad.js';
import {setBaseURL} from '../mathjax3/util/asyncLoad/system.js';

asyncLoad('./util/entities/all.js')
    .then(() => console.log("OK"))
    .catch(err => console.log(err));
