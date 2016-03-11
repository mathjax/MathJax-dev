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

all: TeX

TeX:
	@echo "Copying Web fonts..."
	@mkdir -p TeX/css/; cd TeX/css/ ; \
	FONTDIR=../../../../OTF/TeX/; \
	cp -r $$FONTDIR/eot eot; \
	cp -r $$FONTDIR/otf otf; \
	cp -r $$FONTDIR/svg svg; \
	cp -r $$FONTDIR/ttf ttf; \
	cp -r $$FONTDIR/woff woff;
	@echo "Creating Character Table for MathJax TeX fonts..."
	@$(PERL) makeTable

clean:
	rm -rf TeX
