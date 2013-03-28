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

include ../../../custom.cfg

all: OTFandTTF eot svg woff

fontdata.txt:
	mkdir -p otf
	mkdir -p ttf
	rm -f otf/*
	rm -f ttf/*
	$(PYTHON) splitSTIXMath.py $(FONTDIR) 5
	$(PYTHON) splitSTIX.py $(FONTDIR)
	rm -f otf/*.tmp

OTFandTTF: fontdata.txt

eot: fontdata.txt
	mkdir -p eot
	rm -f eot/*

	@for file in `ls ttf/*.ttf | $(SED) 's|ttf/\(.*\)\.ttf|\1|'`; do \
		echo "Generating $$file.eot..."; \
		$(TTF2EOT) < ttf/$$file.ttf > eot/$$file.eot; \
		done

svg: ttf
	mkdir -p svg
	rm -f svg/*

	@for file in `ls ttf/*.ttf | $(SED) 's|ttf/\(.*\)\.ttf|\1|'`; do \
		echo "Generating $$file.svg..."; \
		$(JAVA) -jar $(TTF2SVG) ttf/$$file.ttf \
		-id $$file -o svg/$$file.svg -l 0 -h 65535; \
		done

woff: otf
	@for file in `ls otf/*.otf | $(SED) 's|otf/\(.*\)\.otf|\1|'`; do \
		echo "Generating $$file.woff..."; \
		$(SFNT2WOFF) otf/$$file.otf; \
		done

	mkdir -p woff
	rm -f woff/*
	mv otf/*.woff woff

clean:
	rm -rf otf ttf eot svg woff
	rm -f fontdata.txt
