  MathJax.Hub.Register.LoadHook(HTMLCSS.fontDir+"/Size1/Regular/Main.js",function () {
    var i;
    for (i = 0x222B; i <= 0x222D; i++) {
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][2] -= 190;
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][5] = {rfix:-190};
    }
    for (i = 0x222E; i <= 0x2231; i++) {
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][2] -= 100;
      HTMLCSS.FONTDATA.FONTS[SIZE1][i][5] = {rfix:-100};
    }
  });
