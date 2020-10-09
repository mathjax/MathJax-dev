#!/bin/bash
NODE="node -r esm"
DIR=`dirname $0`
JSON=$DIR/json

if [ $# -eq 0 ]; then

    $NODE $DIR/src/tex-keyval-tests.js

    $NODE src/run-test.js $JSON/ParserActionTest.json
    ## Reordered
    $NODE src/run-test.js $JSON/ParserAmsTest.json
    $NODE src/run-test.js $JSON/ParserAmsCDTest.json
    $NODE src/run-test.js $JSON/ParserAmsComplexTest.json
    $NODE src/run-test.js $JSON/ParserAmsenvTest.json
    $NODE src/run-test.js $JSON/ParserAmserrorTest.json
    $NODE src/run-test.js $JSON/ParserArrayTest.json
    $NODE src/run-test.js $JSON/ParserBaseTest.json
    $NODE src/run-test.js $JSON/ParserBboxTest.json
    $NODE src/run-test.js $JSON/ParserBoldsymbolTest.json
    $NODE src/run-test.js $JSON/ParserBraketTest.json
    $NODE src/run-test.js $JSON/ParserBussproofsRegInfTest.json
    $NODE src/run-test.js $JSON/ParserBussproofsRegProofsTest.json
    $NODE src/run-test.js $JSON/ParserCancelTest.json
    $NODE src/run-test.js $JSON/ParserColorV2Test.json
    $NODE src/run-test.js $JSON/ParserComplexTest.json
    $NODE src/run-test.js $JSON/ParserDigitsEuropeanTest.json
    $NODE src/run-test.js $JSON/ParserDigitsTest.json
    $NODE src/run-test.js $JSON/ParserEncloseTest.json
    $NODE src/run-test.js $JSON/ParserErrorTest.json
    $NODE src/run-test.js $JSON/ParserExtpfeilTest.json
    $NODE src/run-test.js $JSON/ParserFencedTest.json
    $NODE src/run-test.js $JSON/ParserHtmlTest.json
    $NODE src/run-test.js $JSON/ParserInternalMathTest.json
    ## Reordered
    $NODE src/run-test.js $JSON/ParserConfigMacrosTest.json
    $NODE src/run-test.js $JSON/ParserMathchoiceTest.json
    $NODE src/run-test.js $JSON/ParserMatrixTest.json
    $NODE src/run-test.js $JSON/ParserMhchemTest0.json
    $NODE src/run-test.js $JSON/ParserMhchemTest1.json
    $NODE src/run-test.js $JSON/ParserMhchemTest2.json
    $NODE src/run-test.js $JSON/ParserMhchemTest3.json
    $NODE src/run-test.js $JSON/ParserMhchemTest4.json
    $NODE src/run-test.js $JSON/ParserMhchemTest5.json
    $NODE src/run-test.js $JSON/ParserMhchemTest6.json
    $NODE src/run-test.js $JSON/ParserMhchemTest7.json
    $NODE src/run-test.js $JSON/ParserMhchemTest8.json
    $NODE src/run-test.js $JSON/ParserMhchemTest9.json
    $NODE src/run-test.js $JSON/ParserMovlimTest.json
    $NODE src/run-test.js $JSON/ParserMultirelTest.json
    $NODE src/run-test.js $JSON/ParserMultlineShoveTest.json
    $NODE src/run-test.js $JSON/ParserNewcommandErrorTest.json
    $NODE src/run-test.js $JSON/ParserNewcommandTest.json
    $NODE src/run-test.js $JSON/ParserNoErrorTest.json
    $NODE src/run-test.js $JSON/ParserNoundefinedTest.json
    $NODE src/run-test.js $JSON/ParserOtherTest.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest1_0.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest1_1.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest1_2.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest1_3.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest1_4.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest1_5.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest1_6.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest1_7.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest2_0.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest2_1.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest2_2.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest2_3.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest2_4.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest2_5.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest2_6.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest2_7.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest3_0.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest3_1.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest3_2.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest3_3.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest3_4.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest3_5.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest3_6.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest3_7.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest4_0.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest5_0.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest5_1.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest5_2.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest5_3.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest5_4.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest5_5.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest6_0.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest6_1.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest6_2.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest6_3.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest6_4.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_0.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_10.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_11.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_1.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_2.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_3.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_4.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_5.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_6.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_7.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_8.json
    $NODE src/run-test.js $JSON/ParserPhysicsTest7_9.json
    $NODE src/run-test.js $JSON/ParserTagAllTest.json
    $NODE src/run-test.js $JSON/ParserTagAmsTest.json
    $NODE src/run-test.js $JSON/ParserTagNoneTest.json
    $NODE src/run-test.js $JSON/ParserUnicodeTest.json
    $NODE src/run-test.js $JSON/ParserVerbTest.json

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
