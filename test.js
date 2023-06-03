ojs(async e => {

let rc = contextProvider.put("RootContext", "RootContext");
let blog = [];

for(let i = 5; i < 20; i++){
    blog.push({
        text: `Blog Heading ${i}`,
        description: `Blog Description for This blog with random number ${(new Date()).getTime()} and ID ${i}`,
        id: i
    })
}


h.div(
    {class: "container", parent: rc.domRoot},

    h.nav(
        {
            class: "navbar navbar-expand-lg navbar-light bg-light",
        },

        h.a({ href: "#", class: "navbar-brand"}, "Navbar"),

        h.button(
            { 
                class: "navbar-toggler", type: "button", data_toggle: "collapse", 
                data_target: "#navbarSupportedContent", aria_controls: "navbarSupportedContent",
                aria_extended: "false", aria_label: "Toggle navigation",
            },

            h.span({ class: "navbar-toggler-icon"})
        ),

        h.div(
            {
                class: "collapse navbar-collapse", id: "navbarSupportedContent"
            },
            h.ul(
                { class: "navbar-nav mr-auto" },

                h.li(
                    { class: "nav-item active" },

                    h.a(
                        { class: "nav-link", href: "#" },
                        "Home",
                        h.span({class: "sr-only"}, "(Current)")
                    )
                ),

                h.li(
                    { class: "nav-item" },
                    h.a("Link", { class: "nav-link", href: "#" })
                ),

                h.li(
                    { class: "nav-item dropdown"},
                    h.a(
                        {
                            class: "nav-link dropdown-toggle",
                            href: "#",
                            id: "navbarDropdown",
                            role: "button",
                            data_toggle: "dropdown",
                            aria_haspopup: "true",
                            aria_expanded: "false"
                        },
                        "Dropdown"
                    ),

                    h.div(
                        { 
                            class: "dropdown-menu",
                            aria_labelledby: "navbarDropdown"
                        },

                        h.call( () => {
                            let a = [];
                            for(let i = 1; i < 6; i++){
                                a.push(
                                    h.a(
                                        {
                                            class: "dropdown-item",
                                            href: "#"
                                        },
                                        `Action ${i}`
                                    )
                                )
                            }

                            return a;
                        }),

                        h.div( { class: "dropdown-divider"}),
                        
                        h.call( () => {
                            let a = [];
                            for(let i = 1; i < 6; i++){
                                a.push(
                                    h.a(
                                        {
                                            class: "dropdown-item",
                                            href: "#"
                                        },
                                        `Action ${i + 5}`
                                    )
                                )   
                            }
                        
                            return a;
                        })
                    )
                ),

                h.li(
                    { class: "nav-item" },
                    h.a(
                        { class: "nav-link disabled", href: "#" },
                        "Disabled"
                    )
                )
            ),

            h.form(
                { class: "form-inline my-2 my-lg-0" },
                h.input(
                    {
                        class: "form-control mr-sm-2", 
                        type: "search", 
                        placeholder: "Search", 
                        aria_label: "Search"
                    }
                ),
                h.button(
                    {
                        class: "btn btn-outline-success my-2 my-sm-0", 
                        type: "submit"
                    }
                )
            )
       )     
    ),

    h.header(
        h.h1("The Blog List Folder"),
    ),

    h.blogList(blog)
);

})