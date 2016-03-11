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

STIXURL=http://www.stixfonts.org/
STIXCHARLIST=allGlyphs.html

all: STIX

$(STIXCHARLIST):
	@echo "Downloading STIX character list..."
	$(WGET) $(STIXURL)/$(STIXCHARLIST)

unicode.pl: $(STIXCHARLIST)
	@echo "Creating unicode.pl..."
	$(PERL) makeUnicode > unicode.pl

STIX: unicode.pl
	@echo "Creating Character Table for MathJax STIX fonts..."
	@$(PERL) makeTable

clean:
	rm -rf STIX unicode.pl $(STIXCHARLIST)
