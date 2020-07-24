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

Create a symbolic link for the context menu. MathJax expects it to be _in parallel_ to its code.

``` sheel
ln -s node_modules/mj-context-menu
```

Then run the lab by loading `v3-lab.html` in your webbrowser via a local
webserver. E.g., create a symbolic link


``` shell
sudo ln -s <MathJax-dev-PATH> /var/www/html/
```

Run the lab on `localhost` using the URL

``` shell
http://localhost/MathJax-dev/v3-lab.html
```

Or alternatively serve directly from the directory, i.e., by running a python server:

``` shell
python -m SimpleHTTPServer 8000
```
and then run the lab at the following URL

``` shell
http://localhost:8000/v3-lab.html
```


## Running Samples

Samples are small scripts to test various MathJax features or to use MathJax
directly for a specific purpose. They are particularly useful to work with local
MathJax variants or test changes to the code base directly. Samples can be run
using `node` or in a browser.

### Running Samples in Node

Samples are run in `node` using the `esm` package on load. You need to first install `esm` by

``` shell
npm install esm
```

The general command to run scripts is then:

``` shell
node -r esm samples/<SCRIPT>.js <INPUT>
```

As example consider the script to parse LaTeX expressions into MathML:

``` shell
node -r esm samples/tex2mml.js x^2
```

``` html
<math display="block">
  <msup>
    <mi>x</mi>
    <mn>2</mn>
  </msup>
</math>
```

### Running Samples in a Browser

Samples can be run in the browser using the `load.html` page. This either loads
the `main.js` file or the particular sample file given in the parameters. For example, running

[http://localhost/v3-dev/load.html?samples/asciimath-document.js](http://localhost/v3-dev/load.html?samples/asciimath-document.js)

will give you a rendered page of AsciiMath expressions in the browser. Note,
that the output will also be displayed on the console. In fact, many scripts
will only produce console output. For example, the URL:

[http://localhost/v3-dev/load.html?samples/tex2mml.js&x^2](http://localhost/v3-dev/load.html?samples/tex2mml.js&x^2)

will print the corresponding MathML expression in the console:

``` html
<math display="block">
  <msup>
    <mi>x</mi>
    <mn>2</mn>
  </msup>
</math>
```


### Scripts

Sample names should be self-explanatory.

``` shell
samples/asciimath-document.js
samples/asciimath-json.js
samples/asciimath2mml-component.js
samples/asciimath2mml.js
samples/asyncLoad.js
samples/bits.js
samples/css.js
samples/find-asciimath.js
samples/find-mml.js
samples/find-strings.js
samples/find-tex-dollars.js
samples/find-tex.js
samples/html-full.js
samples/mfenced.js
samples/mml-bbox.js
samples/mml-nodes.js
samples/mml2html.js
samples/mml2svg.js
samples/notagids.js
samples/tag-format.js
samples/tex-document.js
samples/tex-json.js
samples/tex-multi-document.js
samples/tex-nodes.js
samples/tex-string.js
samples/tex2html.js
samples/tex2mml-component.js
samples/tex2mml-require.js
samples/tex2mml-speech.js
samples/tex2mml.js
samples/tex2svg-speech.js
samples/tex2svg.js
```

The following two scripts need `jsdom` package for testing:

``` shell
samples/test-adaptor.js
samples/test-styles.js
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
