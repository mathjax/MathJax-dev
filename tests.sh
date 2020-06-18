#!/bin/bash
NODE="node -r esm"


if [ $# -eq 0 ]; then

    $NODE tests/tex-keyval-tests.js

    $NODE tests/parser-base-tests.js
    $NODE tests/parser-digits-tests.js
    $NODE tests/parser-digits-european-tests.js
    $NODE tests/parser-other-tests.js
    $NODE tests/parser-fenced-tests.js
    $NODE tests/parser-movlim-tests.js
    $NODE tests/parser-mathchoice-tests.js
    $NODE tests/parser-multirel-tests.js
    $NODE tests/parser-array-tests.js
    $NODE tests/parser-error-tests.js
    $NODE tests/parser-complex-tests.js
    $NODE tests/parser-internal-math-tests.js
    $NODE tests/parser-multline-shove-tests.js
    $NODE tests/parser-matrix-tests.js
    $NODE tests/parser-colorv2-tests.js


    # AMS package tests.
    $NODE tests/parser-ams-tests.js
    $NODE tests/parser-amsenv-tests.js
    $NODE tests/parser-amserror-tests.js
    $NODE tests/parser-amscomplex-tests.js

    # The tag tests.
    $NODE tests/parser-tag-none-tests.js
    $NODE tests/parser-tag-ams-tests.js
    $NODE tests/parser-tag-all-tests.js

    # Definition/extension related.
    $NODE tests/parser-newcommand-tests.js
    $NODE tests/parser-macros-tests.js

    # Error handling.
    $NODE tests/parser-ncerror-tests.js
    $NODE tests/parser-noerror-tests.js
    $NODE tests/parser-noundefined-tests.js

    # Other standard packages
    $NODE tests/parser-action-tests.js
    $NODE tests/parser-amscd-tests.js
    $NODE tests/parser-bbox-tests.js
    $NODE tests/parser-boldsymbol-tests.js
    $NODE tests/parser-cancel-tests.js
    $NODE tests/parser-enclose-tests.js
    $NODE tests/parser-extpfeil-tests.js
    $NODE tests/parser-html-tests.js
    $NODE tests/parser-unicode-tests.js
    $NODE tests/parser-verb-tests.js

    # BraKet package.
    $NODE tests/parser-braket-tests.js

    # mhchem package.
    $NODE tests/parser-mhchem-0-tests.js
    $NODE tests/parser-mhchem-1-tests.js
    $NODE tests/parser-mhchem-2-tests.js
    $NODE tests/parser-mhchem-3-tests.js
    $NODE tests/parser-mhchem-4-tests.js
    $NODE tests/parser-mhchem-5-tests.js
    $NODE tests/parser-mhchem-6-tests.js
    $NODE tests/parser-mhchem-7-tests.js
    $NODE tests/parser-mhchem-8-tests.js
    $NODE tests/parser-mhchem-9-tests.js

    ## Physics package.
    $NODE tests/parser-physics-1-0-tests.js
    $NODE tests/parser-physics-1-1-tests.js
    $NODE tests/parser-physics-1-2-tests.js
    $NODE tests/parser-physics-1-3-tests.js
    $NODE tests/parser-physics-1-4-tests.js
    $NODE tests/parser-physics-1-5-tests.js
    $NODE tests/parser-physics-1-6-tests.js
    $NODE tests/parser-physics-1-7-tests.js
    $NODE tests/parser-physics-2-0-tests.js
    $NODE tests/parser-physics-2-1-tests.js
    $NODE tests/parser-physics-2-2-tests.js
    $NODE tests/parser-physics-2-3-tests.js
    $NODE tests/parser-physics-2-4-tests.js
    $NODE tests/parser-physics-2-5-tests.js
    $NODE tests/parser-physics-2-6-tests.js
    $NODE tests/parser-physics-2-7-tests.js
    $NODE tests/parser-physics-3-0-tests.js
    $NODE tests/parser-physics-3-1-tests.js
    $NODE tests/parser-physics-3-2-tests.js
    $NODE tests/parser-physics-3-3-tests.js
    $NODE tests/parser-physics-3-4-tests.js
    $NODE tests/parser-physics-3-5-tests.js
    $NODE tests/parser-physics-3-6-tests.js
    $NODE tests/parser-physics-3-7-tests.js
    $NODE tests/parser-physics-4-0-tests.js
    $NODE tests/parser-physics-5-0-tests.js
    $NODE tests/parser-physics-5-1-tests.js
    $NODE tests/parser-physics-5-2-tests.js
    $NODE tests/parser-physics-5-3-tests.js
    $NODE tests/parser-physics-5-4-tests.js
    $NODE tests/parser-physics-5-5-tests.js
    $NODE tests/parser-physics-6-0-tests.js
    $NODE tests/parser-physics-6-1-tests.js
    $NODE tests/parser-physics-6-2-tests.js
    $NODE tests/parser-physics-6-3-tests.js
    $NODE tests/parser-physics-6-4-tests.js
    $NODE tests/parser-physics-7-0-tests.js
    $NODE tests/parser-physics-7-1-tests.js
    $NODE tests/parser-physics-7-2-tests.js
    $NODE tests/parser-physics-7-3-tests.js
    $NODE tests/parser-physics-7-4-tests.js
    $NODE tests/parser-physics-7-5-tests.js
    $NODE tests/parser-physics-7-6-tests.js
    $NODE tests/parser-physics-7-7-tests.js
    $NODE tests/parser-physics-7-8-tests.js
    $NODE tests/parser-physics-7-9-tests.js
    $NODE tests/parser-physics-7-10-tests.js
    $NODE tests/parser-physics-7-11-tests.js

    exit 0
else
    repeat=$1
fi

i=0
sum=0
while [ $i -lt $repeat ]
do
    sum=$(( $sum + `$NODE tests/parser-tests.js | tail -1 | awk -Fm '{print $1}'`))
    i=$(( $i + 1 ))
done

echo 'Total: ' $sum
average=`bc -l <<< "($sum / $repeat)"`
echo 'Average: ' $average
