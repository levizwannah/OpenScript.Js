ojs(async e => {
    // init global components
    req('Groups.Common');
    req('Groups.Common');

    // init contexts
    let rc = fetchContext(['root', 'data', 'config'], 'Groups.UrgentContexts').get('root');
    let cc = context('config');
    
    cc.states({
        logo: {},
        socialLinks: {},
        site: {},
        footer: {}
    });

    rc.root = h.dom.querySelector('#root');

    route.orOn(['/', 'index.html'], () => {
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
    
    route.listen();
});
