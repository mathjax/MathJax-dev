This directory holds the various tools used to create the data used by 
MathJax for its fonts.  Most include a make all command that you can run to 
create the needed files.

You should build things in this order:

OTF -- to create the MathJax font files
AFM -- to create the data needed for the fontdata.js files
IMG -- to create the image files for the MathJax fonts
AMS -- to create to data needed for the AMS symbols
Tables -- to create HTML font tables showing the fonts

Some of the directories refer to files created in the other directories, so 
you may need to do the earlier steps in order to do the latter ones.
