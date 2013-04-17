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
from copy import deepcopy

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

    # Clear all but the space glyph.
    font.selection.all()
    font.selection.select(("less", None), 0x20)
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
    # (Our PUA glyphs + the notdef glyph + the space glyph)
    i = 5
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
    def __init__(self, aIsHorizontal):
        self.mIsHorizontal = aIsHorizontal
        self.mSizeVariants = None
        self.mComponents = None
        self.mAlias = None

class mathFontSplitter:
    def __init__(self, aFontFamily, aMathFont):
        self.mFontFamily = aFontFamily

        # Open the math font to split
        self.mMathFont = fontforge.open(aMathFont)

        # Pointer to the PUA to store the horizontal/vertical components
        self.mPUAPointer=0xE000
        self.mPUAContent=dict()

        # Lists of stretchy operators
        self.mStretchyOperators=dict()

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

            operator = stretchyOp(isHorizontal)

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

            self.mStretchyOperators[glyph.unicode] = operator

        # Finally, save the new fonts
        for font in self.mMathSize:
            saveFont(self.mFontFamily, font)

    def addStretchyOperators(self, aStretchyOperators):
        # Add some stretchy operators that are not in the Open Type Math table

        for codePoint in aStretchyOperators:
            if codePoint in self.mStretchyOperators:
                raise BaseException("0x%04X is already in the list of stretchy \
operators and should not be specified in DELIMITERS" % codePoint)
            item = aStretchyOperators[codePoint]
            isHorizontal = (item["dir"] == "H")
            operator = stretchyOp(isHorizontal)

            if "alias" in item:
                # This is an alias
                operator.mAlias = item["alias"]
                self.mStretchyOperators[codePoint] = operator
                continue

            # Size variants
            if "HW" in item:
                i = 0
                operator.mSizeVariants = []
                for c in item["HW"]:
                    operator.mSizeVariants.append(
                        self.copySizeVariant(isHorizontal, i,
                                             self.mMathFont[c].glyphname))
                    i += 1

            # Components
            if "stretch" in item:
                operator.mComponents = []
                for piece in item["stretch"]:
                    data = self.copyComponent(self.mMathFont[piece[0]].
                                              glyphname,
                                              piece[1])
                    # add the optional dx,dy,scale,dh,dd parameters
                    if len(piece) > 2:
                        for i in range(2,len(piece)):
                            data.append(piece[i])

                    operator.mComponents.append(data)

            self.mStretchyOperators[codePoint] = operator

    def verifyTeXSizeVariants(self, aTeXFactor, aDelimiters):
        # Ensure that some TeX delimiters have enough variants to provide
        # different sizes for the \big, \bigg... commands.
        for codePoint in aDelimiters:
            if codePoint not in self.mStretchyOperators:
                raise BaseException("0x%04X is not in the list of stretchy \
#operators. Please add a construction for it in DELIMITERS." %
                                    codePoint)

            # Target sizes (these values are from the TeX input jax)
            p_height = 1.2/.85
            bigSizes = [0.85,1.15,1.45,1.75]
            for i in range(0,len(bigSizes)):
                bigSizes[i] *= p_height*aTeXFactor

            # These are the available variant sizes
            variantSizes = []
            variants = self.mStretchyOperators[codePoint].mSizeVariants
            for i in range(1,len(variants)):
                em = variants[i][2]
                variantSizes.append(em)

            # See https://groups.google.com/d/msg/mathjax-dev/3mdLfPrG1vg/74WbQnz2aj4J
            # Note that we browse the target/available list in reverse order
            variants2 = []
            while len(bigSizes) > 0:

                # Get the target size
                size = bigSizes.pop()

                if len(variantSizes) == 0:
                    raise BaseException("Not enough variants!")

                if variantSizes[-1] < size:
                    # The current size is not large enough to reach the target
                    # size, so scale it
                    old=variants[-1]
                    variants2.append((old[0],old[1],size,size/old[2]))
                    continue

                # Copy the variants that are larger than the target size
                while (len(variantSizes) > 1
                       and variantSizes[-1] >= size):
                    variantSizes.pop()
                    variants2.append(variants.pop())

            # Copy the remaining variants
            while len(variants) > 0:
                variants2.append(variants.pop())

            # Update the variant list for this code point
            variants2.reverse()
            self.mStretchyOperators[codePoint].mSizeVariants = variants2

    def computeNormalSizeSplitting(self):
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

        self.mNormalSize = size0

    def printDelimiters(self, aStream, aIndent, aFontExtra = False):
        # Print the delimiters
        if not(type(self.mNormalSize) == dict):
            self.computeNormalSizeSplitting()

        indent=""
        while aIndent > 0:
            indent += " "
            aIndent -= 1

        isFirst = True
        for key in sorted(self.mStretchyOperators.iterkeys()):
            operator = self.mStretchyOperators[key]

            if isFirst:
                isFirst = False
            else:
                print(",", file=aStream)

            if operator.mIsHorizontal:
                d = "H"
            else:
                d = "V"

            if operator.mAlias is not None:
                print("%s  0x%X: {alias: 0x%04X, dir: %s}" %
                      (indent, key, operator.mAlias, d), file=aStream, end="")
                continue

            print("%s  0x%X:" % (indent, key), file=aStream)
            print("%s  {" % indent, file=aStream)

            print("%s    dir: %s," % (indent, d), file=aStream)

            if operator.mSizeVariants is not None:
                # Print the size variants
                print("%s    HW: [" % indent, file=aStream, end="")

                for j in range(0, len(operator.mSizeVariants)):

                    if j > 0:
                        print(", ", file=aStream, end="")

                    v = operator.mSizeVariants[j]
                    size = v[0]
                    codePoint = v[1]
                    em = v[2]
                    scale = v[3]
                    if size == 0:
                        fontname = self.mNormalSize[codePoint]
                    else:
                        fontname = "MATHSIZE%d" % size
            
                    data = "%.3f,%s" % (em, fontname)
                    if scale != 1.0:
                        data += ",%.3f" % scale
                    if size == 0 and codePoint != key:
                        if scale == 1.0:
                            data += ",null,0x%04X" % codePoint
                        else:
                            data += ",0x%04X" % codePoint

                    print("[%s]" % data, file=aStream, end="")
                
                print("]", file=aStream, end="");

                if operator.mComponents is not None:
                    print(",", file=aStream)
                else:
                    print(file=aStream)
     
            if operator.mComponents is not None:
                # Print the components
                print("%s    stretch: {" % indent, file=aStream, end="")

                for j in range(0, len(operator.mComponents)):
                    if j > 0:
                        print(", ", file=aStream, end="")
                    v = operator.mComponents[j]
                    size = v[0]
                    codePoint = v[1]
                    pieceType = v[2]
                    if size == 0:
                        fontname = self.mNormalSize[codePoint]
                    else:
                        fontname = "MATHSIZE%d" % size

                    data = "0x%X,%s" % (codePoint, fontname)
                    if len(v) > 3:
                        for i in range(3,len(v)):
                            data += ",%.3f" % v[i]

                    print("%s:[%s]" % (pieceType, data), file=aStream, end="")

                print("}", file=aStream)

            print("%s  }" % indent, file=aStream, end="")
    
        print(file=aStream)

    def copyGlyph(self, aGlyphName, aSize):
        if (self.mMathFont[aGlyphName].unicode >= 0 and
            self.mMathFont[aGlyphName].unicode <= 0xE01EF):
            # The piece is a normal size glyph. Use the main font.
            codePoint = self.mMathFont[aGlyphName].unicode
            self.mNormalSize.append(codePoint)
            return (False,codePoint)

        if aGlyphName not in self.mPUAContent:
            # New piece: copy it into the PUA and save the code point.
            codePoint = self.mPUAPointer
            self.mPUAContent[aGlyphName] = codePoint
            moveGlyph(self.mMathFont,
                      self.mMathSize[aSize-1],
                      aGlyphName, codePoint)
            self.mPUAPointer += 1 # move to the next code point
        else:
            # This piece was already copied into the PUA:
            # retrieve its code point.
            codePoint = self.mPUAContent[aGlyphName]
        return (True,codePoint)

    def copySizeVariant(self, aIsHorizontal, aSize, aGlyphName):
            # Determine the em width/height of the glyph
            # Note: we assume that the Regular and Math bounding metrics are
            # the same.
            boundingBox = self.mMathFont[aGlyphName].boundingBox()
            if aIsHorizontal:
                s = float(boundingBox[2] - boundingBox[0])
            else:
                s = float(boundingBox[3] - boundingBox[1])

            (PUAglyph, newCodePoint) = self.copyGlyph(aGlyphName, aSize)

            if PUAglyph:
                size = aSize
            else:
                size = 0

            return (size, newCodePoint, s/self.mMathFont.em, 1.0)

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
            rv.append(self.copySizeVariant(aIsHorizontal, i, glyphname))
            i += 1

        return rv

    def copyComponent(self, aGlyphName, aType):
        # Copy a single component
        (PUAglyph, newCodePoint) = self.copyGlyph(aGlyphName, self.mMaxSize)
        if PUAglyph:
            return [self.mMaxSize, newCodePoint, aType]
        else:
            return [0, newCodePoint, aType]

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
                rv.append(self.copyComponent(p[0],  "left"))
            else:
                rv.append(self.copyComponent(p[0],  "top"))
            if len(components) == 0:
                return rv
        p = components.pop()

        # Try to get the middle component
        if p[1] == 0:
            if aIsHorizontal:
                rv.append(self.copyComponent(p[0],  "rep"))
            else:
                rv.append(self.copyComponent(p[0],  "mid"))
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
            rv.append(self.copyComponent(q[0],  "ext"))
            if len(components) == 0:
                return rv
            
        # Try to get the middle component
        if not(hasSecondComponent) and len(components) > 1:
            if aIsHorizontal:
                rv.append(self.copyComponent(p[0],  "rep"))
            else:
                rv.append(self.copyComponent(p[0],  "mid"))
            p = components.pop()

        # Try to get the last component
        if aIsHorizontal:
            rv.append(self.copyComponent(p[0],  "right"))
        else:
            rv.append(self.copyComponent(p[0],  "bot"))

        return rv
