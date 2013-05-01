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

all: STIX-Web Asana-Math Gyre-Pagella Gyre-Termes Latin-Modern Neo-Euler

clean:
	rm -rf */otf */ttf */eot */svg */woff */afm
	rm -f */fontdata.js; rm -f */fontdata-extra.js
	rm -f */config.pl

###### Splitting the fonts ######

Asana-Math/fontdata.js:
# This also generates Asana-Mat/eot Asana-Mat/otf
	$(PYTHON) splitFont.py Asana-Math $(FONTDIR)

Gyre-Pagella/fontdata.js:
# This also generates Gyre-Pagella/eot Gyre-Pagella/otf
	$(PYTHON) splitFont.py Gyre-Pagella $(FONTDIR)

Gyre-Termes/fontdata.js:
# This also generates Gyre-Termes/eot Gyre-Termes/otf
	$(PYTHON) splitFont.py Gyre-Termes $(FONTDIR)

Latin-Modern/fontdata.js:
# This also generates Latin-Modern/eot Latin-Modern/otf
	$(PYTHON) splitFont.py Latin-Modern $(FONTDIR)

Neo-Euler/fontdata.js:
# This also generates Neo-Euler/eot Neo-Euler/otf
	$(PYTHON) splitFont.py Neo-Euler $(FONTDIR)

STIX-Web/fontdata.js:
# This also generates STIX-Web/eot STIX-Web/otf
	$(PYTHON) splitFont.py STIX-Web $(FONTDIR)

fontdata: Asana-Math/fontdata.js Gyre-Pagella/fontdata.js Gyre-Termes/fontdata.js Latin-Modern/fontdata.js Neo-Euler/fontdata.js STIX-Web/fontdata.js

###### Converting to EOT ######

Asana-Math/eot: Asana-Math/fontdata.js
	./convertFont.sh Asana-Math eot

Gyre-Pagella/eot: Gyre-Pagella/fontdata.js
	./convertFont.sh Gyre-Pagella eot

Gyre-Termes/eot: Gyre-Termes/fontdata.js
	./convertFont.sh Gyre-Termes eot

Latin-Modern/eot: Latin-Modern/fontdata.js
	./convertFont.sh Latin-Modern eot

Neo-Euler/eot: Neo-Euler/fontdata.js
	./convertFont.sh Neo-Euler eot

STIX-Web/eot: STIX-Web/fontdata.js
	./convertFont.sh STIX-Web eot

eot: Asana-Math/eot Gyre-Pagella/eot Gyre-Termes/eot Latin-Modern/eot Neo-Euler/eot STIX-Web/eot

###### Converting to SVG ######

Asana-Math/svg: Asana-Math/fontdata.js
	./convertFont.sh Asana-Math svg

Gyre-Pagella/svg: Gyre-Pagella/fontdata.js
	./convertFont.sh Gyre-Pagella svg

Gyre-Termes/svg: Gyre-Termes/fontdata.js
	./convertFont.sh Gyre-Termes svg

Latin-Modern/svg: Latin-Modern/fontdata.js
	./convertFont.sh Latin-Modern svg

Neo-Euler/svg: Neo-Euler/fontdata.js
	./convertFont.sh Neo-Euler svg

STIX-Web/svg: STIX-Web/fontdata.js
	./convertFont.sh STIX-Web svg

svg: Asana-Math/svg Gyre-Pagella/svg Gyre-Termes/svg Latin-Modern/svg Neo-Euler/svg STIX-Web/svg

###### Converting to WOFF ######

Asana-Math/woff: Asana-Math/fontdata.js
	./convertFont.sh Asana-Math woff

Gyre-Pagella/woff: Gyre-Pagella/fontdata.js
	./convertFont.sh Gyre-Pagella woff

Gyre-Termes/woff: Gyre-Termes/fontdata.js
	./convertFont.sh Gyre-Termes woff

Latin-Modern/woff: Latin-Modern/fontdata.js
	./convertFont.sh Latin-Modern woff

Neo-Euler/woff: Neo-Euler/fontdata.js
	./convertFont.sh Neo-Euler woff

STIX-Web/woff: STIX-Web/fontdata.js
	./convertFont.sh STIX-Web woff

woff: Asana-Math/woff Gyre-Pagella/woff Gyre-Termes/woff Latin-Modern/woff Neo-Euler/woff STIX-Web/woff

###### Converting to AFM ######

Asana-Math/afm: Asana-Math/fontdata.js
	./convertFont.sh Asana-Math afm

Gyre-Pagella/afm: Gyre-Pagella/fontdata.js
	./convertFont.sh Gyre-Pagella afm

Gyre-Termes/afm: Gyre-Termes/fontdata.js
	./convertFont.sh Gyre-Termes afm

Latin-Modern/afm: Latin-Modern/fontdata.js
	./convertFont.sh Latin-Modern afm

Neo-Euler/afm: Neo-Euler/fontdata.js
	./convertFont.sh Neo-Euler afm

STIX-Web/afm: STIX-Web/fontdata.js
	./convertFont.sh STIX-Web afm

afm: Asana-Math/afm Gyre-Pagella/afm Gyre-Termes/afm Latin-Modern/afm Neo-Euler/afm STIX-Web/afm

### config.pl
#
# TODO: do this in splitFont.py and remove the --perl option from
# enumerateGlyphs.py

FAMILY=STIX-Web
PREFIX=STIX_
CONFIG_PL=$(FAMILY)/config.pl
ENUM=../Tables/enumerateGlyphs.py

$(CONFIG_PL):
	@echo "Generating $(CONFIG_PL)..."
	@echo "$$""prefix = \"$(PREFIX)_\";" > $(CONFIG_PL)
	@echo "$$""fontdir = \"$(FAMILY)\";" >> $(CONFIG_PL)
	@echo "" >> $(CONFIG_PL)
	@echo "%ranges = (" >> $(CONFIG_PL)
	@for file in `cd $(FAMILY)/otf/; ls *.otf | $(SED) 's|\(.*\)\.otf|\1|'`; do \
	$(PYTHON) $(ENUM) --perl $(FAMILY)/otf $$file >> $(CONFIG_PL); \
	done
	@echo ");" >> $(CONFIG_PL)

### Creating the font metrics ###

Asana-Math/fonts: Asana-Math/afm Asana-Math/config.pl
	./createMetrics.sh Asana-Math

Gyre-Pagella/fonts: Gyre-Pagella/afm Gyre-Pagella/config.pl
	./createMetrics.sh Gyre-Pagella

Gyre-Termes/fonts: Gyre-Termes/afm Gyre-Termes/config.pl
	./createMetrics.sh Gyre-Termes

Latin-Modern/fonts: Latin-Modern/afm Latin-Modern/config.pl
	./createMetrics.sh Latin-Modern

Neo-Euler/fonts: Neo-Euler/afm Neo-Euler/config.pl
	./createMetrics.sh Neo-Euler

STIX-Web/fonts: STIX-Web/afm STIX-Web/config.pl
	./createMetrics.sh STIX-Web

metrics: Asana-Math/fonts Gyre-Pagella/fonts Gyre-Termes/fonts Latin-Modern/fonts Neo-Euler/fonts STIX-Web/fonts

###### Making the fonts ######

Asana-Math: Asana-Math/eot Asana-Math/svg Asana-Math/woff
Gyre-Pagella: Gyre-Pagella/eot Gyre-Pagella/svg Gyre-Pagella/woff
Gyre-Termes: Gyre-Termes/eot Gyre-Termes/svg Gyre-Termes/woff
Latin-Modern: Latin-Modern/eot Latin-Modern/svg Latin-Modern/woff
Neo-Euler: Neo-Euler/eot Neo-Euler/svg Neo-Euler/woff
STIX-Web: STIX-Web/eot STIX-Web/svg STIX-Web/woff STIX-Web/fonts
