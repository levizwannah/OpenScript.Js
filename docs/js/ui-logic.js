ojs(async e => {
    
    // init components
    req('App');

    // init contexts
    let rc = fetchContext('root', 'Root');
    let cc = fetchContext('config', 'Config');

    cc.states({
        logo: {},
        socialLinks: {},
        site: {}
    });

    rc.root = h.dom.querySelector('#root');

    h.App({
        parent: rc.root
    });
   
});
