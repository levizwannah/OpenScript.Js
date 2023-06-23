ojs(async e => {
    
    // init components
    req('Index');

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

    h.Index({
        parent: rc.root
    });
   
});
