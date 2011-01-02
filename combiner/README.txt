This directory includes the code for producing the combined
configuration files that include multiple js files in one larger
file.  This is a new feature for v1.1, and should not be used on
pre-1.1 MathJax files.

Typically you would call the combiner script from the MathJax
project directory, like this:

    /path/to/this/directory/combineMJ

Alternatively you can pass the MathJax project directory as the first
argument of combineMJ. For example, from this directory you could
call:

    ./combineMJ /path/to/MathJax

