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
                        {class: 'doc-overview py-5'},
                        h.Overview(context('data').overview)
                    )
                )
            ),

            ...args
        )
    }

}