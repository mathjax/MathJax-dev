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
	rm -rf */otf */ttf */eot */svg */woff
	rm -f */HTML-CSS/fontdata.js; rm -f */HTML-CSS/fontdata-extra.js
	rm -rf */HTML-CSS/*/;
	rm -f */SVG/fontdata.js; rm -f */SVG/fontdata-extra.js
	rm -rf */SVG/*/;

###### Splitting the fonts ######

Asana-Math/HTML-CSS/fontdata.js:
# This also generates Asana-Math/eot Asana-Math/otf
	$(PYTHON) splitFont.py Asana-Math $(FONTDIR)

Gyre-Pagella/HTML-CSS/fontdata.js:
# This also generates Gyre-Pagella/eot Gyre-Pagella/otf
	$(PYTHON) splitFont.py Gyre-Pagella $(FONTDIR)

Gyre-Termes/HTML-CSS/fontdata.js:
# This also generates Gyre-Termes/eot Gyre-Termes/otf
	$(PYTHON) splitFont.py Gyre-Termes $(FONTDIR)

Latin-Modern/HTML-CSS/fontdata.js:
# This also generates Latin-Modern/eot Latin-Modern/otf
	$(PYTHON) splitFont.py Latin-Modern $(FONTDIR)

Neo-Euler/HTML-CSS/fontdata.js:
# This also generates Neo-Euler/eot Neo-Euler/otf
	$(PYTHON) splitFont.py Neo-Euler $(FONTDIR)

STIX-Web/HTML-CSS/fontdata.js:
# This also generates STIX-Web/eot STIX-Web/otf
	$(PYTHON) splitFont.py STIX-Web $(FONTDIR)

fontdata: Asana-Math/HTML-CSS/fontdata.js Gyre-Pagella/HTML-CSS/fontdata.js Gyre-Termes/HTML-CSS/fontdata.js Latin-Modern/HTML-CSS/fontdata.js Neo-Euler/HTML-CSS/fontdata.js STIX-Web/HTML-CSS/fontdata.js

###### Converting to EOT ######

Asana-Math/eot: Asana-Math/HTML-CSS/fontdata.js
	./convertFont.sh Asana-Math eot

Gyre-Pagella/eot: Gyre-Pagella/HTML-CSS/fontdata.js
	./convertFont.sh Gyre-Pagella eot

Gyre-Termes/eot: Gyre-Termes/HTML-CSS/fontdata.js
	./convertFont.sh Gyre-Termes eot

Latin-Modern/eot: Latin-Modern/HTML-CSS/fontdata.js
	./convertFont.sh Latin-Modern eot

Neo-Euler/eot: Neo-Euler/HTML-CSS/fontdata.js
	./convertFont.sh Neo-Euler eot

STIX-Web/eot: STIX-Web/HTML-CSS/fontdata.js
	./convertFont.sh STIX-Web eot

eot: Asana-Math/eot Gyre-Pagella/eot Gyre-Termes/eot Latin-Modern/eot Neo-Euler/eot STIX-Web/eot

###### Converting to SVG ######

# This is now done in fontUtil::saveFont using FontForge

# Asana-Math/svg: Asana-Math/HTML-CSS/fontdata.js
# 	./convertFont.sh Asana-Math svg

# Gyre-Pagella/svg: Gyre-Pagella/HTML-CSS/fontdata.js
# 	./convertFont.sh Gyre-Pagella svg

# Gyre-Termes/svg: Gyre-Termes/HTML-CSS/fontdata.js
# 	./convertFont.sh Gyre-Termes svg

# Latin-Modern/svg: Latin-Modern/HTML-CSS/fontdata.js
# 	./convertFont.sh Latin-Modern svg

# Neo-Euler/svg: Neo-Euler/HTML-CSS/fontdata.js
# 	./convertFont.sh Neo-Euler svg

# STIX-Web/svg: STIX-Web/HTML-CSS/fontdata.js
# 	./convertFont.sh STIX-Web svg

# svg: Asana-Math/svg Gyre-Pagella/svg Gyre-Termes/svg Latin-Modern/svg Neo-Euler/svg STIX-Web/svg

###### Converting to WOFF ######

Asana-Math/woff: Asana-Math/HTML-CSS/fontdata.js
	./convertFont.sh Asana-Math woff

Gyre-Pagella/woff: Gyre-Pagella/HTML-CSS/fontdata.js
	./convertFont.sh Gyre-Pagella woff

Gyre-Termes/woff: Gyre-Termes/HTML-CSS/fontdata.js
	./convertFont.sh Gyre-Termes woff

Latin-Modern/woff: Latin-Modern/HTML-CSS/fontdata.js
	./convertFont.sh Latin-Modern woff

Neo-Euler/woff: Neo-Euler/HTML-CSS/fontdata.js
	./convertFont.sh Neo-Euler woff

STIX-Web/woff: STIX-Web/HTML-CSS/fontdata.js
	./convertFont.sh STIX-Web woff

woff: Asana-Math/woff Gyre-Pagella/woff Gyre-Termes/woff Latin-Modern/woff Neo-Euler/woff STIX-Web/woff

###### Making the fonts ######

Asana-Math: Asana-Math/eot Asana-Math/svg Asana-Math/woff
Gyre-Pagella: Gyre-Pagella/eot Gyre-Pagella/svg Gyre-Pagella/woff
Gyre-Termes: Gyre-Termes/eot Gyre-Termes/svg Gyre-Termes/woff
Latin-Modern: Latin-Modern/eot Latin-Modern/svg Latin-Modern/woff
Neo-Euler: Neo-Euler/eot Neo-Euler/svg Neo-Euler/woff
STIX-Web: STIX-Web/eot STIX-Web/svg STIX-Web/woff

# Some commands to copy the fonts and font data

JAXDEST=$(MATHJAXDIR)/unpacked/jax/output/
FONTDEST=$(MATHJAXDIR)/fonts/HTML-CSS/

copyFontData:
	@for f in Asana-Math Gyre-Pagella Gyre-Termes Latin-Modern Neo-Euler STIX-Web ; do \
		rm -rf $(JAXDEST)/HTML-CSS/fonts/$$f; \
		cp -r $$f/HTML-CSS $(JAXDEST)/HTML-CSS/fonts/$$f; \
		rm -rf $(JAXDEST)/SVG/fonts/$$f; \
		cp -r $$f/SVG $(JAXDEST)/SVG/fonts/$$f; \
		rm -f $(JAXDEST)/*/fonts/*/fontdata-adjust.js; \
	done

copyFontFiles:
	@for f in Asana-Math Gyre-Pagella Gyre-Termes Latin-Modern Neo-Euler STIX-Web ; do \
		rm -rf $(FONTDEST)/$$f; \
		mkdir $(FONTDEST)/$$f; \
		cp -r $$f/eot $(FONTDEST)/$$f/eot; \
		cp -r $$f/otf $(FONTDEST)/$$f/otf; \
		cp -r $$f/woff $(FONTDEST)/$$f/woff; \
	done
