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

all: png range data

TeX:
        # Makes the .png files for ALL the fonts
	rm -rf TeX
	$(PERL) makePNG otf/MathJax_AMS-Regular.otf
	$(PERL) makePNG otf/MathJax_Caligraphic-Bold.otf
	$(PERL) makePNG otf/MathJax_Caligraphic-Regular.otf
	$(PERL) makePNG otf/MathJax_Main-Bold.otf
	$(PERL) makePNG otf/MathJax_Main-Italic.otf
	$(PERL) makePNG otf/MathJax_Main-Regular.otf
	$(PERL) makePNG otf/MathJax_Math-BoldItalic.otf
	$(PERL) makePNG otf/MathJax_Math-Italic.otf
	$(PERL) makePNG otf/MathJax_Size1-Regular.otf
	$(PERL) makePNG otf/MathJax_Size2-Regular.otf
	$(PERL) makePNG otf/MathJax_Size3-Regular.otf
	$(PERL) makePNG otf/MathJax_Size4-Regular.otf
	$(PERL) makePNG otf/MathJax_Fraktur-Regular.otf
	$(PERL) makePNG otf/MathJax_Fraktur-Bold.otf
	$(PERL) makePNG otf/MathJax_SansSerif-Regular.otf
	$(PERL) makePNG otf/MathJax_SansSerif-Bold.otf
	$(PERL) makePNG otf/MathJax_SansSerif-Italic.otf
	$(PERL) makePNG otf/MathJax_Script-Regular.otf
	$(PERL) makePNG otf/MathJax_Typewriter-Regular.otf

        # $(PERL) makePNG ttf/MathJax_Greek-Bold.ttf
        # $(PERL) makePNG ttf/MathJax_Greek-BoldItalic.ttf
        # $(PERL) makePNG ttf/MathJax_Greek-Italic.ttf
        # $(PERL) makePNG ttf/MathJax_Greek-Regular.ttf

range: TeX
        #  Makes the data files needed by the HTML-CSS output jax
        #  for ALL the MathJax image fonts
	$(PERL) makeRanges MathJax_AMS-Regular
	$(PERL) makeRanges MathJax_Caligraphic-Bold
	$(PERL) makeRanges MathJax_Caligraphic-Regular
	$(PERL) makeRanges MathJax_Main-Bold
	$(PERL) makeRanges MathJax_Main-Italic
	$(PERL) makeRanges MathJax_Main-Regular
	$(PERL) makeRanges MathJax_Math-BoldItalic
	$(PERL) makeRanges MathJax_Math-Italic
	$(PERL) makeRanges MathJax_Size1-Regular
	$(PERL) makeRanges MathJax_Size2-Regular
	$(PERL) makeRanges MathJax_Size3-Regular
	$(PERL) makeRanges MathJax_Size4-Regular
	$(PERL) makeRanges MathJax_Fraktur-Regular
	$(PERL) makeRanges MathJax_Fraktur-Bold
	$(PERL) makeRanges MathJax_SansSerif-Regular
	$(PERL) makeRanges MathJax_SansSerif-Bold
	$(PERL) makeRanges MathJax_SansSerif-Italic
	$(PERL) makeRanges MathJax_Script-Regular
	$(PERL) makeRanges MathJax_Typewriter-Regular

        # $(PERL) makeRanges MathJax_Greek-Bold
        # $(PERL) makeRanges MathJax_Greek-BoldItalic
        # $(PERL) makeRanges MathJax_Greek-Italic
        # $(PERL) makeRanges MathJax_Greek-Regular

png: TeX

TeX/png/unpacked/imagedata.js:
	$(PERL) makeData

data: TeX/png/unpacked/imagedata.js

install:
        #  Moves the image files to the proper location and
        #  removes the depth data files
	@echo "Copying image data..."
	@dir=$(MATHJAXDIR)/fonts/HTML-CSS/TeX; \
	rm -rf $$dir/png; \
	cp -r TeX/png $$dir; \
	rm -f $$dir/png/*/*/depths.pl

clean:
	rm -rf TeX
