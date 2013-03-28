# -*- Mode: Python; tab-width: 2; indent-tabs-mode:nil; -*-
# vim: set ts=2 et sw=2 tw=80:
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

from __future__ import print_function

from shutil import copyfile
import fontforge

def newFont(aFontFrom, aName, aWeight):
    print("New font %s-%s..." % (aName, aWeight))

    # Create a copy of the original font, to preserve all the metadata.
    fileName = "otf/%s.%s.tmp" % (aName, aWeight)
    copyfile(aFontFrom, fileName)

    # Now open the new font and rename it.
    font = fontforge.open(fileName)
    font.fontname = "%s_%s" % (font.familyname.replace(" ", "_"), aName)

    # Clear all the glyphs.
    font.selection.all()
    font.clear()

    return font

def saveFont(aFont):
    # Save the new font.
    print("Generating %s..." % aFont.fontname)

    # When we have copied indivual stretchy characters, we may also have
    # copied the associated information from the Open Type Math table.
    # Hence we need to remove that table.
    aFont.math.clear()

    aFont.generate("otf/%s-%s.otf" % (aFont.fontname, aFont.weight))
    aFont.generate("ttf/%s-%s.ttf" % (aFont.fontname, aFont.weight))

def copyGlyph(aFontFrom, aFontTo, aOldPosition, aNewPosition = None):
    # Copy the glyph from the font aFontFrom at position aOldPosition
    # to the font aFontTo at position aNewPosition. 
    if aNewPosition is None:
        aNewPosition = aOldPosition
    aFontFrom.selection.select(aOldPosition)
    aFontFrom.copy()
    aFontTo.selection.select(aNewPosition)
    aFontTo.paste()

def copyFontCoverage(aFontFrom, aFontTo, aFontReference):
    # Copy the glyphs covered by  aFontReference
    # from the font aFontFrom to the font aFontTo.
    reference = fontforge.open(aFontReference)
    for glyph in reference.glyphs():
        if glyph.unicode == -1:
            continue
        copyGlyph(aFontFrom, aFontTo, glyph.unicode)

def copyRange(aFontFrom, aFontTo, aRangeStart, aRangeEnd):
    # Copy the glyphs in the range (aRangeStart, aRangeEnd)
    # from the font aFontFrom to the font aFontTo.
    aFontFrom.selection.select(("ranges", None), aRangeStart, aRangeEnd)
    aFontTo.selection.select(("ranges", None), aRangeStart, aRangeEnd)
    aFontFrom.copy()
    aFontTo.paste()
