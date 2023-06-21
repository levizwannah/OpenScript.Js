class Logo extends OpenScript.Component {

    constructor() {
        super();
    }

    render(...args) {
        return h.div(
            {
                class: 'docs-logo-wrapper'
            },

            h.div(
                { class: 'site-logo' },
                h.a(
                    {
                        class: 'navbar-brand',
                        href: 'index.html'
                    },

                    h.img(
                        {
                            class: 'logo-icon me-2',
                            src: 'assets/images/coderdocs-logo.svg',
                            alt: 'OpenScript Logo',
                        }
                    ),

                    h.span(
                        { class: 'logo-text' },
                        v(context('config').logo, (state) => state.value.text)
                    ),

                    h.span(
                        { class: 'text-alt'},
                        v(context('config').logo, (state) => state.value.alt)
                    )
                )
            )
        )
    }

}