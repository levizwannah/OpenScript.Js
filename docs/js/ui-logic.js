ojs(async e => {
    // init components
    await require('App');

    // init contexts
    await contextProvider.put('root', 'Root');


    h.App({
        parent: context('root').root
    })
});

