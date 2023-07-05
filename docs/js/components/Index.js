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

class Overview extends OpenScript.Component {

    render(contents, ...args) {

        let cards = [];

        each(contents, (content) => {
            cards.push(
                h.div(
                    { class: 'col-12 col-lg-4 py-3'},

                    h.div( 
                        {class: 'card shadow-sm'},

                        h.div(
                            {class: 'card-body'},

                            h.h5(
                                {class: 'card-title mb-3'},

                                h.span(
                                    {class: 'theme-icon-holder card-icon-holder me-2'},
                                    h.i(
                                        {class: `fas ${content.icon}`}
                                    )
                                ),

                                h.span(
                                    {class: 'card-title-text'},
                                    content.title
                                )
                            ),

                            h.div(
                                {class: 'card-text'},
                                content.body
                            ),

                            h.a({
                                class: 'card-link-mask',
                                href: content.link
                            })
                        )
                    )
                )
            )
        });

        return h.div(
            {class: 'row justify-content-center'},
            cards,
            ...args
        );
    }

}

class Index extends OpenScript.Component {

    async mount() {
        await super.mount();
        req('Sections.Header');
    }

    render(...args) {

        context('data').states({
            overview: []
        });

        return h.wrapper(

            h.MainHeader('index'),

            h.div(
                {
                    class: 'page-header theme-bg-dark py-5 text-center position-relative'
                },
    
                h.div(
                    {class: 'theme-bg-shapes-right'}
                ),
    
                h.div(
                    {class: 'theme-bg-shapes-left'}
                ),
    
                h.div(
                    {
                        class: 'container'
                    },
    
                    h.h1(
                        {class: 'page-heading single-col-max mx-auto'},
                        v(context('config').site, (site) => site.value.name)
                    ),
    
                    h.div(
                        {class: 'page-intro single-col-max mx-auto'},
                        v(context('config').site, (site) => site.value.description)
                    ),
    
                    h.div(
                        {class: 'main-search-box pt-3 d-block mx-auto'},
    
                        h.Search('hero')
                    )
                )
            ),

            // page content
            h.div(
                { class: "page-content"},

                h.div(
                    {class: 'container'},

                    h.div(
                        {class: 'docs-overview py-5'},
                        
                        h.Overview(context('data').overview)
                    )
                )
            ),

            // footer section
            h.section(
                {class: 'cta-section text-center py-5 theme-bg-dark position-relative'},

                h.div({class: 'theme-bg-shapes-right'}),
                h.div({class: 'theme-bg-shapes-left'}),

                h.div(
                    {class: 'container'},

                    h.h3(
                        {class: 'mb-2 text-white mb-3'},
                        v(context('config').footer, (f) => f.value.title)
                    ),

                    h.div(
                        {class: 'section-intro text-white mb-3 single-col-max mx-auto'},

                        v(
                            context('config').footer,
                            (f) => f.value.body
                        )
                    ),

                    h.div(
                        {class: 'pt-3 text-center'},

                        h.a(
                            {
                                class: 'btn btn-light',
                                href: 'https://github.com/levizwannah/OpenScript.Js',
                            },

                            'Use OpenScript.Js'
                        )
                    )
                )
            ),
            h.Footer(),
            ...args
        )
    }
}