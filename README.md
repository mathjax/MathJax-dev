# MathJax v4 Developers Tools

Some developers tools for testing local MathJax v4 code base.

## General setup

To run most scripts in the tools you need to connect to your current version of
MathJax4.  To do this, `cd` to the current MathJax4 directory and do

``` shell
npm link
```

then `cd` to the MathJax-dev directory and do

``` shell
npm install
npm link mathjax-full
```

For the remainder we assume that this symlink has been set.

## Running the lab

Then run the lab by loading `v4-lab.html` in your webbrowser via a local
webserver. E.g., create a symbolic link


``` shell
sudo ln -s <MathJax-dev-PATH> /var/www/html/MathJax-dev
```

Run the lab on `localhost` using the URL

``` shell
http://localhost/MathJax-dev/v4-lab.html
```

Or, alternatively, serve directly from the directory, e.g., by running a python server:

``` shell
python -m SimpleHTTPServer 8000
```

and then run the lab at the following URL

``` shell
http://localhost:8000/v4-lab.html
```


## Running Samples

Samples are small scripts to test various MathJax features or to use MathJax
directly for a specific purpose. They are particularly useful to work with local
MathJax variants or test changes to the code base directly. Samples can be run
using `node` or in a browser.

### Running Samples in Node

Samples are run in `node` using a command

``` shell
node -r esm samples/<SCRIPT>.js <INPUT>
```

where `<SCRIPT>` is replaced by the script you want to run, and `<INPUT>` by whatever input that script may need.

As example, consider the script to parse LaTeX expressions into MathML:

``` shell
node samples/tex2mml.js 'x^2'
```

It should print the following

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

[http://localhost/MathJax-dev/load.html?samples/asciimath-document.js](http://localhost/MathJax-dev/load.html?samples/asciimath-document.js)

will give you a rendered page of AsciiMath expressions in the browser. Note,
that the output will also be displayed on the console. In fact, many scripts
will only produce console output. For example, the URL:

[http://localhost/MathJax-dev/load.html?samples/tex2mml.js&x^2](http://localhost/MathJax-dev/load.html?samples/tex2mml.js&x^2)

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
