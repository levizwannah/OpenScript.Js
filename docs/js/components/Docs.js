class DocsNav extends OpenScript.Component {

  render(data, arrangements, ...args) {
    let navItems = [];

    for( let k of arrangements){
      let section = data.value[k];
      if(!section) continue;
      
      navItems.push(
        h.li(
          {
            class:"nav-item section-title"
          },
          h.a(
            {
              class:"nav-link scrollto active", 
              link: `${section.id}`
            },
            h.span(
              {
                class:"theme-icon-holder me-2"
              },
              h.i(
                {
                  class:`fas ${section.icon}`
                }

              )
            ),
            section.title
          )
        ),
      );

      each(section.sections, (s) => {

        navItems.push(
          h.li(
            {
              class:"nav-item"
            },
            h.a(
              {
                class:"nav-link scrollto" ,
                link: `${s.id}`
              },
              s.heading
            )
          )
        );
      })
    };


    return h.nav(
      {
        id:"docs-nav", 
        class:"docs-nav navbar"
      },

      h.ul(
        {
          class:"section-items list-unstyled nav flex-column pb-3"
        },

        navItems
      ),

      ...args
    );
  }
}

class Sections extends OpenScript.Component {

  constructor(){
    super();
    this.name = 'DocsSections';
  }

  render(data, arrangements, ...args) {
    
    let sections = [];

    for( let k of arrangements){
      let section = data.value[k];
      if(!section) continue;
      
      sections.push(
        h.article(
          {
            class: 'docs-article',
            id: section.id
          },

          h.h1(
            {class: 'docs-heading'},
            section.title,
            h.span(
              {class: 'docs-time'},
              section.updated ?? ''
            ) 
          ),

          section.content,

          h.call(() => {
            let secs = [];

            each(section.sections, (s) => {

              secs.push(
                h.section(
                  {class: 'docs-section', id: s.id},

                  h.h2({class: 'section-heading'}, s.heading),
                  s.content
                )
              );
            })

            return secs;
          })
        )
      );
    }

    return h.div( {class: 'container'}, sections, ...args);
  }
}

class Docs extends OpenScript.Component {
  async mount() {
    await super.mount();
    req("Sections.Header");
  }

  render(...args) {
    fetchContext("docs", "DocsData");
    
    let docs = context('docs');

    docs.states({
      data: {},
      arrangements: []
    });

    return h.wrapper(

      h.MainHeader('docs'),

      h.div(
        {
          class:"docs-wrapper"
        },

        h.div(
          {
            id:"docs-sidebar" ,
            class:"docs-sidebar"
          },
          h.Search('docs'),
          h.DocsNav(docs.data, docs.arrangements)
        ),

        // page content to be output
        h.div(
          { class: "docs-content" },

          h.DocsSections(docs.data, docs.arrangements),
          h.Footer()
        ),
      ),
      
      ...args
    );
  }
}
