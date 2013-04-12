#!gmake
#
# Version: Apache License 2.0
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

include ../../custom.cfg

all: STIX-Web

clean:
	rm -rf */otf */ttf */eot */svg */woff
	rm -f */delimiters.txt

###### Splitting the fonts ######

Asana-Math/delimiters.txt:
# This also generates Asana-Mat/eot Asana-Mat/otf
	./splitFont.sh Asana-Math

Gyre-Pagella/delimiters.txt:
# This also generates Gyre-Pagella/eot Gyre-Pagella/otf
	./splitFont.sh Gyre-Pagella

Gyre-Termes/delimiters.txt:
# This also generates Gyre-Termes/eot Gyre-Termes/otf
	./splitFont.sh Gyre-Termes

Latin-Modern/delimiters.txt:
# This also generates Latin-Modern/eot Latin-Modern/otf
	./splitFont.sh Latin-Modern

Neo-Euler/delimiters.txt:
# This also generates Neo-Euler/eot Neo-Euler/otf
	./splitFont.sh Neo-Euler

STIX-Web/delimiters.txt:
# This also generates STIX-Web/eot STIX-Web/otf
	./splitFont.sh STIX-Web

delimiters: Asana-Math/delimiters.txt Gyre-Pagella/delimiters.txt Gyre-Termes/delimiters.txt Latin-Modern/delimiters.txt Neo-Euler/delimiters.txt STIX-Web/delimiters.txt

###### Converting to EOT ######

Asana-Math/eot: Asana-Math/delimiters.txt
	./convertFont.sh Asana-Math eot

Gyre-Pagella/eot: Gyre-Pagella/delimiters.txt
	./convertFont.sh Gyre-Pagella eot

Gyre-Termes/eot: Gyre-Termes/delimiters.txt
	./convertFont.sh Gyre-Termes eot

Latin-Modern/eot: Latin-Modern/delimiters.txt
	./convertFont.sh Latin-Modern eot

Neo-Euler/eot: Neo-Euler/delimiters.txt
	./convertFont.sh Neo-Euler eot

STIX-Web/eot: STIX-Web/delimiters.txt
	./convertFont.sh STIX-Web eot

eot: Asana-Math/eot Gyre-Pagella/eot Gyre-Termes/eot Latin-Modern/eot Neo-Euler/eot STIX-Web/eot

###### Converting to SVG ######

Asana-Math/svg: Asana-Math/delimiters.txt
	./convertFont.sh Asana-Math svg

Gyre-Pagella/svg: Gyre-Pagella/delimiters.txt
	./convertFont.sh Gyre-Pagella svg

Gyre-Termes/svg: Gyre-Termes/delimiters.txt
	./convertFont.sh Gyre-Termes svg

Latin-Modern/svg: Latin-Modern/delimiters.txt
	./convertFont.sh Latin-Modern svg

Neo-Euler/svg: Neo-Euler/delimiters.txt
	./convertFont.sh Neo-Euler svg

STIX-Web/svg: STIX-Web/delimiters.txt
	./convertFont.sh STIX-Web svg

svg: Asana-Math/svg Gyre-Pagella/svg Gyre-Termes/svg Latin-Modern/svg Neo-Euler/svg STIX-Web/svg

###### Converting to WOFF ######

Asana-Math/woff: Asana-Math/delimiters.txt
	./convertFont.sh Asana-Math woff

Gyre-Pagella/woff: Gyre-Pagella/delimiters.txt
	./convertFont.sh Gyre-Pagella woff

Gyre-Termes/woff: Gyre-Termes/delimiters.txt
	./convertFont.sh Gyre-Termes woff

Latin-Modern/woff: Latin-Modern/delimiters.txt
	./convertFont.sh Latin-Modern woff

Neo-Euler/woff: Neo-Euler/delimiters.txt
	./convertFont.sh Neo-Euler woff

STIX-Web/woff: STIX-Web/delimiters.txt
	./convertFont.sh STIX-Web woff

woff: Asana-Math/woff Gyre-Pagella/woff Gyre-Termes/woff Latin-Modern/woff Neo-Euler/woff STIX-Web/woff

###### Making the fonts ######

Asana-Math: Asana-Math/eot Asana-Math/svg Asana-Math/woff
Gyre-Pagella: Gyre-Pagella/eot Gyre-Pagella/svg Gyre-Pagella/woff
Gyre-Termes: Gyre-Termes/eot Gyre-Termes/svg Gyre-Termes/woff
Latin-Modern: Latin-Modern/eot Latin-Modern/svg Latin-Modern/woff
Neo-Euler: Neo-Euler/eot Neo-Euler/svg Neo-Euler/woff
STIX-Web: STIX-Web/eot STIX-Web/svg STIX-Web/woff
