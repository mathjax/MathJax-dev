  MathJax.Hub.Register.LoadHook(HTMLCSS.fontDir+"/Size6/Regular/Main.js",function () {
    var u;
    u = HTMLCSS.FONTDATA.DELIMITERS[0x23DE].stretch.rep[0];
    HTMLCSS.FONTDATA.FONTS[SIZE6][u][0] += 100;  // adjust height for brace extender
    HTMLCSS.FONTDATA.FONTS[SIZE6][u][1] += 100;  // adjust depth for brace extender
    u = HTMLCSS.FONTDATA.DELIMITERS[0x23DF].stretch.rep[0];
    HTMLCSS.FONTDATA.FONTS[SIZE6][u][0] += 100;  // adjust height for brace extender
    HTMLCSS.FONTDATA.FONTS[SIZE6][u][1] += 100;  // adjust depth for brace extender
  });
  MathJax.Hub.Register.LoadHook(HTMLCSS.fontDir+"/Size1/Regular/Main.js",function () {
    var i;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222B][2] -= 300;
    HTMLCSS.FONTDATA.FONTS[SIZE1][0x222B][5] = {rfix:-300};
    for (i = 0x222C; i <= 0x2233; i++) {
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][2] -= 420;
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][5] = {rfix:-420};
    }
    for (i = 0x2A0C; i <= 0x2A1C; i++) {
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][2] -= 420;
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][5] = {rfix:-420};
    } 
  });
