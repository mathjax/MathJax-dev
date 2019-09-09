import {asyncLoad} from '../mathjax3/js/util/AsyncLoad.js';
import {setBaseURL} from '../mathjax3/js/util/asyncLoad/system.js';

asyncLoad('./util/entities/all.js')
    .then(() => console.log("OK"))
    .catch(err => console.log(err));
