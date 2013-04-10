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

def newFont(aFamily, aFontFrom, aName, aWeight):
    print("New font %s-%s..." % (aName, aWeight))

    # Create a copy of the original font, to preserve all the metadata.
    fileName = "%s/otf/%s.%s.tmp" % (aFamily, aName, aWeight)
    copyfile(aFontFrom, fileName)

    # Now open the new font and rename it.
    font = fontforge.open(fileName)
    font.fontname = "%s_%s-%s" % (font.familyname.replace(" ", "_"), aName,
                                  aWeight)
    font.fullname = font.fontname
    font.encoding = "UnicodeFull"

    # Clear all the glyphs.
    font.selection.all()
    font.clear()

    # Copy the three PUA glyphs used to detect Web Fonts availability
    PUAfont = fontforge.open("X-%s.otf" % aWeight)
    PUAfont.selection.select(("ranges", None), 0xEFFD, 0xEFFF)
    PUAfont.copy()
    font.selection.select(("ranges", None), 0xEFFD, 0xEFFF)    
    font.paste()

    return font

def saveFont(aFamily, aFont):
    # Check that the font has at least four glyphs
    # (Our PUA glyphs + the notdef glyph)
    i = 4
    for g in aFont.glyphs():
        i -= 1
        if i == 0:
            break
    if i > 0:
        return

    # Save the new font.
    print("Generating %s..." % aFont.fontname)

    # When we have copied indivual stretchy characters, we may also have
    # copied the associated information from the Open Type Math table.
    # Hence we need to remove that table.
    aFont.math.clear()

    aFont.generate("%s/otf/%s.otf" % (aFamily, aFont.fontname))
    aFont.generate("%s/ttf/%s.ttf" % (aFamily, aFont.fontname))

def moveGlyph(aFontFrom, aFontTo, aOldPosition, aNewPosition = None):
    # Move the glyph from the font aFontFrom at position aOldPosition
    # to the font aFontTo at position aNewPosition. 
    if aNewPosition is None:
        aNewPosition = aOldPosition
    aFontFrom.selection.select(aOldPosition)
    aFontFrom.cut()
    aFontTo.selection.select(aNewPosition)
    aFontTo.paste()

def moveRange(aFontFrom, aFontTo, aRangeStart, aRangeEnd):
    # Move the glyphs in the range (aRangeStart, aRangeEnd)
    # from the font aFontFrom to the font aFontTo.
    aFontFrom.selection.select(("ranges", None), aRangeStart, aRangeEnd)
    aFontTo.selection.select(("ranges", None), aRangeStart, aRangeEnd)
    aFontFrom.cut()
    aFontTo.paste()

def moveFontCoverage(aFontFrom, aFontTo, aFontReference):
    # Move the glyphs covered by aFontReference
    # from the font aFontFrom to the font aFontTo.
    reference = fontforge.open(aFontReference)
    for glyph in reference.glyphs():
        if (glyph.unicode == -1 or
            (glyph.unicode in aFontFrom and
             not(aFontFrom[glyph.unicode].isWorthOutputting()))):
            # Ignore NonUnicode glyph or those that have already been
            # cut from aFontFrom.
            continue
        moveGlyph(aFontFrom, aFontTo, glyph.unicode)
