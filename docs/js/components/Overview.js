class Overview extends OpenScript.Component {

    render(contents, ...args) {
        let cards = [];

        h.each(contents, (content) => {
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

                            h.a( {
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
            cards
        );
    }

}