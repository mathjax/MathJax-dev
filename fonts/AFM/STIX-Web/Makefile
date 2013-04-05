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

all: afm fonts data

FONTDIR2=../../OTF/STIX-Web/otf/
CONFIG_PL=config.pl
CONFIG_FILES_PL=config-files.pl
ENUM=../../Tables/enumerateGlyphs.py

afm:
	mkdir -p afm
	rm -f afm/*
	@for file in `cd $(FONTDIR2); ls *.otf`; do \
		echo ""; \
		input=`echo $(FONTDIR2)/$$file`; \
		output=`echo $$file | $(SED) 's|\(.*\)\..tf|\1|'`.afm; \
		echo "Generating $$output..."; \
		$(FONTFORGE) -lang=ff -c \
		'Open("'$$input'");Generate("afm/'$$output'")'; \
		done

$(CONFIG_PL):
	@echo "Generating $(CONFIG_PL)..."
	@echo "$$""prefix = \"STIX_\";" > $(CONFIG_PL)
	@echo "$$""fontdir = \"STIX-Web\";" >> $(CONFIG_PL)
	@echo "" >> $(CONFIG_PL)
	@echo "%ranges = (" >> $(CONFIG_PL)
	@for file in `ls afm/*.afm | $(SED) 's|afm/\(.*\)\.afm|\1|'`; do \
		$(PYTHON) $(ENUM) --perl $(FONTDIR2) $$file \
			>> $(CONFIG_PL); \
		done
	@echo ");" >> $(CONFIG_PL)

fonts: afm $(CONFIG_PL)
	rm -rf fonts
	@for file in `ls afm/*.afm | $(SED) 's|afm/\(.*\)\.afm|\1|'`; do \
		echo "Breaking up $$file..."; \
		$(PERL) break-up-font afm/$$file.afm; \
		done

$(CONFIG_FILES_PL):
	@echo "Generating $(CONFIG_FILES_PL)..."
	@echo "@files = (" > $(CONFIG_FILES_PL)
	@for file in `ls afm/*.afm | $(SED) 's|afm/\(.*\)\.afm|\1|'`; do \
		echo "\"$$file\"," >> $(CONFIG_FILES_PL); \
		done
	@echo ");" >> $(CONFIG_FILES_PL)

data: fonts $(CONFIG_FILES_PL)
	mkdir -p data
	rm -f data/*
	$(PERL) makeData

install:
	rm -f $(MATHJAXDIR)/unpacked/jax/output/HTML-CSS/fonts/STIX-Web/*/*/*.js
	cp -R fonts/STIX-Web/* $(MATHJAXDIR)/unpacked/jax/output/HTML-CSS/fonts/STIX-Web
	./copyData

clean:
	rm -rf afm fonts data $(CONFIG_PL) $(CONFIG_FILES_PL) skew.js
