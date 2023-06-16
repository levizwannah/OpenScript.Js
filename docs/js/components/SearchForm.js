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
            {class: 'main-search-form w-100'},

            h.input( {
                type: 'text',
                placeholder: 'Search the docs...',
                class: 'form-control search-input'
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