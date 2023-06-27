class Header extends OpenScript.Component {
    constructor() {
        super();

        this.name = 'MainHeader';
    }

    async mount(){
        await super.mount();
    }

    render(type) {
        return h.header(
            { class: 'header fixed-top' },

            h.div(
                { class: 'branding docs-branding' },

                h.div(
                    {class: 'container-fluid position-relative py-2'},

                    h.div(
                        {class: 'docs-logo-wrapper'},
                        (type === 'docs') ? 
                        h.button(
                            {
                                id: 'docs-sidebar-toggler',
                                class:'docs-sidebar-toggler docs-sidebar-visible me-2 d-xl-none',
                                type: 'button'
                            },
                            h.span(),
                            h.span(),
                            h.span()
                        ) : '',
                        h.Logo()
                    ),

                    h.div(
                        {
                            class: 'docs-top-utilities d-flex justify-content-end align-items-center '
                        },

                        (type === 'docs') ?
                        h.Search('nav') : '',

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