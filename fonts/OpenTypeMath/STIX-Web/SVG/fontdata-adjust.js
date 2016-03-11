  MathJax.Hub.Register.LoadHook(SVG.fontDir+"/Main/Regular/Main.js",function () {
    SVG.FONTDATA.FONTS[MAIN][0x22EE][0] += 400;  // adjust height for \vdots
    SVG.FONTDATA.FONTS[MAIN][0x22F1][0] += 500;  // adjust height for \ddots
    SVG.FONTDATA.FONTS[MAIN][0x2212][1] += 100;  // adjust depth for minus (arrow extender)
    SVG.FONTDATA.FONTS[MAIN][0x003D][1] += 100;  // adjust depth for = (double arrow extender)
  });
  MathJax.Hub.Register.LoadHook(SVG.fontDir+"/Size5/Regular/Main.js",function () {
    var u;
    u = SVG.FONTDATA.DELIMITERS[0x23DE].stretch.rep[0];
    SVG.FONTDATA.FONTS[SIZE5][u][0] += 200;  // adjust height for brace extender
    SVG.FONTDATA.FONTS[SIZE5][u][1] += 200;  // adjust depth for brace extender
    u = SVG.FONTDATA.DELIMITERS[0x23DF].stretch.rep[0];
    SVG.FONTDATA.FONTS[SIZE5][u][0] += 200;  // adjust height for brace extender
    SVG.FONTDATA.FONTS[SIZE5][u][1] += 200;  // adjust depth for brace extender
  });

