class Root extends OpenScript.Context {

    constructor() {
        super();
    }

}

class IndexData extends OpenScript.Context {
    constructor() {
        super();

        this.setOverview();
    }

    setOverview(){

        this.has('overview').value = [

            {
                icon: 'fa-map-signs',
                title: 'Introduction',
                body: 'Know what OpenScript.Js is, when to use it, and all the core concepts that powers it.',
                link: 'docs-page.html#ojs-introduction'
            },

            {
                icon: 'fa-arrow-down',
                title: 'Installation',
                body: 'Easily add OpenScript to your project and start making reactive UIs all with the familiar JavaScript you know. Nothing Fancy!',
                link: 'docs-page.html#ojs-installation'
            },

            {
                icon: 'fa-person-walking',
                title: 'Getting Started',
                body: 'Know the simple concept of JS-Markup, the router, components, contexts, states, autoloading, and namespacing. Again, sounds fancy, but are not...',
                link: 'docs-page.html#ojs-getting-started'
            },

            {
                icon: 'fa-pen',
                title: 'Using OpenScript',
                body: 'Putting all the concepts together to give you a comprehensive walkthrough of OpenScript.Js. Know the APIs, guidelines, and best practices.',
                link: 'docs-page.html#ojs-using-openscript'
            },
            
            {
                icon: 'fa-code',
                title: 'OJS - Markup',
                body: '(Deep dive) Understand how the OpenScript.Js markup engine works.',
                link: 'docs-page.html#ojs-design-markup'
            },

            {
                icon: 'fa-route',
                title: 'OJS - Router',
                body: '(Deep dive) Understand how the Router for OJS was designed',
                link: 'docs-page.html#ojs-design-router'
            },

            {
                icon: 'fa-box',
                title: 'OJS - Components',
                body: '(Deep dive) Understand the concept of components including asynchronous and synchronous rendering, mounting & binding, event emission, context usages, state reaction, etc... + performance tips!',
                link: 'docs-page.html#ojs-design-components'
            },

            {
                icon: 'fa-database',
                title: 'OJS - States',
                body: '(Deep dive) Learn the underlying infrastructure of states in OJS and why they cause reaction.',
                link: 'docs-page.html#ojs-design-states'
            },

            {
                icon: 'fa-globe',
                title: 'OJS - Contexts',
                body: '(Deep dive) We use contexts to pass data around. Learn how contexts are created, the concept of volatile and non-volatile context, temporary contexts and reconciliation, data transmission and the underlying context provider object.',
                link: 'docs-page.html#ojs-design-contexts'
            },

            {
                icon: 'fa-wand-magic-sparkles',
                title: 'OJS - Autoloading',
                body: '(Deep dive) Remember we are in a non-modularized and unbundled JavaScript environment, and we need to load our JS files from other JS files during runtime. Learn how that was done. Also, learn the automatic namespacing.',
                link: 'docs-page.html#ojs-design-autoloading'
            },

            {
                icon: 'fa-scroll',
                title: 'OpenScript.Js Full Code',
                body: 'Here is all of OpenScript.Js code put together in the OpenScript Namespace. You can copy and paste it. (Consistent with the updated versions)',
                link: 'docs-page.html#ojs-full-code'
            }
        ]
    }
}

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