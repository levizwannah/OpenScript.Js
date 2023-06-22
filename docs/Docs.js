class DocsApp extends OpenScript.Component{

    async mount() {
        await super.mount();
        req('Sections.Header');
        req('Sections.Hero');
        req('Overview');

        

        
    }
    render (...args){
        fetchContext('data', 'IndexData');

        context('data').states({
            overview: []
        });

        return h.wrapper(

            h.MainHeader(),

            h.HeroSection(),

            // page content to be output
            h.div(
                {class:'docs-content' }
                h.div(
                    {class:'container'}
                )  
            )
             
        )
        
    }
}