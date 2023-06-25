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
                            src: route.baseUrl('/docs/assets/images/coderdocs-logo.svg'),
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

class SocialList extends OpenScript.Component {

    async mount() {
        await super.mount();
        req('Groups.Icons');
    }


    render(arr, ...args) {
        let listItems = [];

        for(let obj of arr) {
            listItems.push(
                h.li(
                    { class: 'list-inline-item'},
                    h.SocialIcon(obj.link, obj.icon)
                )
            )
        }

        return h.ul(
            { class: 'social-list list-inline mx-md-3 mx-lg-5 mb-0 d-none d-lg-flex'},
            listItems,
            ...args
        )
    }

}

class SearchForm extends OpenScript.Component {
    constructor() {
        super();

        this.name = 'Search';
    }

    render(type, ...args) {
        switch(type) {
            case 'hero': return this.hero(...args);

            default: return this.hero(...args);
        }
    }

    hero(...args) {
        return h.form(
            {class: 'search-form w-100'},

            h.input( {
                type: 'text',
                placeholder: 'Search the docs...',
                class: 'form-control search-input underlined input-data'
            }),

            h.button(
                {
                    type: 'submit',
                    class: 'btn search-btn',
                    value: 's'
                },

                h.i(
                    {class: 'fas fa-search'}
                )
            ),

            ...args
        )
    }

}
