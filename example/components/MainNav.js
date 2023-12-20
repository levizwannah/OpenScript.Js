function MainNav(...args) {
    return h.nav(
        { class: "navbar navbar-expand-lg bg-light" },
        h.div(
            { class: "container-fluid" },
            h.a( 
                {
                    class: "navbar-brand", href: "#"
                },

                "OpenScriptJs Nav"
            ),

            h.button(
                {
                    class: "navbar-toggler",
                    type: "button",
                    data_bs_toggle: "collapse",
                    data_bs_target: "#navbarNavDropdown", aria_controls: "navbarNavDropdown", aria_expanded: "false", aria_label: "Toggle navigation"
                },

                h.span({ class: "navbar-toggler-icon" })
            ),

            h.div(
                { 
                    class: "collapse navbar-collapse", 
                    id: "navbarNavDropdown" 
                },
                h.ul(
                    {
                        class: "navbar-nav"
                    },

                    h.call(() => {
                        let lis  = [];

                        for(let n of ["Home", "Features", "Pricing", "About Us", "Help"]){
                            lis.push(

                                h.li(
                                    {
                                        class: "nav-item"
                                    },

                                    h.a(
                                        { class: "nav-link" },
                                        n
                                    )
                                )
                            )
                        }

                        return lis;
                    }),

                    h.li(
                        { class: "nav-item dropdown" },
                        
                        h.a(
                            {
                                class: "nav-link dropdown-toggle", 
                                href: "#",
                                role: "button",
                                data_bs_toggle: "dropdown",
                                aria_expanded: "false"
                            },
                            "Dropdown Link"
                        ),

                        h.ul( 
                            { class: "dropdown-menu" },

                            h.call(e => {
                                let lis = [];

                                for(let n of ["Action", "Another Action", "Something Else OJS"]){
                                    lis.push(
                                        h.li(
                                            h.a(
                                                { 
                                                    class: "dropdown-item",
                                                    href: "#"
                                                },
                                                n
                                            )
                                        )
                                    )
                                }

                                return lis;
                            })
                        )
                    )
                )
            )
        ),

        ...args
    )
}