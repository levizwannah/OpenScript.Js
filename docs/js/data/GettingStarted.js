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
            heading: 'Hello OpenScript.Js',
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