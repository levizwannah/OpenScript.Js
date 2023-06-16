class Hero extends OpenScript.Component {
    constructor() {
        super();

        this.name = 'HeroSection';
    }

    async mount() {
        await super.mount();
        await require('SearchForm');
    }

    render(...args) {
        return h.div(
            {
                class: 'page-header theme-bg-dark py-5 text-center position-relative'
            },

            // h.div(
            //     {class: 'theme-bg-shapes-right'}
            // ),

            // h.div(
            //     {class: 'theme-bg-shapes-left'}
            // ),

            h.div(
                {
                    class: 'container'
                },

                h.h1(
                    {class: 'page-heading single-col-max mx-auto'},
                    context('config').site.name
                ),

                h.div(
                    {class: 'page-intro single-col-max mx-auto'},
                    context('config').site.description
                ),

                h.div(
                    {class: 'main-search-box pt-3 d-block mx-auto'},

                    h.Search('hero')
                )
            )
        )
    }
}