class Logo extends OpenScript.Component {

    constructor() {
        super();
    }

    goHome(){
        route.to('index.html');
    }

    render(...args) {
        return h.div(
            { class: 'site-logo' },
            h.span(
                {
                    class: 'navbar-brand',
                    onclick: h.func(this, 'goHome')
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
        super('Search');
    }

    render(type, ...args) {
        switch(type) {
            case 'hero': return this.hero(...args);

            case 'nav': return this.nav(...args);

            case 'docs': return this.docs(...args);

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

    nav(...args) {
        return h.div(
            {
                class: 'top-search-box d-none d-lg-flex'
            },
            h.form(
                {class: 'search-form'},

                h.input(
                    {
                        type: 'text',
                        placeholder: 'Search the docs...',
                        name: 'search',
                        class: 'form-control search-input'
                    }
                ),

                h.button(
                    {
                        type: 'submit',
                        class: 'btn search-btn',
                        value: 'Search',
                    },

                    h.i({class: 'fas fa-search'})
                )
            ),
            ...args
        )
    }

    docs(...args) {
        return h.div(
            {
              class:"top-search-box d-lg-none p-3"
            },
            h.form(
              {
                class:"search-form"
              },
              h.input(
                {
                  type:"text",
                  placeholder:"Search the docs...", 
                  name:"search" ,
                  class:"form-control search-input"
                }
              ),
              h.button(
                {
                  type:"submit", 
                  class:"btn search-btn", 
                  value:"Search"
                },
                h.i(
                  {
                    class:"fas fa-search"
                  }
                )
              )
            ),
        );
    }
}

class Footer extends OpenScript.Component {
    render(...args) {
        return h.footer(
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

                    ' for developers'
                )
            ),
            ...args
        );
    }
}
