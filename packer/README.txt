This directory includes the code for 
producing the compressed versions of MathJax.  You will need to 
obtain a copy of the yuicompressor from

    http://developer.yahoo.com/yui/compressor/

and unpack it in this directory. Alternatively you can symlink to the yuicompressor installation.

Typically you would call the compression script from the MathJax project 
directory, like this:
    /path/to/this/directory/packMJ

MathJax also contains some javascript files specific to the image fonts. 
These can be compressed with:
    /path/to/this/directory/packMJfonts

Alternatively you can pass the MathJax project directory as the first argument
of packMJ or packMJfonts. For example, from this directory you could call:
    ./packMJ /path/to/MathJax
    ./packMJfonts /path/to/MathJax

