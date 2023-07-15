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

  onRerendered(...args) {

    const sidebarLinks = document.querySelectorAll("#docs-sidebar .scrollto");
    const sidebar = document.getElementById("docs-sidebar");

    sidebarLinks.forEach((sidebarLink) => {
      sidebarLink.addEventListener("click", (e) => {
        let target = sidebarLink.getAttribute("link");

        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });

        //Collapse sidebar after clicking
        if (
          sidebar.classList.contains("sidebar-visible") &&
          window.innerWidth < 1200
        ) {
          sidebar.classList.remove("sidebar-visible");
          sidebar.classList.add("sidebar-hidden");
        }
      });
    });

    try{
      /* ===== Gumshoe SrollSpy ===== */
      /* Ref: https://github.com/cferdinandi/gumshoe  */
      // Initialize Gumshoe
      window.spy = new Gumshoe("#docs-nav a", {
        offset: 69, //sticky header height
      });
    }
    catch(e){}
  }

  onRendered(comp, ev, ...args) {
    console.log('docs rendered');
  }
}

class Sections extends OpenScript.Component {

  constructor(){
    super();
    this.name = 'DocsSections';
  }

  onRerendered(...args) {
    document.getElementById(route.qs.get('id'))?.scrollIntoView({ behavior: "smooth" });
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
    req("Groups.Markup");
  }

  responsiveSidebar() {
  
    let sidebar = document.getElementById("docs-sidebar");
  
    let w = window.innerWidth;
    if (w >= 1200) {
      // if larger
      console.log("larger");
      sidebar.classList.remove("sidebar-hidden");
      sidebar.classList.add("sidebar-visible");
    } else {
      // if smaller
      console.log("smaller");
      sidebar.classList.remove("sidebar-visible");
      sidebar.classList.add("sidebar-hidden");
    }
  }

  onBound(component){
    this.responsiveSidebar();

    window.onresize = function () {
      component.responsiveSidebar();
    };
  
    window.addEventListener('popstate', function() {
      component.responsiveSidebar();
    });
  }

  render(...args) {
    fetchContext("docs", "DocsData");
    
    let docs = context('docs');

    docs.states({
      data: {},
      arrangements: []
    });

    return [

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
      )
    ];
  }
}
