#!/bin/bash
# -*- Mode: Shell-script; tab-width: 2; indent-tabs-mode:nil; -*-
# vim: set ts=2 et sw=2 tw=80:
#
# Copyright (c) 2013 MathJax Project
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

source ../../custom.cfg

if [ $# != 1 ]
then
    echo "usage: $0 FontFamily"
    exit 1
fi

FONTFAMILY=$1

if [ ! -d $FONTFAMILY ]
then
    echo "Directory $FONTFAMILY does not exist"
    exit 1
fi

if [ -f $FONTFAMILY/config.cfg ]
then
    source $FONTFAMILY/config.cfg
else
    echo "File $FONTFAMILY/config.cfg does not exist"
    exit 1
fi

mkdir -p $FONTFAMILY/otf
mkdir -p $FONTFAMILY/ttf
rm -f $FONTFAMILY/otf/*
rm -f $FONTFAMILY/ttf/*

# Extract the Open Type Math table from the math font
$PYTHON splitMath.py $FONTFAMILY $FONTDIR/$FONTMATH $FONTMATH_MAXSIZE
if [ $? -ne 0 ]; then exit 1; fi

if [ $FONTREGULAR ]
then
    # Split the main fonts
    $PYTHON splitMain.py $FONTFAMILY $FONTDIR $FONTREGULAR "Regular"
    $PYTHON splitMain.py $FONTFAMILY $FONTDIR $FONTBOLD "Bold"
    $PYTHON splitMain.py $FONTFAMILY $FONTDIR $FONTITALIC "Italic"
    $PYTHON splitMain.py $FONTFAMILY $FONTDIR $FONTBOLDITALIC "BoldItalic"
else
    # FONTREGULAR not specified, split the math font
    $PYTHON splitMain.py $FONTFAMILY $FONTDIR $FONTMATH "Regular"
fi

rm -f $FONTFAMILY/otf/*.tmp
