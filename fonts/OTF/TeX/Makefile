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

MFTRACE_MODIFIED=lib/mftrace-modified

help:
	@echo "make all"
	@echo "  Make all the font files, and install"
	@echo "  them in the $(MATHJAXDIR)/fonts/HTML-CSS/TeX directory"
	@echo ""
	@echo "make install"
	@echo "  Put the font files into the proper locations"

blacker: $(MFTRACE_MODIFIED)
$(MFTRACE_MODIFIED):
	$(PERL) makeBlacker 15 # values between 10 and 30 seem best

pfa: $(MFTRACE_MODIFIED)
	@echo "cmr10"
	$(MFTRACE_MODIFIED) --magnification 1000 --simplify cmr10

	@echo "cmmi10"
	$(MFTRACE_MODIFIED) --magnification 1000 --encoding /opt/local/share/texmf-dist/fonts/enc/dvips/tetex/aae443f0.enc --simplify cmmi10

	@echo "cmsy10"
	$(MFTRACE_MODIFIED) --magnification 1000 --encoding /opt/local/share/texmf-dist/fonts/enc/dvips/tetex/10037936.enc --simplify cmsy10

	@echo "cmex10"
	$(MFTRACE_MODIFIED) --magnification 1000 --keep cmex10
	$(FONTFORGE) -lang=ff -c 'Open("mftrace.dir/cmex10.pfa.raw");SelectAll();AddExtrema();Simplify();AutoHint();Generate("cmex10.pfa");'
	rm -rf mftrace.dir
	rm cmex10.afm

	@echo "cmbx10"
	$(MFTRACE_MODIFIED) --magnification 1000 --simplify cmbx10

	@echo "cmti10"
	$(MFTRACE_MODIFIED) --magnification 1000 --simplify cmti10

	@echo "msam10"
	$(MFTRACE_MODIFIED) --magnification 1000 --simplify --encoding /opt/local/share/texmf-dist/fonts/enc/dvips/tetex/10037936.enc msam10

	@echo "msbm10"
	$(MFTRACE_MODIFIED) --magnification 450 --simplify --encoding /opt/local/share/texmf-dist/fonts/enc/dvips/tetex/10037936.enc msbm10

	@echo "cmmib10"
	$(MFTRACE_MODIFIED) --magnification 1000 --encoding /opt/local/share/texmf-dist/fonts/enc/dvips/tetex/aae443f0.enc --simplify cmmib10

	@echo "cmbsy10"
	$(MFTRACE_MODIFIED) --magnification 1000 --encoding /opt/local/share/texmf-dist/fonts/enc/dvips/tetex/10037936.enc --simplify cmbsy10

	@echo "cmtt10"
	$(MFTRACE_MODIFIED) --magnification 1000 --simplify cmtt10

	@echo "cmss10"
	$(MFTRACE_MODIFIED) --magnification 1000 --simplify cmss10
	@echo "cmssi10"
	$(MFTRACE_MODIFIED) --magnification 1000 --simplify cmssi10
	@echo "cmssbx10"
	$(MFTRACE_MODIFIED) --magnification 1000 --simplify cmssbx10

#	@echo "eufm10"
#	$(MFTRACE_MODIFIED) --magnification 1000 --simplify eufm10
#	@echo "eufb10"
#	$(MFTRACE_MODIFIED) --magnification 1000 --simplify eufb10

#echo "eusm10"
#$(MFTRACE_MODIFIED) --magnification 1000 --simplify eusm10
#echo "eusb10"
#$(MFTRACE_MODIFIED) --magnification 1000 --simplify eusb10

	@echo "rsfs10"
	$(MFTRACE_MODIFIED) --magnification 1000 --simplify --encoding /usr/local/texlive/2008/texmf-dist/fonts/enc/dvips/base/tex256.enc rsfs10

	mkdir -p pfa
	rm -f pfa/*
	mv *.pfa pfa

ff: pfa
	mkdir -p ff otf
	rm -f ff/* otf/*
	$(PERL)	makeFF

ttf: ff
	mkdir -p ttf
	rm -f ttf/*
	@echo "MathJax_Size4.ff" # fred: isn't it already handled below?
	$(FONTFORGE) -lang=ff -script ff/MathJax_Size4.ff

	@for file in `cd ff; ls *.ff`; do \
		echo ""; \
		echo $$file; \
		$(FONTFORGE) -lang=ff -script ff/$$file; \
		done
eot: ttf
	mkdir -p eot
	rm -f eot/*

	@for file in `ls ttf/*.ttf | $(SED) 's|ttf/\(.*\)\.ttf|\1|'`; do \
		echo "Generating $$file.eot..."; \
		$(TTF2EOT) < ttf/$$file.ttf > eot/$$file.eot; \
		done

	rm -f eot/*WinChrome* eot/*Greek*

svg: ttf
	mkdir -p svg
	rm -f svg/*

	@for file in `ls ttf/*.ttf | $(SED) 's|ttf/\(.*\)\.ttf|\1|'`; do \
		echo "Generating $$file.svg..."; \
		$(JAVA) -jar $(TTF2SVG) ttf/$$file.ttf \
		-id $$file -o svg/$$file.svg -l 0 -h 65535; \
		done

	rm -f svg/*WinIE6* svg/*Greek*

woff: otf ttf
	@for file in `ls otf/*.otf | $(SED) 's|otf/\(.*\)\.otf|\1|'`; do \
		echo "Generating $$file.woff..."; \
		$(SFNT2WOFF) otf/$$file.otf; \
		done

	mkdir -p woff
	rm -f woff/*
	mv otf/*.woff woff
	rm -f woff/*WinChrom* woff/*WinIE6* woff/*Greek*

css: woff
	mkdir -p css
	rm -f css/*

	@for file in `ls woff/*.woff | $(SED) 's|woff/\(.*\)\.woff|\1|'`; do \
		echo "Generating $$file.css..."; \
		$(PERL) woff2css $$file > css/$$file.css; \
		end

	$(PERL) css2all css/*.css > MathJax-All.css
	mv MathJax-All.css css

OTFandTTF: otf ttf

fonts: OTFandTTF eot svg woff # css

install:
#Copy the font files into the system font directory
#rm $FONTDIR/MathJax_*
	cp `ls otf/*.otf | $(GREP) -v 'Greek'` $(FONTDIR)
# echo `ls ttf/*.ttf | $(GREP) -Ev 'WinChro|WinIE6'`
	cp ttf/*Greek*.ttf $(FONTDIR)

#  Put the fonts into the MathJax fonts folder
	rm $(MATHJAXDIR)/fonts/HTML-CSS/TeX/otf/*.*
	rm $(MATHJAXDIR)/fonts/HTML-CSS/TeX/eot/*.*
	rm $(MATHJAXDIR)/fonts/HTML-CSS/TeX/svg/*.*
	rm $(MATHJAXDIR)/fonts/HTML-CSS/TeX/woff/*.*
#rm $(MATHJAXDIR)/fonts/HTML-CSS/TeX/css/*.*
	cp `ls otf/*.otf | $(GREP) -v 'Greek'` $(MATHJAXDIR)/fonts/HTML-CSS/TeX/otf
	cp eot/*.eot $(MATHJAXDIR)/fonts/HTML-CSS/TeX/eot
	cp svg/*.svg $(MATHJAXDIR)/fonts/HTML-CSS/TeX/svg
	cp woff/*.woff $(MATHJAXDIR)/fonts/HTML-CSS/TeX/woff
#cp css/*.css $(MATHJAXDIR)/fonts/HTML-CSS/TeX/css

all: fonts install

clean:
	rm -f $(MFTRACE_MODIFIED) $(BLACKER)
	rm -rf pfa ff otf ttf eot svg woff css
