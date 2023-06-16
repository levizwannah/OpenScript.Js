class Config extends OpenScript.Context {

    constructor() {
        super();

        this.socialLinks();
        this.logoInfo();
        this.siteInfo();
    }

    socialLinks() {
        this.put('socialLinks',[
            { link: 'https://github.com/levizwannah/openscript.js', icon: 'fa-github' }
        ])
    }

    logoInfo() {
        this.put('logoSrc', 'assets/images/coderdocs-logo.svg');
        this.put('logoText', 'OpenScript');
        this.put('logoAlt', '.Js');
    }

    siteInfo() {
        this.put('site', {
            name: 'OpenScript.Js',
            description: 'Handling UI in an open JavaScript Environment'
        });
    }

}