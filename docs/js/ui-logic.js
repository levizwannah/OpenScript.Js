ojs(async e => {

    // init components

    await require('Icons.Social');
    await require('Logo');
    await require('SocialList');
    await require('App');
    await require('SearchForm');
    await require('Sections.Header');
    await require('Sections.Hero');

    // init contexts
    await contextProvider.put('root', 'Root');
    await contextProvider.put('config', 'Config');


    h.App({
        parent: context('root').root
    })
});

