  MathJax.Hub.Register.LoadHook(SVG.fontDir+"/Size6/Regular/Main.js",function () {
    var u;
    u = SVG.FONTDATA.DELIMITERS[0x23DE].stretch.rep[0];
    SVG.FONTDATA.FONTS[SIZE6][u][0] += 200;  // adjust height for brace extender
    SVG.FONTDATA.FONTS[SIZE6][u][1] += 200;  // adjust depth for brace extender
    u = SVG.FONTDATA.DELIMITERS[0x23DF].stretch.rep[0];
    SVG.FONTDATA.FONTS[SIZE6][u][0] += 200;  // adjust height for brace extender
    SVG.FONTDATA.FONTS[SIZE6][u][1] += 200;  // adjust depth for brace extender
  });
  MathJax.Hub.Register.LoadHook(SVG.fontDir+"/Size1/Regular/Main.js",function () {
    var i;
    SVG.FONTDATA.FONTS[SIZE1][0x222B][2] -= 300;
    for (i = 0x222C; i <= 0x2233; i++) {SVG.FONTDATA.FONTS[SIZE1][i][2] -= 420}
    for (i = 0x2A0C; i <= 0x2A1C; i++) {SVG.FONTDATA.FONTS[SIZE1][i][2] -= 420}
  });
