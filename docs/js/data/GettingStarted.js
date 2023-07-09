class GettingStarted {
    icon = 'fa-person-walking';
    id = 'ojs-getting-started';
    title = 'Getting Started';
    content = [
        h.p(
            'This guide will walk you through the process of getting started with OpenScript.Js. By the end of this section, you will have OpenScript.Js set up in your project and ready to build reactive web UIs with ease.'
        )
    ];

    sections = [
        {
            id: 'ojs-getting-started-1',
            title: 'Installation',
            heading: 'Installation',
            content: [
                h.p(
                    'You have two options for installing OpenScript.Js: downloading the source code from the GitHub repository or using the JsDelivr CDN. When you use former option, you get autocomplete'
                ),

                h.b("Option 1: Download from GitHub Repository"),

                h.List('ol', [
                    
                    [
                        "Start by downloading the OpenScript.Js source code from the GitHub repository at: ", 
                        h.br(),
                        h.ExternalLink("https://github.com/levizwannah/OpenScript.Js", " https://github.com/levizwannah/OpenScript.Js")
                    ],

                    [
                        "Once you have downloaded the source code, locate the ", 
                        h.code("OpenScript.Js"),
                        " file in the repository. This file contains the main logic and functionality of the OpenScript.Js framework."
                    ],

                    [
                        "You are now ready to start using OpenScript.Js in your project. You can include the OpenScript.Js file in your HTML pages using a  <script> tag like this:",

                        h.div(
                            {class: 'docs-code-block'},
                            h.code(
                                '<script src="js/libs/OpenScript.Js"></script>'
                            )
                        ),
                        
                        "Make sure to adjust the src attribute value according to the location where you copied the OpenScript.Js file."
                        
                    ]
                ]),

                h.b('Option 2: Use JsDelivr CDN'),

                h.p(
                    "If you prefer using a CDN to include OpenScript.Js in your project, you can leverage the JsDelivr CDN to load the framework."
                ),

                h.List('ol', [
                    [
                        "To generate the JsDelivr link for OpenScript.Js, navigate to the GitHub repository at: ",
                        h.br(),
                        h.ExternalLink("https://github.com/levizwannah/OpenScript.Js", " https://github.com/levizwannah/OpenScript.Js")
                    ],

                    [
                        `On the repository page, click on the "Code" button and select "Download ZIP" to download the source code.`
                    ],

                    [
                        "Extract the downloaded ZIP file and locate the OpenScript.Js file."
                    ],

                    [
                        "Next, visit the JsDelivr website at ", 
                        h.ExternalLink(" https://www.jsdelivr.com/")
                    ],

                    [
                        "On the JsDelivr website, enter the URL of the OpenScript.Js file in the '",
                        h.b("Find resources"),
                        "' search box and press ",
                        h.kbd("Enter")
                    ],

                    [
                        "JsDelivr will generate a URL for you to use. It should look something like this: ",
                        h.code("https://cdn.jsdelivr.net/gh/levizwannah/OpenScript.Js/OpenScript.Js"),

                        h.Callout('warning', {title: 'Heads Up', content: "This URL represents the latest version of OpenScript.Js available on JsDelivr's CDN."})
                    ],
                    [
                        "Include the generated JsDelivr URL in your HTML pages using a <script> tag, as shown below: ",
                        h.br(),
                        h.code(`<script src="https://cdn.jsdelivr.net/gh/levizwannah/OpenScript.Js/OpenScript.Js"></script>
                        `)
                    ]
                ])
            ]
        },
        {
            id: 'ojs-getting-started-2',
            title: 'Keyboard 1.1',
            heading: 'Section one point one',
            content: [
                h.p(
                    'Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio.'
                )
            ]
        },
        {
            id: 'ojs-getting-started-3',
            title: 'Keyboard 1.1',
            heading: 'Section one point one',
            content: [
                h.p(
                    'Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio.'
                )
            ]
        },

    ];
}