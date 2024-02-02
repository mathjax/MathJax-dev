global.MathJax = {
    loader: {
        failed: (error => console.log(`>> MathJax(${error.package || '?'}): ${error.message} ${error.stack}`)),
        load: ['adaptors/liteDOM', 'input/asciimath'],
        paths: {
            mathjax: 'mathjax-full/components/dist',
//            mathjax: './components/dist',
            sre: 'mathjax-full/js/a11y/sre-node'
        },
        source: require('mathjax-full/components/src/source.js').source,
//        require: (url) => System.import(url)
        require: require
    },
    startup: {
        typeset: false,
        pageReady() {
            MathJax.asciimath2mmlPromise(process.argv[2] || '')
                .then((result) => console.log(result))
                .catch((err) => console.log(err.message));
        }
    }
};

//require('../components/dist/tex-chtml.js');
//require('../components/src/tex-chtml/tex-chtml.js');

//require('../components/dist/startup.js');
require('mathjax-full/components/src/startup/startup.js');

