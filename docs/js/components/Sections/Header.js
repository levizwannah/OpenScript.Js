class Header extends OpenScript.Component {
    constructor() {
        super();

        this.name = 'MainHeader';
    }

    async mount(){
        await super.mount();
        req('Logo');
        req('SocialList');
    }

    render() {
        return h.header(
            { class: 'header fixed-top' },

            h.div(
                { class: 'branding docs-branding' },
                

                h.div(
                    {class: 'container-fluid position-relative py-2'},

                    h.div(
                        {class: 'docs-logo-wrapper'},
                        h.Logo()
                    ),

                    h.div(
                        {
                            class: 'docs-top-utilities d-flex justify-content-end align-items-center'
                        },
        
                        h.SocialList(context('config').socialLinks),

                        h.a(
                            { class: 'btn btn-primary d-none d-lg-flex'},
                            'Use It',

                            { href: 'https://github.com/levizwannah/openscript.js' }
                        )
                    )
                )
            )
        )
    }
}