//Ref: https://highlightjs.readthedocs.io/en/latest/index.html
//Initialise highlight js on <pre></code> blocks

h?.on('DocsSections.rerendered', () => {
    hljs.highlightAll();
    hljs.addPlugin(new CopyButtonPlugin());
})