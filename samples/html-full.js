import {mathjax} from '../mathjax3/js/mathjax.js';

import {RegisterHTMLHandler} from '../mathjax3/js/handlers/html.js';
import {chooseAdaptor} from '../mathjax3/js/adaptors/chooseAdaptor.js';

RegisterHTMLHandler(chooseAdaptor());

let html = mathjax.document('<html></html>');

mathjax.handleRetriesFor(() => {

  html.findMath()
      .compile()
      .getMetrics()
      .typeset()
      .addEventHandlers()
      .updateDocument();

}).then(() => console.log('Worked!'))
  .catch(err => console.log(err.stack));
