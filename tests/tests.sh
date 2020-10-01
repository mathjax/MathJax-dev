#!/bin/bash
NODE="node -r esm"
DIR=`dirname $0`

if [ $# -eq 0 ]; then

    $NODE $DIR/tex-keyval-tests.js

    $NODE $DIR/parser-base-tests.js
    $NODE $DIR/parser-digits-tests.js
    $NODE $DIR/parser-digits-european-tests.js
    $NODE $DIR/parser-other-tests.js
    $NODE $DIR/parser-fenced-tests.js
    $NODE $DIR/parser-movlim-tests.js
    $NODE $DIR/parser-mathchoice-tests.js
    $NODE $DIR/parser-multirel-tests.js
    $NODE $DIR/parser-array-tests.js
    $NODE $DIR/parser-error-tests.js
    $NODE $DIR/parser-complex-tests.js
    $NODE $DIR/parser-internal-math-tests.js
    $NODE $DIR/parser-multline-shove-tests.js
    $NODE $DIR/parser-matrix-tests.js
    $NODE $DIR/parser-colorv2-tests.js


    # AMS package tests.
    $NODE $DIR/parser-ams-tests.js
    $NODE $DIR/parser-amsenv-tests.js
    $NODE $DIR/parser-amserror-tests.js
    $NODE $DIR/parser-amscomplex-tests.js

    # The tag tests.
    $NODE $DIR/parser-tag-none-tests.js
    $NODE $DIR/parser-tag-ams-tests.js
    $NODE $DIR/parser-tag-all-tests.js

    # Definition/extension related.
    $NODE $DIR/parser-newcommand-tests.js
    $NODE $DIR/parser-macros-tests.js

    # Error handling.
    $NODE $DIR/parser-ncerror-tests.js
    $NODE $DIR/parser-noerror-tests.js
    $NODE $DIR/parser-noundefined-tests.js

    # Other standard packages
    $NODE $DIR/parser-action-tests.js
    $NODE $DIR/parser-amscd-tests.js
    $NODE $DIR/parser-bbox-tests.js
    $NODE $DIR/parser-boldsymbol-tests.js
    $NODE $DIR/parser-cancel-tests.js
    $NODE $DIR/parser-enclose-tests.js
    $NODE $DIR/parser-extpfeil-tests.js
    $NODE $DIR/parser-html-tests.js
    $NODE $DIR/parser-unicode-tests.js
    $NODE $DIR/parser-verb-tests.js

    # BraKet package.
    $NODE $DIR/parser-braket-tests.js

    # mhchem package.
    $NODE $DIR/parser-mhchem-0-tests.js
    $NODE $DIR/parser-mhchem-1-tests.js
    $NODE $DIR/parser-mhchem-2-tests.js
    $NODE $DIR/parser-mhchem-3-tests.js
    $NODE $DIR/parser-mhchem-4-tests.js
    $NODE $DIR/parser-mhchem-5-tests.js
    $NODE $DIR/parser-mhchem-6-tests.js
    $NODE $DIR/parser-mhchem-7-tests.js
    $NODE $DIR/parser-mhchem-8-tests.js
    $NODE $DIR/parser-mhchem-9-tests.js

    ## Physics package.
    $NODE $DIR/parser-physics-1-0-tests.js
    $NODE $DIR/parser-physics-1-1-tests.js
    $NODE $DIR/parser-physics-1-2-tests.js
    $NODE $DIR/parser-physics-1-3-tests.js
    $NODE $DIR/parser-physics-1-4-tests.js
    $NODE $DIR/parser-physics-1-5-tests.js
    $NODE $DIR/parser-physics-1-6-tests.js
    $NODE $DIR/parser-physics-1-7-tests.js
    $NODE $DIR/parser-physics-2-0-tests.js
    $NODE $DIR/parser-physics-2-1-tests.js
    $NODE $DIR/parser-physics-2-2-tests.js
    $NODE $DIR/parser-physics-2-3-tests.js
    $NODE $DIR/parser-physics-2-4-tests.js
    $NODE $DIR/parser-physics-2-5-tests.js
    $NODE $DIR/parser-physics-2-6-tests.js
    $NODE $DIR/parser-physics-2-7-tests.js
    $NODE $DIR/parser-physics-3-0-tests.js
    $NODE $DIR/parser-physics-3-1-tests.js
    $NODE $DIR/parser-physics-3-2-tests.js
    $NODE $DIR/parser-physics-3-3-tests.js
    $NODE $DIR/parser-physics-3-4-tests.js
    $NODE $DIR/parser-physics-3-5-tests.js
    $NODE $DIR/parser-physics-3-6-tests.js
    $NODE $DIR/parser-physics-3-7-tests.js
    $NODE $DIR/parser-physics-4-0-tests.js
    $NODE $DIR/parser-physics-5-0-tests.js
    $NODE $DIR/parser-physics-5-1-tests.js
    $NODE $DIR/parser-physics-5-2-tests.js
    $NODE $DIR/parser-physics-5-3-tests.js
    $NODE $DIR/parser-physics-5-4-tests.js
    $NODE $DIR/parser-physics-5-5-tests.js
    $NODE $DIR/parser-physics-6-0-tests.js
    $NODE $DIR/parser-physics-6-1-tests.js
    $NODE $DIR/parser-physics-6-2-tests.js
    $NODE $DIR/parser-physics-6-3-tests.js
    $NODE $DIR/parser-physics-6-4-tests.js
    $NODE $DIR/parser-physics-7-0-tests.js
    $NODE $DIR/parser-physics-7-1-tests.js
    $NODE $DIR/parser-physics-7-2-tests.js
    $NODE $DIR/parser-physics-7-3-tests.js
    $NODE $DIR/parser-physics-7-4-tests.js
    $NODE $DIR/parser-physics-7-5-tests.js
    $NODE $DIR/parser-physics-7-6-tests.js
    $NODE $DIR/parser-physics-7-7-tests.js
    $NODE $DIR/parser-physics-7-8-tests.js
    $NODE $DIR/parser-physics-7-9-tests.js
    $NODE $DIR/parser-physics-7-10-tests.js
    $NODE $DIR/parser-physics-7-11-tests.js

    exit 0
else
    repeat=$1
fi

i=0
sum=0
while [ $i -lt $repeat ]
do
    sum=$(( $sum + `$NODE $DIR/parser-tests.js | tail -1 | awk -Fm '{print $1}'`))
    i=$(( $i + 1 ))
done

echo 'Total: ' $sum
average=`bc -l <<< "($sum / $repeat)"`
echo 'Average: ' $average
