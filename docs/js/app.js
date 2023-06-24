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

    const url = new URL(window.location.href);
    let path = url.pathname.split('/');
    path = path.pop();

    switch(path) {
        case 'index.html':
            req('Index');

            h.Index({
                parent: rc.root
            });

            break;
        case 'docs.html': 
            req('Docs');

            h.Docs({
                parent: rc.root
            });

            break;
    }
    
   
});
