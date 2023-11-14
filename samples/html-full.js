import {mathjax} from 'mathjax-full/js/mathjax.js';

import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {chooseAdaptor} from 'mathjax-full/js/adaptors/chooseAdaptor.js';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('<html></html>');

mathjax.handleRetriesFor(() => {

  html.findMath()
      .compile()
      .getMetrics()
      .typeset()
      .updateDocument();

}).then(() => console.log('Worked!'))
  .catch(err => console.log(err.stack));
