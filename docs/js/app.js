ojs(async e => {
    // init global components
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
    
    req('Index');
    req('Docs');

    route.orOn(['/', 'index.html', 'index', 'home', 'home.html'], () => {
        
        rc.root.classList.remove('docs-page');

        h.Index({
            parent: rc.root,
            resetParent: route.reset
        });
    })

    .orOn([ 'docs', 'docs.html'], () => {
        
        rc.root.classList.add('docs-page');
        h.Docs({
            parent: rc.root,
            resetParent: route.reset,
        });
    });

    route.listen();
});
