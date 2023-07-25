class Introduction {

    icon = 'fa-map-signs';
    id = 'ojs-introduction';
    title = 'Introduction';

    content = [
        h.section(
            {class: 'docs-intro'},
            h.p(
                'Welcome to the documentation of OpenScript.Js, a lightweight web frontend framework designed to simplify the process of creating reactive and elegant user interfaces for web applications. OpenScript.Js stands out from other frameworks by utilizing the power of standard browser JavaScript, without the need for bundling or modules. This allows developers to seamlessly integrate OpenScript.Js into their projects without complex setup processes.'
            ),

            h.p(
                "OpenScript.Js empowers frontend UI developers by providing a comprehensive set of features and components that facilitate the creation of dynamic and interactive web UIs with ease and elegance. Whether you want to build a small section of your application's UI or develop the entire user interface, OpenScript.Js provides the necessary tools and abstractions to streamline your development workflow."
            )
        )
    ];

    sections = [
        {
            id: 'ojs-introduction-1',
            title: 'Key Components',
            heading: 'Key Components',
            content: [
                h.p(
                    "At the heart of OpenScript.Js are several key components that form the foundation of the framework. These components work together harmoniously to enhance the development experience and empower developers to build robust and sophisticated web applications. The major components that make up OpenScript.Js include:"
                ),

                h.List('ul', [
                    [
                        h.b("UI Component:"), 
                        " Enables the creation of reusable and modular UI elements."
                    ],

                    [
                        h.b("Markup Generator:"), 
                        " Simplifies the generation of HTML markup and dynamic content."
                    ],

                    [
                        h.b("File Autoloader:"), 
                        " Provides seamless loading of JavaScript files without the need for manual script tags."
                    ],

                    [
                        h.b("State:"), 
                        " Offers a powerful mechanism for managing application state and achieving reactive updates."
                    ],

                    [
                        h.b("Context:"), 
                        " Facilitates the sharing of data across multiple components in a hierarchical manner."
                    ],

                    [
                        h.b("Event Emitter:"), 
                        " Allows components to communicate and propagate events throughout the application."
                    ],

                    [
                        h.b("Router:"), 
                        " Provides a flexible routing system for creating single-page applications with multiple views."
                    ],
                    
                    [
                        h.b("Listener:")
                    ],

                    [
                        h.b("Broker:")
                        `These in summary serve as the message queue for the components,views and the mediators.The main work for this is to persist events and notify the mediator when they are present on the DOM`
                    ],

                    [
                        h.b("Mediation:"),
                        `Mediators essentially connect the frontend to the system backend through the network.`,h.a({href:"https://levizwannah.medium.com/"},` Delve depper into the idea of a mediator`)
                        
                    ]

                    
                ])
            ]
        },
        {
            id: 'ojs-introduction-2',
            title: 'Conclusion',
            heading: 'Conclusion',
            content: [
                h.p(
                    "Throughout this documentation, we will explore each of these components in detail, discussing their purpose, usage, and how they contribute to the overall development experience with OpenScript.Js."
                ),

                h.p(
                    "Whether you're a seasoned developer or just starting your journey in frontend development, OpenScript.Js aims to provide a straightforward and intuitive framework that enables you to create web UIs that are both functional and visually appealing."
                ),

                h.p(
                    "Now, let's dive into the various aspects of OpenScript.Js and explore its features, components, and best practices to unleash your full potential as a frontend developer."
                ),

                h.p(
                    "If you have any questions or need assistance, please refer to the relevant sections of this documentation or reach out to our vibrant community for support.",
                    h.br(),
                    h.br(),
                    "Happy coding with OpenScript.Js!"
                )
            ]
        }
    ];
}