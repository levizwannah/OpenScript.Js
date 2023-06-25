ojs(async e => {

    // init contexts
    let rc = fetchContext('root', 'Root');
    let cc = fetchContext('config', 'Config');
    
    cc.states({
        logo: {},
        socialLinks: {},
        site: {},
        footer: {}
    });

    rc.root = h.dom.querySelector('#root');

    route.prefix('docs').group(_e => {
        
        route.on('index.html', () => {
            req('Index');

            h.Index({
                parent: rc.root,
                resetParent: route.reset
            });
        })

        .on('docs.html', () => {
            req('Docs');

            h.Docs({
                parent: rc.root,
                resetParent: route.reset
            });
        });
    });
    
    route.listen();
});
