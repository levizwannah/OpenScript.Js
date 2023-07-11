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

                h.h3("Option 1: Download from GitHub Repository"),

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

                        h.Code(
                            '<script src="js/libs/OpenScript.Js"></script>'
                        ),
                        
                        "Make sure to adjust the src attribute value according to the location where you copied the OpenScript.Js file."
                        
                    ]
                ]),

                h.h3('Option 2: Use JsDelivr CDN'),

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
                        h.Code("https://cdn.jsdelivr.net/gh/levizwannah/OpenScript.Js/OpenScript.Js"),

                        h.Callout('warning', {title: 'Heads Up', content: "This URL represents the latest version of OpenScript.Js available on JsDelivr's CDN."})
                    ],
                    [
                        "Include the generated JsDelivr URL in your HTML pages using a <script> tag, as shown below: ",
                        h.br(),
                        h.Code(
                            {class: 'language-html'},
                            `<script src="https://cdn.jsdelivr.net/gh/levizwannah/OpenScript.Js/OpenScript.Js"></script>`
                        )
                    ]
                ]),

                h.h3('Configuration'),

                h.p(`Before you can start using OpenScript.Js in your project, there are some initial configurations that you need to set up. These configurations allow you to customize various aspects of OpenScript.Js to suit your project's requirements.`),

                h.List('ol', [
                    [
                        `Create a new JavaScript file in your project, preferably named`, 
                        h.code(`ojs-config.js`),
                        `.This file will contain the OpenScript.Js configurations.`
                    ],

                    [
                        "Open the ojs-config.js file and add the following configurations:",

                    h.Code(
`/*----------------------------------
 | Do OpenScript Configurations Here
 |----------------------------------
*/

/**----------------------------------
 * Set the default route path here
 * Every route will be prefixed by
 * this path.
 * ----------------------------------
 */
// route.basePath('base-path/another-path');

/*-----------------------------------
 | Set the directories in which we
 | can find the context files
 |-----------------------------------
*/
ContextProvider.directory = route.baseUrl('/js/contexts');

/*-----------------------------------
 | Set the version number of the
 | context files so that we can
 | always load the new files in case
 | files change
 |-----------------------------------
*/
ContextProvider.version = '1.0.0';

/*-----------------------------------
 | Set the default component
 | directory for the loader
 |-----------------------------------
*/
loader.dir = route.baseUrl('/js/components');

/*-----------------------------------
 | Set the version number of the
 | component files so that we load
 | a fresh file when they change
 |-----------------------------------
*/
loader.version = '1.0.0';

/*-----------------------------------
 | Set the default directory of the
 | autoload object for loading files.
 | the autoload object loads any JS
 | file as long it contains classes.
 |-----------------------------------
*/
autoload.dir = route.baseUrl('/js/classes');

/*-----------------------------------
 | Set the version number of the
 | JS files so that we load
 | a fresh file when they change
 |-----------------------------------
*/
autoload.version = '1.0.0';`, {class: 'language-js'}),

                        h.Alert('warning', 'Make sure to adjust the directory paths in the configurations according to the structure of your project.')
                    ],

                    [
                        'Save the',
                        h.code('ojs-config.js'),
                        ' file in a location accessible to your HTML pages, preferably in the same directory as your OpenScript.Js files.'
                    ],
    
                    [
                        'Finally, include the',
                        h.code('ojs-config.js'),
                        ' file in your HTML pages using a <script> tag. Place this script tag after you include the OpenScript.Js file:',
    
                        h.Code(
`<script src="path/to/OpenScript.Js"></script>
<script src="path/to/ojs-config.js"></script>`
                            ),

                        h.p(
                            `Replace "path/to/OpenScript.Js" and "path/to/ojs-config.js" with the actual paths to the OpenScript.Js and ojs-config.js files, respectively.`,

                            h.br(),
                            h.br(),

                            `With the configurations in place, OpenScript.Js is now ready to be used in your project. In the next section, we will provide a simple "Hello World" example to help you understand the basic usage of OpenScript.Js.`,
                            
                            h.br(),
                            h.br(),

                            `That's it! You have successfully configured OpenScript.Js for your project. Now you're ready to start building reactive web UIs with ease using OpenScript.Js.`
                        )
                    ],
                ])

            ]
        },
        {
            id: 'ojs-getting-started-2',
            title: 'Hello OpenScript.Js',
            heading: 'Hello World',
            content: [
                h.p(
                    `Welcome to the "Hello World" section of the OpenScript.Js documentation. In this section, we will cover the fundamental aspects of OpenScript.Js by creating a simple "Hello World" example. This example will serve as a starting point to understand the basic usage of OpenScript.Js components, logic, markup generation, state management, and context usage.
                    `,
                    h.br(),
                    h.br(),
                    `By following along with this example, you will gain insights into how OpenScript.Js simplifies the process of building reactive web UIs with ease and elegance. We will demonstrate how to create components, generate dynamic markup, manage state, and utilize context for efficient data sharing.
                    `,
                    h.br(),
                    h.br(),
                    `Whether you are new to OpenScript.Js or already familiar with its concepts, this section will provide a solid foundation for understanding the core principles of the framework. So let's dive in and get started with our "Hello World" example, where we'll showcase the key features and capabilities of OpenScript.Js.
                    `,
                    h.br(),
                    h.br(),
                    `In the subsequent sections, we will gradually build upon this "Hello World" example to explore more advanced concepts and techniques in OpenScript.Js. So let's begin our journey into the world of OpenScript.Js and start building beautiful and interactive web UIs!`
                ),
                
                h.h3('Markup'),

                h.p(
                    `In OpenScript.Js, you can create HTML elements using the h object followed by the element name. For example, to create a div element, you can use h.div(...args).`,

                    h.br(),
                    h.br(),

                    `To add attributes to the created element, you can pass an object as a literal argument to the element function. Each key-value pair in the object represents an attribute and its corresponding value. For example, if you want to add a 'class' attribute with the value of "container" to a div element, you can use h.div({ class: "container" }, ...args).`,
                    
                    h.br(),
                    h.br(),

                    `By nesting elements and passing multiple attributes, you can create complex and structured markup with ease. Here's an example of how you can nest elements and add multiple attributes to a div element:`
                )
            ]
        }
    ];
}