class App extends OpenScript.Component {
    
    constructor(){
        super();            
    }

    async mount(){
        await super.mount();
        req("MainNav");
        req("Blog.List");
        req("Counter");
    }

    render(...args) {

        return h.div(
           
            h.MainNav(),

            h.div(
                { class: "container py-3" },
            
                h.header(
                    {
                        class: "mb-3"
                    },

                    h.h1("The Blog List Header"),
                    h.hr()
                ),
                
                h.div(
                    {
                        class: "card mb-3"
                    },
                    h.div({ class: 'card-header'}, 'Uses Anonymous Component' ),
                    h.div(
                        { class: "card-body "},

                        h.p(
                            { 
                                class: "card-text"
                            }, 

                            `I will not change: (`,

                            h.b(Math.floor(Math.random() * 1000)),
                            
                            `) because I am not re-rendered`,
                            
                            h.br(),

                            `I will change: (`, h.b(v(context('blogCxt').counter)), `) because I am re-rendered when the number changes. `,
                            h.b(
                                `Actually, only the number is re-rendered, not this text.`
                            )
                        )
                    )
                ),

                h.BlogCounter(context("blogCxt").counter, {
                    class: "p-1"
                }),
            
                h.BlogList(context("blogCxt").blogs, context('blogCxt').counter, "I am a blog List. I re-render when counter changes"),

                h.BlogList(context("blogCxt").blogs, { value: 0 }, 'I am the same blog list. I do not re-render when counter changes because I do not listen its changes.' )
            ),

            ...args
        );
    }
}

