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

for file in `cd $FONTFAMILY/afm/; ls *.afm | $SED 's|\(.*\)\.afm|\1|'`; do
	echo "Breaking up $file...";
	$PERL break-up-font $FONTFAMILY $file;
	done
