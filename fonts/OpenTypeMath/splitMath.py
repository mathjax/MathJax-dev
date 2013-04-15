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

def copyComponent(aPiece, aType, lastPiece=False):
    # Copy a single component
    global Math, Size
    global PUAPointer, PUAContent
    global fontData, MAXSIZE
    glyphname = aPiece[0]

    if glyphname not in PUAContent:
        # New piece: copy it and save the code point.
        pieceCodePoint = PUAPointer
        PUAContent[glyphname] = pieceCodePoint
        fontUtil.moveGlyph(Math, Size[MAXSIZE],
                           glyphname, pieceCodePoint)
        PUAPointer += 1 # move to the next code point
    else:
        # This piece was already copied: retrieve its code point.
        pieceCodePoint = PUAContent[glyphname]

    print("%s:[0x%X,MATHSIZE%d]" % (aType, pieceCodePoint, MAXSIZE),
          file=fontData, end="")

    if not(lastPiece):
        print(", ", file=fontData, end="")

def cmpPiece(aPiece1, aPiece2):
    # the first component has no start overlap (piece[2] == 0)
    # the last component has no end overlap    (piece[3] == 0)
    if aPiece1[2] == 0 or aPiece2[3] == 0:
        return 1
    if aPiece2[2] == 0 or aPiece1[3] == 0:
        return -1
    return 0

def copyComponents(aComponents, aIsHorizontal):
    # Copy the components. The structure of the Open Type Math table is a bit
    # more general than the TeX format, so try to fallback in a reasonable way.

    # Components seem already sorted in most fonts but just in case, sort
    # them a bit according to their overlap values.
    components = sorted(aComponents, cmpPiece)
    if len(components) == 0:
        return

    # Try to get the last component
    p = components.pop()
    if p[1] == 0:
        isLast = (len(components) == 0)
        if aIsHorizontal:
            copyComponent(p,  "left", isLast)
        else:
            copyComponent(p,  "top", isLast)
        if isLast:
            return
        p = components.pop()

    # Try to get the middle component
    if p[1] == 0:
        isLast = (len(components) == 0)
        if aIsHorizontal:
            copyComponent(p,  "rep", isLast)
        else:
            copyComponent(p,  "mid", isLast)
        if isLast:
            return
        p = components.pop()
        hasSecondComponent = True
    else:
        hasSecondComponent = False

    # Try to get the extender component
    if p[1] == 1:
        q = p
        # Ignore multiple extenders
        while (len(components) > 0 and components[0][1] == 1):
            p = components.pop()
        isLast = (len(components) == 0)
        copyComponent(q,  "ext", isLast)
        if isLast:
            return
            
    # Try to get the middle component
    if not(hasSecondComponent) and len(components) > 1:
        if aIsHorizontal:
            copyComponent(p,  "rep", False)
        else:
            copyComponent(p,  "mid", False)
        p = components.pop()

    # Try to get the last component
    if aIsHorizontal:
        copyComponent(p,  "right", True)
    else:
        copyComponent(p,  "bot", True)

def copySizeVariant(aGlyph, aSizeVariantTable, aIsHorizontal):
    # Copy the variants of a given glyph into the right Size* font.
    global Math, Size, fontData, FONTFAMILY, MAXSIZE

    aSizeVariantTable.reverse()

    # Always add the Size0 character if it is not here.
    if (len(aSizeVariantTable) == 0 or
        aSizeVariantTable[-1] != aGlyph.glyphname):
        aSizeVariantTable.append(aGlyph.glyphname)

    if (len(aSizeVariantTable)-1 > MAXSIZE):
        raise BaseException("Too many size variants in %s. Please verify that the value of FONTMATH_MAXSIZE correctly set (it should be at least %d)" %
                            (FONTFAMILY,len(aSizeVariantTable)-1))

    i = 0
    while aSizeVariantTable:
        glyphname = aSizeVariantTable.pop()

        # Determine the em width/height of the glyph
        boundingBox = Math[glyphname].boundingBox()
        if aIsHorizontal:
            s = float(boundingBox[2] - boundingBox[0])
        else:
            s = float(boundingBox[3] - boundingBox[1])

        # Ask fontforge to copy the glyph
        fontUtil.moveGlyph(Math, Size[i], glyphname, aGlyph.unicode)

        if i > 0:
            print(",", file=fontData, end="")

        print("[%.3f,MATHSIZE%d]" % (s/Math.em,i), file=fontData, end="")
        i += 1

# Parse the command line arguments
parser = argparse.ArgumentParser()
parser.add_argument('fontfamily', type=str)
parser.add_argument('mathfont', type=str)
parser.add_argument('maxsize', type=int, nargs='?', default=5)

args = parser.parse_args()
FONTFAMILY = args.fontfamily
MATHFONT = args.mathfont
MAXSIZE = args.maxsize

# Open the Math font
Math=fontforge.open(MATHFONT)

# Create a new font for each size
Size=[]
for i in range(0,MAXSIZE+1):
    font = fontUtil.newFont(FONTFAMILY, MATHFONT, "Size%d" % i, "Regular")
    Size.append(font)

# Pointer to the PUA to store the horizontal/vertical components
PUAPointer=0xE000
PUAContent=dict()

fontData = open("%s/delimiters.txt" % FONTFAMILY, "w")

firstGlyph = True

print("DELIMITERS: {", file=fontData)

# Browse the list of all glyphs in Math to find those with stretchy data.
for glyph in Math.glyphs():

    if (glyph.unicode == -1):
        continue

    hasVariants = (glyph.horizontalVariants is not None or
                   glyph.verticalVariants is not None)
    hasComponents = (glyph.horizontalComponents is not None or
                     glyph.verticalComponents is not None)

    if (not hasVariants and not hasComponents):
        # skip non-stretchy glyphs
        continue
    
    if firstGlyph:
        firstGlyph = False
    else:
        print(",", file=fontData)

    if ((glyph.horizontalVariants is not None and
         glyph.verticalVariants is not None) or
        (glyph.horizontalComponents is not None and
         glyph.verticalComponents is not None)):
        raise BaseException("Unable to determine direction")
        
    isHorizontal = (glyph.horizontalVariants is not None or
                    glyph.horizontalComponents is not None)

    print("%s" % glyph.glyphname)

    print("  0x%X:" % glyph.unicode, file=fontData)
    print("  {", file=fontData)

    if isHorizontal:
        print("    dir: H,", file=fontData)
    else:
        print("    dir: V,", file=fontData)

    if hasVariants:
        print("    HW: [", file=fontData, end="")
        if isHorizontal:
            # Copy horizontal size variants
            copySizeVariant(glyph, glyph.horizontalVariants.split(),
                            isHorizontal)
        else:
            # Copy vertical size variants
            copySizeVariant(glyph, glyph.verticalVariants.split(),
                            isHorizontal)
        print("]", file=fontData, end="");
        if hasComponents:
            print(",", file=fontData)
        else:
            print(file=fontData)

    if hasComponents:
        print("    stretch: {", file=fontData, end="")
        if isHorizontal:
            # Copy horizontal components
            copyComponents(glyph.horizontalComponents, isHorizontal)
        else:
            # Copy vertical components
            copyComponents(glyph.verticalComponents, isHorizontal)
        print("}", file=fontData)

    print("  }", file=fontData, end="")


print(file=fontData)
print("} // END DELIMITERS", file=fontData)
fontData.close()

# Finally, save the new fonts
for font in Size:
    fontUtil.saveFont(FONTFAMILY, font)
