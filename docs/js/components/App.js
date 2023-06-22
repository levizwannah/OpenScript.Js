class App extends OpenScript.Component {

    async mount() {
        await super.mount();
        req('Sections.Header');
        req('Sections.Hero');
        req('Overview');
    }

    render(...args) {
        
        fetchContext('data', 'IndexData');

        context('data').states({
            overview: []
        });

        return h.wrapper(

            h.MainHeader(),

            h.HeroSection(),

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

            h.footer(
                {class: 'footer'},

                h.div(
                    {class: 'footer-bottom text-center py-5'},

                    h.small(
                        {class: 'copyright'},
                        'Designed with',
                        h.span(
                            {class: 'sr-only'},
                            'love'
                        ),

                        h.i(
                            {
                                class: 'fas fa-heart',
                                
                                style: 'color: #fb866a;'
                            },
                        ),
                        
                        ' by ',

                        h.a(
                            {
                                href: 'http://themes.3rdwavemedia.com',
                                class: 'theme-link',
                                target: '_blank'
                            },
                            'Xiaoying Riley'
                        ),

                        'for developers'
                    )
                )
            ),
            ...args
        )
    }

}