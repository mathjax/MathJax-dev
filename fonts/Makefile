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

all: otf afm # img ams tables

otf:
	$(MAKE) -C OTF/TeX all

afm:
	$(MAKE) -C AFM/TeX all
	$(MAKE) -C AFM/STIX-1.1 all

img:
	$(MAKE) -C IMG/TeX all

ams:
	$(MAKE) -C AMS

tables:
	$(MAKE) -C TABLES/TeX all
