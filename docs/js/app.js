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

            console.log('executed 1');
        })

        .on('docs.html/{id}/here', () => {
            req('Docs');

            h.Docs({
                parent: rc.root,
                resetParent: route.reset
            });

            console.log('executed 2');
        })
        .on('docs.html/{id}/blue', () => {
            req('Docs');

            h.Docs({
                parent: rc.root,
                resetParent: route.reset
            });

            console.log('executed 2');
        })

        .on('docs.html/hello/here', () => {
            req('Docs');

            h.Docs({
                parent: rc.root,
                resetParent: route.reset
            });

            console.log('executed 2');
        })
        ;
    });
    
    route.listen();
});
