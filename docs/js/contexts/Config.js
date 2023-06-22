class Config extends OpenScript.Context {

    constructor() {
        super();

        this.socials();
        this.logoInfo();
        this.siteInfo();
        this.siteFooter();
    }

    socials() {
        this.has('socialLinks').value = [
            { link: 'https://github.com/levizwannah/openscript.js', icon: 'fa-github' }
        ];
    }

    logoInfo() {
        this.has('logo').value = {
            src: 'assets/images/coderdocs-logo.svg',
            text: 'OpenScript',
            alt: '.Js'
        }
    }

    siteInfo() {
        this.has('site').value =  {
            name: 'OpenScript.Js',
            description: 'Handling UI in an open JavaScript Environment'
        };
    }

    siteFooter() {
        this.has('footer').value = {
            title: 'Build Reactive and Well designed UIs with normal JavaScript',

            body: 'OpenScript.Js allows you to build reactive User Interfaces Using Normal, Non-bundled, Non-Modularized JavaScript. Powered by the concept of Asynchronous Rendering, Components, States, Context, and Autoloading'
        }
    }

}