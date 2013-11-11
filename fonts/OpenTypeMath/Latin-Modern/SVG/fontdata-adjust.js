  MathJax.Hub.Register.LoadHook(SVG.fontDir+"/Size7/Regular/Main.js",function () {
    var u;
    u = SVG.FONTDATA.DELIMITERS[0x23DE].stretch.rep[0];
    SVG.FONTDATA.FONTS[SIZE7][u][0] += 200;  // adjust height for brace extender
    SVG.FONTDATA.FONTS[SIZE7][u][1] += 200;  // adjust depth for brace extender
    u = SVG.FONTDATA.DELIMITERS[0x23DF].stretch.rep[0];
    SVG.FONTDATA.FONTS[SIZE7][u][0] += 200;  // adjust height for brace extender
    SVG.FONTDATA.FONTS[SIZE7][u][1] += 200;  // adjust depth for brace extender
  });
  MathJax.Hub.Register.LoadHook(SVG.fontDir+"/Size1/Regular/Main.js",function () {
    SVG.FONTDATA.FONTS[SIZE1][0x222B][2] -= 425;
    SVG.FONTDATA.FONTS[SIZE1][0x222C][2] -= 425;
    SVG.FONTDATA.FONTS[SIZE1][0x222D][2] -= 425;
    SVG.FONTDATA.FONTS[SIZE1][0x222E][2] -= 425;
    SVG.FONTDATA.FONTS[SIZE1][0x222F][2] -= 425;
    SVG.FONTDATA.FONTS[SIZE1][0x2230][2] -= 425;
    SVG.FONTDATA.FONTS[SIZE1][0x2231][2] -= 425;
    SVG.FONTDATA.FONTS[SIZE1][0x2232][2] -= 425;
    SVG.FONTDATA.FONTS[SIZE1][0x2233][2] -= 425;
    SVG.FONTDATA.FONTS[SIZE1][0x2A0C][2] -= 425;
    SVG.FONTDATA.FONTS[SIZE1][0x2A11][2] -= 425;
  });
