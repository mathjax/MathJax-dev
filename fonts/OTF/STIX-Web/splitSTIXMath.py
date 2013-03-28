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

import argparse
import fontforge
import re
import fontUtil

def copyComponent(aPiece, aType):
    # Copy a single component
    global STIXMath, STIXSize, STIXSizePointer, fontData
    glyphname = aPiece[0]
    newCodePoint = STIXSizePointer[MAXSIZE]
    fontUtil.copyGlyph(STIXMath, STIXSize[MAXSIZE],
                       glyphname, newCodePoint)
    STIXSizePointer[MAXSIZE] += 1 # move to the next code point

    print("%05X:%s " % (newCodePoint, aType), file=fontData, end="")

def cmpPiece(aPiece1, aPiece2):
    # the first component has no start overlap (piece[2] == 0)
    # the last component has no end overlap    (piece[3] == 0)
    if aPiece1[2] == 0 or aPiece2[3] == 0:
        return -1
    if aPiece2[2] == 0 or aPiece1[3] == 0:
        return 1
    return 0

def copyComponents(aComponents, aIsHorizontal):
    # Copy the components. The structure of the Open Type Math table is a bit
    # more general than the TeX format, so try to fallback in a reasonable way.

    # Components seem already sorted in STIX fonts but just in case, sort
    # them a bit according to their overlap values.
    components = sorted(aComponents, cmpPiece)
    if len(components) == 0:
        return

    # Try to get the last component
    p = components.pop()
    if p[1] == 0:
        if aIsHorizontal:
            copyComponent(p,  "right")
        else:
            copyComponent(p,  "bot")
        if len(components) == 0:
            return
        p = components.pop()

    # Try to get the middle component
    if p[1] == 0:
        if aIsHorizontal:
            copyComponent(p,  "rep")
        else:
            copyComponent(p,  "mid")
        if len(components) == 0:
            return
        p = components.pop()
        hasSecondComponent = True
    else:
        hasSecondComponent = False

    # Try to get the extender component
    if p[1] == 1:
        copyComponent(p,  "ext")
        # Ignore multiple extenders
        while (p[1] == 1):
            if len(components) == 0:
                return
            p = components.pop()
            
    # Try to get the middle component
    if not(hasSecondComponent) and len(components) > 1:
        if aIsHorizontal:
            copyComponent(p,  "rep")
        else:
            copyComponent(p,  "mid")
        if len(components) == 0:
            return
        p = components.pop()

    # Try to get the last component
    if aIsHorizontal:
        copyComponent(p,  "left")
    else:
        copyComponent(p,  "top")

def copySizeVariant(aGlyph, aSizeVariantTable):
    # Copy the variants of a given glyph into the right STIX_Size* font.
    global STIXMath, STIXSize, STIXSizePointer, fontData
    for i in range(0,len(aSizeVariantTable)):
        # The variant sizes have a name with an extension, for example
        # uni005C.s2 for the size variant 2 of U+005C. We will choose the
        # destination according to the extension of the glyph name:
        # 
        # No extensions: copy into Size0
        # *.s1 or *.dst: copy into Size1
        # *.s2: copy into Size2
        # *.s3: copy into Size3
        # *.s4: copy into Size4
        # *.s5: copy into Size5
        #
        glyphname = aSizeVariantTable[i]
        sizeMatch = re.search("\.s(\d)$", glyphname)
        if sizeMatch:
            j = int(sizeMatch.group(1))
        elif glyphname.find(".") >= 0:
            j = 1
        else:
            j = 0

        # Normal size glyph (Size0) are just copied at the expected
        # Unicode position of the character. The larger variants are copied
        # into the PUA, at the location pointed by STIXSizePointer
        if j == 0:
            newCodePoint = aGlyph.unicode
        else:
            newCodePoint = STIXSizePointer[j]
            STIXSizePointer[j] += 1 # move to the next code point

        # Ask fontforge to copy the glyph
        fontUtil.copyGlyph(STIXMath, STIXSize[j],
                           aSizeVariantTable[i], newCodePoint)

        print("%05X:%d " % (newCodePoint,j), file=fontData, end="")

# Parse the command line arguments
parser = argparse.ArgumentParser()
parser.add_argument('fontdir', type=str)
parser.add_argument('maxsize', type=int, nargs='?', default=5)
args = parser.parse_args()
FONTDIR = args.fontdir
MAXSIZE = args.maxsize

# Open the STIXMath font
STIXMathFile = "%s/STIXMath-Regular.otf" % FONTDIR
STIXMath=fontforge.open(STIXMathFile)

# Create a new font for each size as well as a pointer to PUA code points
STIXSize=[]
STIXSizePointer=[]
for i in range(0,MAXSIZE+1):
    font = fontUtil.newFont(STIXMathFile, "Size%d" % i, "Regular")
    STIXSize.append(font)
    STIXSizePointer.append(0xE000) # move to the beginning of the PUA 

fontData = open("fontdata.txt", "w")

# Browse the list of all glyphs in STIXMath to find those with stretchy data.
for glyph in STIXMath.glyphs():

    if (glyph.unicode == -1):
        continue

    if (glyph.horizontalComponents is None and
        glyph.verticalComponents is None and
        glyph.horizontalVariants is None and
        glyph.verticalVariants is None):
        # skip non-stretchy glyphs
        continue
    
    print("%s" % glyph.glyphname)

    print("%05X = " % glyph.unicode, file=fontData, end="")

    if (glyph.horizontalComponents):
        # Copy horizontal components
        copyComponents(glyph.horizontalComponents, True)
    elif (glyph.verticalComponents):
        # Copy vertical components
        copyComponents(glyph.verticalComponents, False)

    print("; ", file=fontData, end="")

    if (glyph.horizontalVariants):
        # Copy horizontal size variants
        copySizeVariant(glyph, glyph.horizontalVariants.split())
    elif (glyph.verticalVariants):
        # Copy vertical size variants
        copySizeVariant(glyph, glyph.verticalVariants.split())

    print(file=fontData)

fontData.close()

# Finally, save the new fonts
for font in STIXSize:
    fontUtil.saveFont(font)
