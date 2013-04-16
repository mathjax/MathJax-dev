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
from fontSplitting import FONTSPLITTING

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
    # Ignore glyphs that have already been deleted before
    # (Otherwise, FontForge will copy them as "blank" glyphs)
    if not(aOldPosition in aFontFrom and
           aFontFrom[aOldPosition].isWorthOutputting()):
        return

    # Move the glyph from the font aFontFrom at position aOldPosition
    # to the font aFontTo at position aNewPosition. 
    if aNewPosition is None:
        aNewPosition = aOldPosition
    aFontFrom.selection.select(aOldPosition)
    aFontFrom.cut()
    aFontTo.selection.select(aNewPosition)
    aFontTo.paste()

def moveRange(aFontFrom, aFontTo, aRangeStart, aRangeEnd):
    # Move the glyphs in the range [aRangeStart, aRangeEnd]
    # from the font aFontFrom to the font aFontTo.
    for codePoint in range(aRangeStart, aRangeEnd+1):
        moveGlyph(aFontFrom, aFontTo, codePoint)

class stretchyOp:
    def __init__(self, aCodePoint, aIsHorizontal):
        self.mCodePoint = aCodePoint
        self.mIsHorizontal = aIsHorizontal
        self.mSizeVariants = None
        self.mComponents = None

class mathFontSplitter:
    def __init__(self, aFontFamily, aMathFont):
        self.mFontFamily = aFontFamily

        # Open the math font to split
        self.mMathFont = fontforge.open(aMathFont)

        # Pointer to the PUA to store the horizontal/vertical components
        self.mPUAPointer=0xE000
        self.mPUAContent=dict()

        # Lists of stretchy operators
        self.mStretchyOperators=[]

        # List of normal size glyphs
        self.mNormalSize=[]

        # Determine the maximum size
        self.mMaxSize = 0
        for glyph in self.mMathFont.glyphs():
            if (glyph.unicode == -1):
                continue

            if (glyph.horizontalVariants is not None):
                variants = glyph.horizontalVariants.split()
            elif (glyph.verticalVariants is not None):
                variants = glyph.verticalVariants.split()
            else:
                continue

            n = len(variants)
            if variants[0] == glyph.glyphname:
                n -= 1 # ignore the normal size variant
            self.mMaxSize = max(self.mMaxSize, n)

        # Create a new font for each size
        self.mMathSize=[]
        for i in range(0, self.mMaxSize):
            self.mMathSize.append(newFont(self.mFontFamily, aMathFont,
                                          "Size%d" % (i+1), "Regular"))
        
    def split(self):
        # Browse the list of all glyphs to find those with stretchy data
        for glyph in self.mMathFont.glyphs():
            if (glyph.unicode == -1):
                continue

            hasVariants = (glyph.horizontalVariants is not None or
                           glyph.verticalVariants is not None)
            hasComponents = (glyph.horizontalComponents is not None or
                             glyph.verticalComponents is not None)

            if (not hasVariants and not hasComponents):
                # skip non-stretchy glyphs
                continue
    
            if ((glyph.horizontalVariants is not None and
                 glyph.verticalVariants is not None) or
                (glyph.horizontalComponents is not None and
                 glyph.verticalComponents is not None)):
                raise BaseException("Unable to determine direction")
        
            print("%s" % glyph.glyphname)

            # We always use the normal font for the size=0 variant
            self.mNormalSize.append(glyph.unicode)

            isHorizontal = (glyph.horizontalVariants is not None or
                            glyph.horizontalComponents is not None)

            operator = stretchyOp(glyph.unicode, isHorizontal)

            if hasVariants:
                if isHorizontal:
                    # Copy horizontal size variants
                    operator.mSizeVariants = \
                        self.copySizeVariants(glyph,
                                              glyph.horizontalVariants.split(),
                                              isHorizontal)
                else:
                    # Copy vertical size variants
                    operator.mSizeVariants = \
                        self.copySizeVariants(glyph,
                                              glyph.verticalVariants.split(),
                                              isHorizontal)

            if hasComponents:
                if isHorizontal:
                    # Copy horizontal components
                    operator.mComponents = \
                        self.copyComponents(glyph.horizontalComponents,
                                            isHorizontal)
                else:
                    # Copy vertical components
                    operator.mComponents = \
                        self.copyComponents(glyph.verticalComponents,
                                            isHorizontal)

            self.mStretchyOperators.append(operator)

        # Finally, save the new fonts
        for font in self.mMathSize:
            saveFont(self.mFontFamily, font)

    def printDelimiters(self, aStream):
        # Determine the name of the font to use for the fontSize variant
        size0 = dict()
        for codePoint in self.mNormalSize:
            if codePoint in size0:
                # Ignore duplicate
                continue

            found = False
            for subset in FONTSPLITTING:
                name = subset[0]
                for i in range(1, len(subset)):
                    r = subset[i]
                    if type(r) == int:
                        if r == codePoint:
                            found = True
                            break
                        elif codePoint < r:
                            break
                    else:
                        if (r[0] <= codePoint and codePoint <= r[1]):
                            found = True
                            break
                        elif codePoint < r[0]:
                            break
        
                if found:
                    size0[codePoint] = "%sREGULAR" % name.upper()
                    break

            if not(found):
                raise BaseException("Glyph not found: 0x%X. Is FONTSPLITTING \
correctly sorted?" % codePoint)

        # Print the delimiters list
        print("DELIMITERS: {", file=aStream)

        for i in range(0, len(self.mStretchyOperators)):
            operator = self.mStretchyOperators[i]

            if i > 0:
                print(",", file=aStream)

            print("  0x%X:" % operator.mCodePoint, file=aStream)
            print("  {", file=aStream)

            if operator.mIsHorizontal:
                print("    dir: H,", file=aStream)
            else:
                print("    dir: V,", file=aStream)

            if operator.mSizeVariants is not None:
                # Print the size variants
                print("    HW: [", file=aStream, end="")

                for j in range(0, len(operator.mSizeVariants)):

                    if j > 0:
                        print(", ", file=aStream, end="")

                    v = operator.mSizeVariants[j]
                    size = v[0]
                    codePoint = v[1]
                    em = v[2]
                    if size == 0:
                        fontname = size0[codePoint]
                    else:
                        fontname = "MATHSIZE%d" % size
            
                    print("[%d,%s]" % (em, fontname), file=aStream, end="")
                
                print("]", file=aStream, end="");

                if operator.mComponents is not None:
                    print(",", file=aStream)
                else:
                    print(file=aStream)
     
            if operator.mComponents is not None:
                # Print the components
                print("    stretch: {", file=aStream, end="")

                for j in range(0, len(operator.mComponents)):
                    if j > 0:
                        print(", ", file=aStream, end="")
                    v = operator.mComponents[j]
                    size = v[0]
                    codePoint = v[1]
                    pieceType = v[2]
                    if size == 0:
                        fontname = size0[codePoint]
                    else:
                        fontname = "MATHSIZE%d" % size
            
                    print("%s:[0x%X,%s]" % (pieceType, codePoint, fontname),
                          file=aStream, end="")

                print("}", file=aStream)
         

            print("  }", file=aStream, end="")
    
        print(file=aStream)
        print("} // END DELIMITERS", file=aStream)

    def copySizeVariants(self, aGlyph, aSizeVariantTable, aIsHorizontal):
        # Copy the variants of a given glyph into the right Size* font.

        if (len(aSizeVariantTable) == 0):
            raise BaseException("Empty aSizeVariantTable")

        rv = []
        aSizeVariantTable.reverse()

        # Always add the size = 0 (main font) if it is not there.
        if (aSizeVariantTable[-1] != aGlyph.glyphname):
            aSizeVariantTable.append(aGlyph.glyphname)

        i = 0
        while aSizeVariantTable:
            glyphname = aSizeVariantTable.pop()

            # Determine the em width/height of the glyph
            boundingBox = self.mMathFont[glyphname].boundingBox()
            if aIsHorizontal:
                s = float(boundingBox[2] - boundingBox[0])
            else:
                s = float(boundingBox[3] - boundingBox[1])

            if i > 0:
                # Ask fontforge to copy the glyph
                # We ignore the size 0 since we will use the main font instead.
                # Note: we assume that the Main and Math bounding metrics are
                # the same.
                moveGlyph(self.mMathFont,
                          self.mMathSize[i-1],
                          glyphname, aGlyph.unicode)

            rv.append([i, aGlyph.unicode, s/self.mMathFont.em])
            i += 1

        return rv

    def copyComponent(self, aPiece, aType):
        # Copy a single component
        glyphname = aPiece[0]

        if (self.mMathFont[glyphname].unicode >= 0 and
            self.mMathFont[glyphname].unicode <= 0xE01EF):
            # The piece is a normal size glyph. Use the main font.
            codePoint = self.mMathFont[glyphname].unicode
            self.mNormalSize.append(codePoint)
            return (0, codePoint, aType)
        else:
            if glyphname not in self.mPUAContent:
                # New piece: copy it into the PUA and save the code point.
                pieceCodePoint = self.mPUAPointer
                self.mPUAContent[glyphname] = pieceCodePoint
                moveGlyph(self.mMathFont,
                          self.mMathSize[self.mMaxSize-1],
                          glyphname, pieceCodePoint)
                self.mPUAPointer += 1 # move to the next code point
            else:
                # This piece was already copied into the PUA:
                # retrieve its code point.
                pieceCodePoint = self.mPUAContent[glyphname]

        return (self.mMaxSize, pieceCodePoint, aType)

    def copyComponents(self, aComponents, aIsHorizontal):
        # Copy the components. The structure of the Open Type Math table is a
        # bit more general than the TeX format, so try to fallback in a
        # reasonable way.

        if (len(aComponents) == 0):
            raise BaseException("Empty aComponents")

        rv = []

        # Components seem already sorted in most fonts but just in case, sort
        # them a bit according to their overlap values.
        def cmpPiece(aPiece1, aPiece2):
            # the first component has no start overlap (piece[2] == 0)
            # the last component has no end overlap    (piece[3] == 0)
            if aPiece1[2] == 0 or aPiece2[3] == 0:
                return 1
            if aPiece2[2] == 0 or aPiece1[3] == 0:
                return -1
            return 0
        components = sorted(aComponents, cmpPiece)

        # Try to get the last component
        p = components.pop()
        if p[1] == 0:
            if aIsHorizontal:
                rv.append(self.copyComponent(p,  "left"))
            else:
                rv.append(self.copyComponent(p,  "top"))
            if len(components) == 0:
                return rv
        p = components.pop()

        # Try to get the middle component
        if p[1] == 0:
            if aIsHorizontal:
                rv.append(self.copyComponent(p,  "rep"))
            else:
                rv.append(self.copyComponent(p,  "mid"))
            if len(components) == 0:
                return rv
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
            rv.append(self.copyComponent(q,  "ext"))
            if len(components) == 0:
                return rv
            
        # Try to get the middle component
        if not(hasSecondComponent) and len(components) > 1:
            if aIsHorizontal:
                rv.append(self.copyComponent(p,  "rep"))
            else:
                rv.append(self.copyComponent(p,  "mid"))
            p = components.pop()

        # Try to get the last component
        if aIsHorizontal:
            rv.append(self.copyComponent(p,  "right"))
        else:
            rv.append(self.copyComponent(p,  "bot"))

        return rv
