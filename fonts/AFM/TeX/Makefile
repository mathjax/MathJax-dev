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

FONTDATA=$(MATHJAXDIR)/unpacked/jax/output/HTML-CSS/fonts/TeX/fontdata.js

all: afm fonts data install

afm:
	mkdir -p afm
	rm -f afm/*
	for file in `cd $(FONTDIR); ls *.*tf`; do \
		echo ""; \
		input=`echo $(FONTDIR)/$$file`; \
		output=`echo $$file | $(SED) 's|\(.*\)\..tf|\1|'`.afm; \
		echo "Generating $$output..."; \
		$(FONTFORGE) -lang=ff -c \
		'Open("'$$input'");Generate("afm/'$$output'")'; \
		done

fonts: afm
	rm -rf fonts
	@for file in `ls afm/*.afm | $(SED) 's|afm/\(.*\)\.afm|\1|'`; do \
		echo "Breaking up $$file..."; \
		$(PERL) break-up-font afm/$$file.afm; \
		done
data: fonts
	mkdir -p data
	rm -f data/*
	$(PERL) makeData

install:
	rm $(MATHJAXDIR)/unpacked/jax/output/HTML-CSS/fonts/TeX/*/*/*.js
	cp -R fonts/TeX/* $(MATHJAXDIR)/unpacked/jax/output/HTML-CSS/fonts/TeX
	./copyData

clean:
	rm -rf afm fonts data
