class Docs extends OpenScript.Component {
  async mount() {
    await super.mount();
    req("Sections.Header");
  }

  render(...args) {
    fetchContext("docs", "DocsData");

    context("docs").states({
      overview: [],
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
          h.div(
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

          ),
          h.nav(
            {
              id:"docs-nav", 
              class:"docs-nav navbar"
            },
            h.ul(
              {
                class:"section-items list-unstyled nav flex-column pb-3"
              },
              h.li(
                {
                  class:"nav-item section-title"
                },
                h.a(
                  {
                    class:"nav-link scrollto active", 
                    href:"#section-1"
                  },
                  h.span(
                    {
                      class:"theme-icon-holder me-2"
                    },
                    h.i(
                      {
                        class:"fas fa-map-signs"
                      }

                    )
                  ),
                  'Introduction'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#item-1-1"
                  },
                  'Section Item 1.1'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#item-1-2"
                  },
                  'Section Item 1.2'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#item-1-3"
                  },
                  'Section Item 1.3'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#item-1-4"
                  },
                  'Section Item 1.4'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#item-1-5"
                  },
                  'Section Item 1.5'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#item-1-6"
                  },
                  'Section Item 1.6'
                )
              ),
              h.li(
                {
                  class:"nav-item section-title mt-3"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#section-2"
                  },
                  h.span(
                    {
                      class:"theme-icon-holder me-2"
                    },
                    h.i(
                      {
                        class:"fas fa-arrow-down"
                      }
                    )
                  ),
                  'Installation'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-2-1"
                  },
                  'Section Item 2.1'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-2-2"
                  },
                  'Section Item 2.2'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-2-3"
                  },
                  'Section Item 2.3'
                )
              ),
              h.li(
                {
                  class:"nav-item section-title mt-3"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#section-3"
                  },
                  h.span(
                    {
                      class:"theme-icon-holder me-2"
                    },
                    h.i(
                      {
                        class:"fas fa-box"
                      }
                    )
                  ),
                  'APIs'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-3-1"
                  },
                  'Section Item 3.1'
                )


              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-3-2"
                  },
                  'Section Item 3.2'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-3-3"
                  },
                  'Section Item 3.3'
                )
              ),
              h.li(
                {
                  class:"nav-item section-title mt-3"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#section-4"
                  },
                  h.span(
                    {
                      class:"theme-icon-holder me-2"
                    },
                    h.i(
                      {
                        class:"fas fa-cogs"
                      }
                    )
                  ),
                  'Intergration'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-4-1"
                  },
                  'Section Item 4.1'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-4-2"
                  },
                  'Section Item 4.2'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-4-3"
                  },
                  'Section Item 4.3'
                )
              ),
              h.li(
                {
                  class:"nav-item section-title mt-3"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#section-5"
                  },
                  h.span(
                    {
                      class:"theme-icon-holder me-2"
                    },
                    h.i(
                      {
                        class:"fas fa-tools"
                      }
                    )
                  ),
                  'Utitlities'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-5-1"
                  },
                  'Section Item 5.1'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-5-2"
                  },
                  'Section Item 5.2'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-5-3"
                  },
                  'Section Item 5.3'
                )
              ),
              h.li(
                {
                  class:"nav-item section-title mt-3"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#section-6"
                  },
                  h.span(
                    {
                      class:"theme-icon-holder me-2"
                    },
                    h.i(
                      {
                        class:"fas fa-laptop-code"
                      }
                    )
                  ),
                  'Web'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-6-1"
                  },
                  'Section Item 6.1'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-6-2"
                  },
                  'Section Item 6.2'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-6-3"
                  },
                  'Section Item 6.3'
                )
              ),
              h.li(
                {
                  class:"nav-item section-title mt-3"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#section-7"
                  },
                  h.span(
                    {
                      class:"theme-icon-holder me-2"
                    },
                    h.i(
                      {
                        class:"fas fa-tablet-alt"
                      }
                    )
                  ),
                  'Moblile'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-7-1"
                  },
                  'Section Item 7.1'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-7-2"
                  },
                  'Section Item 7.2'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-7-3"
                  },
                  'Section Item 7.3'
                )
              ),
              h.li(
                {
                  class:"nav-item section-title mt-3"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#section-8"
                  },
                  h.span(
                    {
                      class:"theme-icon-holder me-2"
                    },
                    h.i(
                      {
                        class:"fas fa-book-reader"
                      }
                    )
                  ),
                  'Resources'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-8-1"
                  },
                  'Section Item 8.1'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-8-2"
                  },
                  'Section Item 8.2'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-8-3"
                  },
                  'Section Item 8.3'
                )
              ),
              h.li(
                {
                  class:"nav-item section-title mt-3"
                },
                h.a(
                  {
                    class:"nav-link scrollto" ,
                    href:"#section-9"
                  },
                  h.span(
                    {
                      class:"theme-icon-holder me-2"
                    },
                    h.i(
                      {
                        class:"fas fa-lightbulb"
                      }
                    )
                  ),
                  'FAQs'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-9-1"
                  },
                  'Section Item 9.1'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-9-2"
                  },
                  'Section Item 9.2'
                )
              ),
              h.li(
                {
                  class:"nav-item"
                },
                h.a(
                  {
                    class:"nav-link scrollto",
                    href:"#item-9-3"
                  },
                  'Section Item 9.3'
                )
              ),




        )
        )
      ),

      // page content to be output
      h.div(
        { class: "docs-content" },

        h.div(
          { class: "container" },

          h.article(
            {
              class: "docs-article",
              id: "section-1",
            },

            h.h1(
              {class: 'docs-heading'}, 
              'Introduction',
              h.span({class: 'docs-time'}, 'Last Updated: 2019-06-01')
            ),

            h.section(
              h.p(
                "Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio."
              )
            )
          )
        )
      ),
      

      h.h5("Github Code Example:"),

      h.p(
        "you can",
        h.a({
          class: "theme-link",
          href: "https://gist.github.com/",
          target: "_blank",
        }),
        "embed your code snippets using Github gists"
      ),

      h.div({ class: "docs-code-block" }),
      h.h5("Highlight.js Example:"),
      h.p(
        "you can",
        h.a(
          {
            class: "theme-link",
            href: "https://github.com/highlightjs/highlight.js",
            target: "_blank",
          },
          "embed your code snippets using highlight.js"
        ),
        "It supports ",
        h.a(
          {
            class: "theme-link",
            href: "https://highlightjs.org/static/demo/",
            target: "_blank",
          },
          "185 languages and 89 styles"
        )
      ),
      h.p(
        "This template uses",
        h.a(
          {
            class: "theme-link",
            href: "https://highlightjs.org/static/demo/",
            target: "_blank",
          },
          "Atom One Dark"
        ),
        "style for the code blocks:",
        h.br(
          h.code(
            "&#x3C;link rel=&#x22;stylesheet&#x22; href=&#x22;//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.2/styles/atom-one-dark.min.css&#x22;&#x3E;"
          )
        )
      ),
      h.div(
        { class: "docs-code-block" },
        h.pre(
          { class: "shadow-lg rounded" },
          h.code(
            { class: "json hljs" },

            h.span({ class: "hljs-attr" }, "title"),
            ":",
            h.span({ class: "hljs-string" }, "apples"),
            h.span({ class: "hljs-attr" }, "count"),
            ":",
            [
              h.span({ class: "hljs-number" }, 12000),
              h.span({ class: "hljs-number" }, 20000),
            ],
            h.span({ class: "hljs-number" }, "description"),
            ":",

            h.span({ class: "hljs-number" }, "text"),
            ":",
            h.span({ class: "hljs-string" }, "...."),
            ",",
            h.span({ class: "hljs-attr" }, "sensitive"),
            ":",
            h.span({ class: "hljs-literal" }, "false"),
            { class: "json hljs" },

            h.span({ class: "hljs-attr" }, "title"),
            ":",
            h.span({ class: "hljs-string" }, "oranges"),
            h.span({ class: "hljs-attr" }, "count"),
            ":",
            [
              h.span({ class: "hljs-number" }, 17500),
              h.span({ class: "hljs-number" }, "null"),
            ],
            h.span({ class: "hljs-number" }, "description"),
            ":",

            h.span({ class: "hljs-number" }, "text"),
            ":",
            h.span({ class: "hljs-string" }, "...."),
            ",",
            h.span({ class: "hljs-attr" }, "sensitive"),
            ":",
            h.span({ class: "hljs-literal" }, "false")
          )
        )
      ),
      h.section(
        { class: "docs-section", id: "item-1-1" },
        h.h2({ class: "section-heading" }, "Section item 1.1"),
        h.p(
          "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id."
        ),
        h.p("code example :", h.code("npm install &lt;package&gt;")),
        h.h5("Unordered List Examples:"),
        h.ul(
          h.li(
            h.strong({ class: "me-1" }, "HTML 5"),
            h.code('&lt;div id="foo"&gt;')
          ),
          h.li(
            h.strong({ class: "me-1" }, "CSS"),
            h.code("#foo { color: red }")
          ),
          h.li(
            h.strong({ class: "me-1" }, "JavaScript"),
            h.code("console.log(&#x27;#foo\bar&#x27;);")
          ),
          h.h5("Ordered List Examples:"),
          h.ol(
            h.li("Download lorem ipsum dolor sit amet."),
            h.li("Click ipsum faucibus venenatis."),
            h.li("Configure fermentum malesuada nunc."),
            h.li("Deploy donec non ante libero.")
          ),
          h.h5("Callout Examples:"),
          h.div(
            { class: "callout-block callout-block-info" },
            h.div(
              { class: "content" },
              h.h4(
                { class: "callout-title" },
                h.span(
                  { class: "callout-icon-holder me-1" },
                  h.i({ class: "fas fa-info-circle" })
                ),
                "Note"
              ),
              h.p(
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
                h.code("&lt;code&gt;"),
                ", Nemo enim ipsam voluptatem quia voluptas",
                h.a({ href: "#" }, "link example"),
                "sit aspernatur aut odit aut fugit."
              )
            )
          ),
          h.div(
            { class: "callout-block callout-block-warning" },
            h.div(
              { class: "content" },
              h.h4(
                { class: "callout-title" },
                h.span(
                  { class: "callout-icon-holder me-1" },
                  h.i({ class: "fas fa-bullhorn" })
                ),
                "warning"
              ),
              h.p(
                "Nunc hendrerit odio quis dignissim efficitur. Proin ut finibus libero. Morbi posuere fringilla felis eget sagittis. Fusce sem orci, cursus in tortor",
                h.a({ href: "#" }, "link example"),
                "tellus vel diam viverra elementum."
              )
            )
          ),
          h.div(
            { class: "callout-block callout-block-warning" },
            h.div(
              { class: "callout-block" },
              h.h4(
                { class: "callout-title" },
                h.span(
                  { class: "callout-icon-holder me-1" },
                  h.i({ class: "fas fa-bullhorn" })
                ),
                "warning"
              ),
              h.p(
                "Nunc hendrerit odio quis dignissim efficitur. Proin ut finibus libero. Morbi posuere fringilla felis eget sagittis. Fusce sem orci, cursus in tortor ",
                h.a({ href: "#" }, "Link example"),
                "tellus vel diam viverra elementum."
              )
            )
          ),
          h.h5({ class: "mt-5" }, "Alert Example"),
          h.div(
            { class: "alert alert-primary", role: "alert" },
            "This is a primary alert—check it out!"
          ),
          h.div(
            { class: "alert alert-secondary", role: "alert" },
            "This is a secondary alert—check it out!"
          ),
          h.div(
            { class: "alert alert-success", role: "alert" },
            " This is a success alert—check it out!"
          ),
          h.div(
            { class: "alert alert-danger", role: "alert" },
            "  This is a danger alert—check it out!"
          ),
          h.div(
            { class: "alert alert-warning", role: "alert" },
            " This is a warning alert—check it out!"
          ),
          h.div(
            { class: "alert alert-info", role: "alert" },
            " This is a info alert—check it out!"
          ),
          h.div(
            { class: "alert alert-light", role: "alert" },
            "  This is a light alert—check it out!"
          ),
          h.div(
            { class: "alert alert-dark", role: "alert" },
            " This is a dark alert—check it out!"
          )
        ),
        h.section(
          { class: "docs-section", id: "item-1-2" },
          h.h2({ class: "section-heading" }, "Section 1.2"),
          h.p(
            "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
          ),
          h.h5({ class: "mt-5" }, "lightbox example"),
          h.p(
            "The example below uses the",
            h.i({ class: "fas fa-external-link-alt" }),
            h.a(
              {
                class: "theme-link",
                href: "https://github.com/andreknieriem/simplelightbox",
                target: "_blank",
              },
              "simplelightbox plugin"
            )
          ),
          h.div(
            { class: "simplelightbox-gallery row mb-3" },
            h.div(
              { class: "col-12 col-md-4 mb-3" },
              h.a(
                { href: "assets/images/coderpro-home.png" },
                h.img({
                  class: "figure-img img-fluid shadow rounded",
                  src: "assets/images/coderpro-home-thumb.png",
                  alt: "",
                  title: "CoderPro Home Page",
                })
              )
            ),
            h.div(
              { class: "col-12 col-md-4 mb-3" },
              h.a(
                { href: "assets/images/coderpro-features.png" },
                h.img({
                  class: "figure-img img-fluid shadow rounded",
                  src: "assets/images/coderpro-features-thumb.png",
                  alt: "",

                  title: "CoderPro Features Page",
                })
              )
            ),
            h.div(
              { class: "col-12 col-md-4 mb-3" },
              h.a(
                { href: "assets/images/coderpro-pricing.png" },
                h.img({
                  class: "figure-img img-fluid shadow rounded",
                  src: "assets/images/coderpro-pricing-thumb.png",
                  alt: "",
                  title: "CoderPro Pricing Page",
                })
              )
            )
          ),
          h.h5("Custom Table:"),
          h.div(
            { class: "table-responsive my-4" },
            h.table(
              { class: "table table-bordered" },
              h.tbody(
                h.tr(
                  h.th(
                    { class: "theme-bg-light" },
                    h.a({ class: "theme-link", href: "#" }, "Option 1")
                  ),
                  h.td(
                    "Option 1 desc lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  )
                ),
                h.tr(
                  h.th(
                    { class: "theme-bg-light" },
                    h.a({ class: "theme-link", href: "#" }, "Option 2")
                  ),
                  h.td(
                    "Option 2 desc lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  )
                ),
                h.tr(
                  h.th(
                    { class: "theme-bg-light" },
                    h.a({ class: "theme-link", href: "#" }, "Option 3")
                  ),
                  h.td(
                    "Option 3 desc lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  )
                ),
                h.tr(
                  h.th(
                    { class: "theme-bg-light" },
                    h.a({ class: "theme-link", href: "#" }, "Option 4")
                  ),
                  h.td(
                    "Option 4 desc lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  )
                )
              )
            )
          ),
          h.h5("Stripped table"),
          h.div(
            { class: "table-responsive my-4" },
            h.table(
              { class: "table table-striped" },
              h.thread(
                h.tr(
                  h.th({ scope: "col" }, "#"),
                  h.th({ scope: "col" }, "First"),
                  h.th({ scope: "col" }, "Last"),
                  h.th({ scope: "col" }, "Handle")
                )
              ),
              h.tbody(
                h.tr(
                  h.th({ scope: "row" }, "1"),
                  h.td("Mark"),
                  h.td("Otto"),
                  h.td("@mdo")
                ),
                h.tr(
                  h.th({ scope: "row" }, "2"),
                  h.td("Mark"),
                  h.td("Otto"),
                  h.td("@mdo")
                ),
                h.tr(
                  h.th({ scope: "row" }, "2"),
                  h.td("Mark"),
                  h.td("Otto"),
                  h.td("@mdo")
                )
              )
            )
          ),
          h.h5("Boardered dark table"),
          h.div(
            { class: "table-responsive my-4" },
            h.table(
              { class: "table table-bordered table-dark" },
              h.thread(
                h.tr(
                  h.th({ scope: "row" }, "#"),
                  h.th({ scope: "row" }, "First"),
                  h.th({ scope: "row" }, "Last"),
                  h.th({ scope: "row" }, "Handle")
                )
              ),
              h.tbody(
                h.tr(
                  h.th({ scope: "row" }, 1),
                  h.td("Mark"),
                  h.td("otto"),
                  h.td("@mdo")
                ),
                h.tr(
                  h.th({ scope: "row" }, 2),
                  h.td("Mark"),
                  h.td("otto"),
                  h.td("@mdo")
                ),
                h.tr(
                  h.th({ scope: "row" }, 3),
                  h.td("Mark"),
                  h.td("otto"),
                  h.td("@mdo")
                )
              )
            )
          )
        ),
        h.section(
          { class: "docs-section", id: "item-1-3" },
          h.h2({ class: "section-heading" }, "Section item 1.3"),
          h.p(
            "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
          ),
          h.h5("Badges Examples:"),
          h.div(
            { class: "my-4" },
            h.span({ class: "badge badge-primary" }, "Primary"),
            h.span(
              {
                class: "badge badge-secondary",
              },
              "Secondary"
            ),
            h.span(
              {
                class: "badge badge-success",
              },
              "Success"
            ),
            h.span(
              {
                class: "badge badge-danger",
              },
              "Danger"
            ),
            h.span(
              {
                class: "badge badge-warning",
              },
              "Warning"
            ),
            h.span(
              {
                class: "badge badge-info",
              },
              "Info"
            ),
            h.span(
              {
                class: "badge badge-light",
              },
              "Light"
            ),
            h.span(
              {
                class: "badge badge-dark",
              },
              "dark"
            )
          ),
          h.h5("Button Examples:"),
          h.div(
            { class: "row my-3" },
            h.div(
              {
                class: "col-md-6 col-12",
              },
              h.ul(
                {
                  class: "list list-unstyled pl-0",
                },
                h.li(
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-primary",
                    },
                    "Primary Button"
                  ),
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-secondary",
                    },
                    "Secondary Button"
                  ),
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-Light",
                    },
                    "Light Button"
                  ),
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-Success",
                    },
                    "Success Button"
                  ),
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-info",
                    },
                    "Info Button"
                  ),
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-Warning",
                    },
                    "Warning Button"
                  ),
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-danger",
                    },
                    "Danger Button"
                  )
                )
              )
            ),
            h.div(
              {
                class: "col-md-6 col-12",
              },
              h.ul(
                {
                  class: "list list-unstyled pl-0",
                },
                h.li(
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-primary",
                    },
                    h.i({
                      class: "fas fa-download me-2",
                    }),
                    "Download now"
                  )
                ),
                h.li(
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-secondary",
                    },
                    h.i({
                      class: "fas fa-book me-2",
                    }),
                    "View docs"
                  )
                ),
                h.li(
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-light",
                    },
                    h.i({
                      class: "fas fa-arrow-alt-circle-right me-2",
                    }),
                    "View Features"
                  )
                ),
                h.li(
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-info",
                    },
                    h.i({
                      class: "fas fa-play-circle me-2",
                    }),
                    "Find out now"
                  )
                ),
                h.li(
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-warning",
                    },
                    h.i({
                      class: "fas fa-bug me-2",
                    }),
                    "Report Bugs"
                  )
                ),
                h.li(
                  h.a(
                    {
                      href: "#",
                      class: "btn btn-danger",
                    },
                    h.i({
                      class: "fas fa-exclamation-circle me-2",
                    }),
                    "Submit issues"
                  )
                )
              )
            )
          ),
          h.h5("Progress Examples:"),
          h.div(
            {
              class: "my-4",
            },
            h.div(
              {
                class: "progress my-4",
              },
              h.div({
                class: "progress-bar bg-success",
                role: "progressbar",
                style: "width: 25%",
                aria_valuenow: "25",
                aria_valuemin: "0",
                aria_valuemax: "100",
              })
            ),
            h.div(
              {
                class: "progress my-4",
              },
              h.div({
                class: "progress-bar bg-info",
                role: "progressbar",
                style: "width: 50%",
                aria_valuenow: "50",
                aria_valuemin: "0",
                aria_valuemax: "100",
              })
            ),
            h.div(
              {
                class: "progress my-4",
              },
              h.div({
                class: "progress-bar bg-warning",
                role: "progressbar",
                style: "width: 75%",
                aria_valuenow: "75",
                aria_valuemin: "0",
                aria_valuemax: "100",
              })
            ),
            h.div(
              {
                class: "progress my-4",
              },
              h.div({
                class: "progress-bar bg-danger",
                role: "progressbar",
                style: "width: 100%",
                aria_valuenow: "100",
                aria_valuemin: "0",
                aria_valuemax: "100",
              })
            )
          )
        ),
        h.section(
          {
            class: "docs-section",
            id: "item-1-4",
          },
          h.h2(
            {
              class: "section-heading",
            },
            "Section item 1.4"
          ),
          h.p(
            "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
          ),
          h.h5("Pagination Example:"),
          h.nav(
            {
              aria_label: "Page navigation example",
            },
            h.ul(
              {
                class: "pagination pl-0",
              },
              h.li(
                {
                  class: "page-item disabled",
                },
                h.a(
                  {
                    class: "page-link",
                    href: "#",
                  },
                  "Previous"
                )
              ),
              h.li(
                {
                  class: "page-item active",
                },
                h.a(
                  {
                    class: "page-link",
                    href: "#",
                  },
                  1
                )
              ),
              h.li(
                {
                  class: "page-item",
                },
                h.a(
                  {
                    class: "page-link",
                    href: "#",
                  },
                  2
                )
              ),
              h.li(
                {
                  class: "page-item ",
                },
                h.a(
                  {
                    class: "page-link",
                    href: "#",
                  },
                  3
                )
              ),
              h.li(
                {
                  class: "page-item ",
                },
                h.a(
                  {
                    class: "page-link",
                    href: "#",
                  },
                  "Next"
                )
              )
            )
          ),
          h.p(
            "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
          )
        ),
        h.section(
          {
            class: "docs-section",
            id: "item-1-6",
          },
          h.h2(
            {
              class: "section-heading",
            },
            "Section Item 1.6"
          ),
          h.p(
            "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
          )
        ),

        // fix article tag
        h.article(
          {
            class: "docs-article",
            id: "section-2",
          },
          h.header(
            {
              class: "docs-header",
            },
            h.h1(
              {
                class: "docs-heading",
              },
              "/Instalation"
            ),
            h.section(
              {
                class: "docs-intro",
              },
              h.p(
                "Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio."
              )
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-2-1",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 2.1"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-2-2",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 2.2"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-2-3",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 2.3"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          )
        ),
        h.article(
          {
            class: "docs-article",
            id: "section-3",
          },
          h.header(
            {
              class: "docs-header",
            },
            h.h1(
              {
                class: "docs-heading",
              },
              "APIs"
            ),
            h.section(
              {
                class: "docs-intro",
              },
              h.p(
                "Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio."
              )
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-3-1",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 3.1"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-3-2",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 3.2"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-3-3",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 3.3"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          )
        ),
        h.article(
          {
            class: "docs-article",
            id: "section-4",
          },
          h.header(
            {
              class: "docs-header",
            },
            h.h1(
              {
                class: "docs-heading",
              },
              "Intergrations"
            ),
            h.section(
              {
                class: "docs-intro",
              },
              h.p(
                "Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio."
              )
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-4-1",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 4.1"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-4-2",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 4.2"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-4-3",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 4.3"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          )
        ),
        h.article(
          {
            class: "docs-article",
            id: "section-5",
          },
          h.header(
            {
              class: "docs-header",
            },
            h.h1(
              {
                class: "docs-heading",
              },
              "Utilities"
            ),
            h.section(
              {
                class: "docs-intro",
              },
              h.p(
                "Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio."
              )
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-5-1",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 5.1"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-5-2",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 5.2"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-5-3",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 5.3"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          )
        ),
        h.article(
          {
            class: "docs-article",
            id: "section-6",
          },
          h.header(
            {
              class: "docs-header",
            },
            h.h1(
              {
                class: "docs-heading",
              },
              "Web"
            ),
            h.section(
              {
                class: "docs-intro",
              },
              h.p(
                "Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio."
              )
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-6-1",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 6.1"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-6-2",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 6.2"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-6-3",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 6.3"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          )
        ),
        h.article(
          {
            class: "docs-article",
            id: "section-7",
          },
          h.header(
            {
              class: "docs-header",
            },
            h.h1(
              {
                class: "docs-heading",
              },
              "Moblie"
            ),
            h.section(
              {
                class: "docs-intro",
              },
              h.p(
                "Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio."
              )
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-7-1",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 7.1"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-7-2",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 7.2"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-7-3",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 7.3"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          )
        ),
        h.article(
          {
            class: "docs-article",
            id: "section-8",
          },
          h.header(
            {
              class: "docs-header",
            },
            h.h1(
              {
                class: "docs-heading",
              },
              "Resources"
            ),
            h.section(
              {
                class: "docs-intro",
              },
              h.p(
                "Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio."
              )
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-8-1",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 8.1"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-8-2",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 8.2"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-8-3",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section Item 8.3"
            ),
            h.p(
              "Vivamus efficitur fringilla ullamcorper. Cras condimentum condimentum mauris, vitae facilisis leo. Aliquam sagittis purus nisi, at commodo augue convallis id. Sed interdum turpis quis felis bibendum imperdiet. Mauris pellentesque urna eu leo gravida iaculis. In fringilla odio in felis ultricies porttitor. Donec at purus libero. Vestibulum libero orci, commodo nec arcu sit amet, commodo sollicitudin est. Vestibulum ultricies malesuada tempor."
            )
          )
        ),
        h.article(
          {
            class: "docs-article",
            id: "section-9",
          },
          h.header(
            {
              class: "docs-header",
            },
            h.h1(
              {
                class: "docs-heading",
              },
              "FAQs"
            ),
            h.section(
              {
                class: "docs-intro",
              },
              h.p(
                "Section intro goes here. You can list all your FAQs using the format below."
              )
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-9-1",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Sction item 9.1",
              h.small("(FAQ Category One)")
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "What is sit amet quam eget lacinia?"
            ),
            h.p(
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium."
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "How to ipsum dolor sit amet quam tortor?"
            ),
            h.p(
              "Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. "
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "Can I  bibendum sodales?"
            ),
            h.p(
              "Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui.  "
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "Where arcu sed urna gravida?"
            ),
            h.p(
              "Aenean et sodales nisi, vel efficitur sapien. Quisque molestie diam libero, et elementum diam mollis ac. In dignissim aliquam est eget ullamcorper. Sed id sodales tortor, eu finibus leo. Vivamus dapibus sollicitudin justo vel fermentum. Curabitur nec arcu sed urna gravida lobortis. Donec lectus est, imperdiet eu viverra viverra, ultricies nec urna.   "
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-9-2",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section 9.2",
              h.small("(FAQ Category Two)")
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "What is sit amet quam eget lacinia?"
            ),
            h.p(
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium."
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "How to ipsum dolor sit amet quam tortor?"
            ),
            h.p(
              "Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. "
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "Can I  bibendum sodales?"
            ),
            h.p(
              "Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui.  "
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "Where arcu sed urna gravida?"
            ),
            h.p(
              "Aenean et sodales nisi, vel efficitur sapien. Quisque molestie diam libero, et elementum diam mollis ac. In dignissim aliquam est eget ullamcorper. Sed id sodales tortor, eu finibus leo. Vivamus dapibus sollicitudin justo vel fermentum. Curabitur nec arcu sed urna gravida lobortis. Donec lectus est, imperdiet eu viverra viverra, ultricies nec urna.   "
            )
          ),
          h.section(
            {
              class: "docs-section",
              id: "item-9-3",
            },
            h.h2(
              {
                class: "section-heading",
              },
              "Section item 9.3",
              h.small("(FAQ Category Three)")
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "What is sit amet quam eget lacinia?"
            ),
            h.p(
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium."
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "How to ipsum dolor sit amet quam tortor?"
            ),
            h.p(
              "Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. "
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "Can I  bibendum sodales?"
            ),
            h.p(
              "Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui.  "
            ),
            h.h5(
              {
                class: "pt-3",
              },
              h.i({
                class: "fas fa-question-circle me-1",
              }),
              "Where arcu sed urna gravida?"
            ),
            h.p(
              "Aenean et sodales nisi, vel efficitur sapien. Quisque molestie diam libero, et elementum diam mollis ac. In dignissim aliquam est eget ullamcorper. Sed id sodales tortor, eu finibus leo. Vivamus dapibus sollicitudin justo vel fermentum. Curabitur nec arcu sed urna gravida lobortis. Donec lectus est, imperdiet eu viverra viverra, ultricies nec urna.   "
            )
          )
        ),
        h.footer(
          {
            class: "footer",
          },
          h.div(
            {
              class: "container text-center py-5",
            },
            h.small(
              {
                class: "copyright",
              },
              "designed with",
              h.span(
                {
                  class: "sr-only",
                },
                "love"
              ),
              h.i(
                {
                  class: "fas fa-heart",
                  style: "color: #fb866a;",
                },
                "by"
              ),
              h.a(
                {
                  class: "theme-link",
                  href: "http://themes.3rdwavemedia.com",
                  target: "_blank",
                },
                "Xiaoying Riley"
              ),
              "for developers"
            ),
            h.ul(
              {
                class: "social-list list-unstyled pt-4 mb-0",
              },
              h.li(
                {
                  class: "list-inline-item",
                },
                h.a(
                  {
                    href: "#",
                  },
                  h.i({
                    class: "fab fa-github fa-fw",
                  })
                )
              ),
              h.li(
                {
                  class: "list-inline-item",
                },
                h.a(
                  {
                    href: "#",
                  },
                  h.i({
                    class: "fab fa-twitter fa-fw",
                  })
                )
              ),
              h.li(
                {
                  class: "list-inline-item",
                },
                h.a(
                  {
                    href: "#",
                  },
                  h.i({
                    class: "fab fa-slack fa-fw",
                  })
                )
              ),
              h.li(
                {
                  class: "list-inline-item",
                },
                h.a(
                  {
                    href: "#",
                  },
                  h.i({
                    class: "fab fa-product-hunt fa-fw",
                  })
                )
              ),
              h.li(
                {
                  class: "list-inline-item",
                },
                h.a(
                  {
                    href: "#",
                  },
                  h.i({
                    class: "fab fa-facebook fa-fw",
                  })
                )
              ),
              h.li(
                {
                  class: "list-inline-item",
                },
                h.a(
                  {
                    href: "#",
                  },
                  h.i({
                    class: "fab fa-instagram fa-fw",
                  })
                )
              )
            )
          )
        )
      ),
    )

      
    );
  }
}
