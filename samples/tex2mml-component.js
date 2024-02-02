global.MathJax = {
    loader: {
        failed: (error => console.log(`>> MathJax(${error.package || '?'}): ${error.message} ${error.stack}`)),
        load: ['adaptors/liteDOM', 'input/tex', /*'a11y/semantic-enrich'*/ '[tex]/tagFormat'],
        paths: {
            mathjax: 'mathjax-full/es5',
            sre: 'mathjax-full/js/a11y/sre-node'
        },
        source: require('mathjax-full/components/src/source.js').source,
        require: require
    },
    tex: {
        macros: {
            x: 'hi'
        },
        packages: {'[-]': ['color'], '[+]': ['tagFormat']},
        tags: 'all',
        tagFormat: {
            number: (n) => `Equation ${n}`
        }
    },
    startup: {
        typeset: false,
        ready() {
            const startup = global.MathJax.startup;
            startup.defaultReady();
            global.MathJax.tex2mmlPromise(process.argv[2] || '')
                .then((result) => console.log(result))
                .catch((err) => console.log(err.message));
        }
    }
};

//require('../components/dist/tex-chtml.js');
//require('../components/src/tex-chtml/tex-chtml.js');

//require('../components/dist/startup.js');
require('mathjax-full/components/src/startup/startup.js');

