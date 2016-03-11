  MathJax.Hub.Register.LoadHook(SVG.fontDir+"/Size5/Regular/Main.js",function () {
    var u;
    u = SVG.FONTDATA.DELIMITERS[0x23DE].stretch.rep[0];
    SVG.FONTDATA.FONTS[SIZE5][u][0] += 200;  // adjust height for brace extender
    SVG.FONTDATA.FONTS[SIZE5][u][1] += 200;  // adjust depth for brace extender
    u = SVG.FONTDATA.DELIMITERS[0x23DF].stretch.rep[0];
    SVG.FONTDATA.FONTS[SIZE5][u][0] += 200;  // adjust height for brace extender
    SVG.FONTDATA.FONTS[SIZE5][u][1] += 200;  // adjust depth for brace extender
  });
