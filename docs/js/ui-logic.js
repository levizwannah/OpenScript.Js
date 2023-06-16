ojs(async e => {
    // init components
    await require('App');

    // init contexts
    await contextProvider.put('root', 'Root');
    await contextProvider.put('config', 'Config');


    h.App({
        parent: context('root').root
    })
});

