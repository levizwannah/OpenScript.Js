ojs(async e => {

    // init components
    require('App');

    // init contexts
    let rc = fetchContext('root', 'Root');
    fetchContext('config', 'Config');

    rc.root = h.dom.querySelector('#root');

    h.App({
        parent: rc.root
    })
});

