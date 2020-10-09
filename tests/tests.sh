#!/bin/bash
NODE="npx jest"  # node -r esm
NAME="src/parser.test.js" # src/run-test.js
DIR=`dirname $0`
JSON=$DIR/json

if [ $# -eq 0 ]; then

    $NODE $NAME $JSON/KeyvalTest.json
    ## $NODE $DIR/src/tex-keyval-tests.js

    $NODE $NAME $JSON/ParserActionTest.json
    ## Reordered
    $NODE $NAME $JSON/ParserAmsTest.json
    $NODE $NAME $JSON/ParserAmsCDTest.json
    $NODE $NAME $JSON/ParserAmsComplexTest.json
    $NODE $NAME $JSON/ParserAmsenvTest.json
    $NODE $NAME $JSON/ParserAmserrorTest.json
    $NODE $NAME $JSON/ParserArrayTest.json
    $NODE $NAME $JSON/ParserBaseTest.json
    $NODE $NAME $JSON/ParserBboxTest.json
    $NODE $NAME $JSON/ParserBoldsymbolTest.json
    $NODE $NAME $JSON/ParserBraketTest.json
    $NODE $NAME $JSON/ParserBussproofsRegInfTest.json
    $NODE $NAME $JSON/ParserBussproofsRegProofsTest.json
    $NODE $NAME $JSON/ParserCancelTest.json
    $NODE $NAME $JSON/ParserColorV2Test.json
    $NODE $NAME $JSON/ParserComplexTest.json
    $NODE $NAME $JSON/ParserDigitsEuropeanTest.json
    $NODE $NAME $JSON/ParserDigitsTest.json
    $NODE $NAME $JSON/ParserEncloseTest.json
    $NODE $NAME $JSON/ParserErrorTest.json
    $NODE $NAME $JSON/ParserExtpfeilTest.json
    $NODE $NAME $JSON/ParserFencedTest.json
    $NODE $NAME $JSON/ParserHtmlTest.json
    $NODE $NAME $JSON/ParserInternalMathTest.json
    ## Reordered
    $NODE $NAME $JSON/ParserConfigMacrosTest.json
    $NODE $NAME $JSON/ParserMathchoiceTest.json
    $NODE $NAME $JSON/ParserMatrixTest.json
    $NODE $NAME $JSON/ParserMhchemTest0.json
    $NODE $NAME $JSON/ParserMhchemTest1.json
    $NODE $NAME $JSON/ParserMhchemTest2.json
    $NODE $NAME $JSON/ParserMhchemTest3.json
    $NODE $NAME $JSON/ParserMhchemTest4.json
    $NODE $NAME $JSON/ParserMhchemTest5.json
    $NODE $NAME $JSON/ParserMhchemTest6.json
    $NODE $NAME $JSON/ParserMhchemTest7.json
    $NODE $NAME $JSON/ParserMhchemTest8.json
    $NODE $NAME $JSON/ParserMhchemTest9.json
    $NODE $NAME $JSON/ParserMovlimTest.json
    $NODE $NAME $JSON/ParserMultirelTest.json
    $NODE $NAME $JSON/ParserMultlineShoveTest.json
    $NODE $NAME $JSON/ParserNewcommandErrorTest.json
    $NODE $NAME $JSON/ParserNewcommandTest.json
    $NODE $NAME $JSON/ParserNoErrorTest.json
    $NODE $NAME $JSON/ParserNoundefinedTest.json
    $NODE $NAME $JSON/ParserOtherTest.json
    $NODE $NAME $JSON/ParserPhysicsTest1_0.json
    $NODE $NAME $JSON/ParserPhysicsTest1_1.json
    $NODE $NAME $JSON/ParserPhysicsTest1_2.json
    $NODE $NAME $JSON/ParserPhysicsTest1_3.json
    $NODE $NAME $JSON/ParserPhysicsTest1_4.json
    $NODE $NAME $JSON/ParserPhysicsTest1_5.json
    $NODE $NAME $JSON/ParserPhysicsTest1_6.json
    $NODE $NAME $JSON/ParserPhysicsTest1_7.json
    $NODE $NAME $JSON/ParserPhysicsTest2_0.json
    $NODE $NAME $JSON/ParserPhysicsTest2_1.json
    $NODE $NAME $JSON/ParserPhysicsTest2_2.json
    $NODE $NAME $JSON/ParserPhysicsTest2_3.json
    $NODE $NAME $JSON/ParserPhysicsTest2_4.json
    $NODE $NAME $JSON/ParserPhysicsTest2_5.json
    $NODE $NAME $JSON/ParserPhysicsTest2_6.json
    $NODE $NAME $JSON/ParserPhysicsTest2_7.json
    $NODE $NAME $JSON/ParserPhysicsTest3_0.json
    $NODE $NAME $JSON/ParserPhysicsTest3_1.json
    $NODE $NAME $JSON/ParserPhysicsTest3_2.json
    $NODE $NAME $JSON/ParserPhysicsTest3_3.json
    $NODE $NAME $JSON/ParserPhysicsTest3_4.json
    $NODE $NAME $JSON/ParserPhysicsTest3_5.json
    $NODE $NAME $JSON/ParserPhysicsTest3_6.json
    $NODE $NAME $JSON/ParserPhysicsTest3_7.json
    $NODE $NAME $JSON/ParserPhysicsTest4_0.json
    $NODE $NAME $JSON/ParserPhysicsTest5_0.json
    $NODE $NAME $JSON/ParserPhysicsTest5_1.json
    $NODE $NAME $JSON/ParserPhysicsTest5_2.json
    $NODE $NAME $JSON/ParserPhysicsTest5_3.json
    $NODE $NAME $JSON/ParserPhysicsTest5_4.json
    $NODE $NAME $JSON/ParserPhysicsTest5_5.json
    $NODE $NAME $JSON/ParserPhysicsTest6_0.json
    $NODE $NAME $JSON/ParserPhysicsTest6_1.json
    $NODE $NAME $JSON/ParserPhysicsTest6_2.json
    $NODE $NAME $JSON/ParserPhysicsTest6_3.json
    $NODE $NAME $JSON/ParserPhysicsTest6_4.json
    $NODE $NAME $JSON/ParserPhysicsTest7_0.json
    $NODE $NAME $JSON/ParserPhysicsTest7_10.json
    $NODE $NAME $JSON/ParserPhysicsTest7_11.json
    $NODE $NAME $JSON/ParserPhysicsTest7_1.json
    $NODE $NAME $JSON/ParserPhysicsTest7_2.json
    $NODE $NAME $JSON/ParserPhysicsTest7_3.json
    $NODE $NAME $JSON/ParserPhysicsTest7_4.json
    $NODE $NAME $JSON/ParserPhysicsTest7_5.json
    $NODE $NAME $JSON/ParserPhysicsTest7_6.json
    $NODE $NAME $JSON/ParserPhysicsTest7_7.json
    $NODE $NAME $JSON/ParserPhysicsTest7_8.json
    $NODE $NAME $JSON/ParserPhysicsTest7_9.json
    $NODE $NAME $JSON/ParserTagAllTest.json
    $NODE $NAME $JSON/ParserTagAmsTest.json
    $NODE $NAME $JSON/ParserTagNoneTest.json
    $NODE $NAME $JSON/ParserUnicodeTest.json
    $NODE $NAME $JSON/ParserVerbTest.json

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
