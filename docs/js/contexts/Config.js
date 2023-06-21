class Config extends OpenScript.Context {

    constructor() {
        super();

        this.socials();
        this.logoInfo();
        this.siteInfo();
    }

    socials() {
        this.socialLinks.value = [
            { link: 'https://github.com/levizwannah/openscript.js', icon: 'fa-github' }
        ];
    }

    logoInfo() {
        this.logo.value = {
            src: 'assets/images/coderdocs-logo.svg',
            text: 'OpenScript',
            alt: '.Js'
        }
    }

    siteInfo() {
        this.site.value =  {
            name: 'OpenScript.Js',
            description: 'Handling UI in an open JavaScript Environment'
        };
    }

}