# MathJax v3 Developers Tools 

Some developers tools for testing local MathJax v3 code base.

## General setup

To run most scripts in the tools you need to connect to your current version of
MathJax3.  Assuming that MathJax3 sources are at `<MJ3-PATH>` you need to link
in the JavaScript sources there:

``` shell
ln -s <MJ3-PATH> mathjax3
```
For the remainder we assume that this symlink has been set.

## Getting the Lab to work


You need to install the MathJax context menu first:

``` shell
nmp install mj-context-menu
```

Then run the lab by loading `v3-lab.html` in your webbrowser via a local
webserver. E.g., create a symbolic link 


``` shell
sudo ln -s <MathJax-dev-PATH> /var/www/html/
```

Run the lab on `localhost` using the URL

``` shell
localhost/MathJax-dev/v3-lab.html
```


## Running samples 

Samples are small scripts to test various MathJax features or to use MathJax
directly for a specific purpose. They are particularly useful to work with local
MathJax variants or test changes to the code base directly.

Samples are run using `node` and loaded using the `load.js` script. The general command is:

``` shell
node load.js samples/<SCRIPT>.js <INPUT>
```

As example consider the script to parse LaTeX expressions into MathML:

``` shell
node load.js samples/tex2mml.js x^2
```

``` html
<math display="block">
  <msup>
    <mi>x</mi>
    <mn>2</mn>
  </msup>
</math>
```

Not all sample scripts are currently working. Here is a list of working and currently unusable samples:

#### Working scripts

``` shell
samples/asciimath2mml.js
samples/asciimath-json.js
samples/notagids.js
samples/mml2html.js
samples/mml2svg.js
samples/mml-bbox.js
samples/mml-nodes.js
samples/tag-format.js
samples/tex2html.js
samples/tex2mml.js
samples/tex2svg.js
samples/tex-json.js
samples/tex-nodes.js
samples/tex-string.js
```

#### Broken scripts

``` shell
samples/asciimath2mml-component.js
samples/asciimath-document.js
samples/asyncLoad.js
samples/bits.js
samples/convert-tex2mml.js
samples/css.js
samples/find-asciimath.js
samples/find-mml.js
samples/find-strings.js
samples/find-tex-dollars.js
samples/find-tex.js
samples/html-full.js
samples/mfenced.js
samples/test-adaptor.js
samples/test-styles.js
samples/tex2mml-component.js
samples/tex2mml-require.js
samples/tex2mml-speech.js
samples/tex2svg-speech.js
samples/tex-document.js
samples/tex-multi-document.js
samples/tex-typeset.js
```


## Running TeX Parser Tests

You first need to install tape:

``` shell
nmp install tape
```

Then run tests with 

``` shell
./tests.sh
```

Tests are located in the `tests` sub-directory.
