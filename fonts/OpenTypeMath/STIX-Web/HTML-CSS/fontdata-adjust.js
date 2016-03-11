  MathJax.Hub.Register.LoadHook(HTMLCSS.fontDir+"/Main/Regular/Main.js",function () {
    HTMLCSS.FONTDATA.FONTS[MAIN][0x22EE][0] += 400;  // adjust height for \vdots
    HTMLCSS.FONTDATA.FONTS[MAIN][0x22F1][0] += 500;  // adjust height for \ddots
    HTMLCSS.FONTDATA.FONTS[MAIN][0x2212][1] += 100;  // adjust depth for minus (arrow extender)
    HTMLCSS.FONTDATA.FONTS[MAIN][0x003D][1] += 100;  // adjust depth for = (double arrow extender)
  });
  MathJax.Hub.Register.LoadHook(HTMLCSS.fontDir+"/Size5/Regular/Main.js",function () {
    var u;
    u = HTMLCSS.FONTDATA.DELIMITERS[0x23DE].stretch.rep[0];
    HTMLCSS.FONTDATA.FONTS[SIZE5][u][0] += 200;  // adjust height for brace extender
    HTMLCSS.FONTDATA.FONTS[SIZE5][u][1] += 200;  // adjust depth for brace extender
    u = HTMLCSS.FONTDATA.DELIMITERS[0x23DF].stretch.rep[0];
    HTMLCSS.FONTDATA.FONTS[SIZE5][u][0] += 200;  // adjust height for brace extender
    HTMLCSS.FONTDATA.FONTS[SIZE5][u][1] += 200;  // adjust depth for brace extender
  });

