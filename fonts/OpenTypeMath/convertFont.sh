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

if [ $# != 2 ]
then
    echo "usage: $0 FontFamily Type"
    exit 1
fi

FONTFAMILY=$1
TYPE=$2

if [ ! -d $FONTFAMILY ]
then
    echo "Directory $FONTFAMILY does not exist"
    exit 1
fi

if [ $TYPE = "eot" ]
then
    mkdir -p $FONTFAMILY/eot
    rm -f $FONTFAMILY/eot/*
    for file in `cd $FONTFAMILY; ls ttf/*.ttf | $SED 's|ttf/\(.*\)\.ttf|\1|'`
    do
        echo "Generating $file.eot...";
        $TTF2EOT < $FONTFAMILY/ttf/$file.ttf > $FONTFAMILY/eot/$file.eot;
    done
elif [ $TYPE = "svg" ]
then
    mkdir -p $FONTFAMILY/svg
    rm -f $FONTFAMILY/svg/*
    for file in `cd $FONTFAMILY; ls ttf/*.ttf | $SED 's|ttf/\(.*\)\.ttf|\1|'`
    do
        echo "Generating $file.svg...";
	      $JAVA -jar $TTF2SVG $FONTFAMILY/ttf/$file.ttf \
            -id $file -o $FONTFAMILY/svg/$file.svg -l 0 -h 65535;
    done
elif [ $TYPE = "woff" ]
then 
    mkdir -p $FONTFAMILY/woff
    rm -f $FONTFAMILY/woff/*
	  for file in `cd $FONTFAMILY; ls otf/*.otf | $SED 's|otf/\(.*\)\.otf|\1|'`
    do
        echo "Generating $file.woff...";
        $SFNT2WOFF $FONTFAMILY/otf/$file.otf
        mv $FONTFAMILY/otf/$file.woff $FONTFAMILY/woff
    done
else
    echo "Unsupported file format $TYPE"
    exit 1
fi
