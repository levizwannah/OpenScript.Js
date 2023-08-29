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
                        h.Code("https://cdn.jsdelivr.net/gh/levizwannah/OpenScript.Js/OpenScript.js"),

                        h.Callout('warning', { title: 'Heads Up', content: "This URL represents the latest version of OpenScript.Js available on JsDelivr's CDN." })
                    ],
                    [
                        "Include the generated JsDelivr URL in your HTML pages using a <script> tag, as shown below: ",
                        h.br(),
                        h.Code(
                            { class: 'language-html' },
                            `<script src="https://cdn.jsdelivr.net/gh/levizwannah/OpenScript.Js/OpenScript.js"></script>`
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
autoload.version = '1.0.0';`, { class: 'language-js' }),

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

                h.h3('Markup Generation'),

                h.p(
                    `In OpenScript.Js, you can create HTML elements using the `, h.code(`h`), ` object followed by the element name. For example, to create a div element, you can use`, h.code(`h.div(...args)`), `.`,

                    h.br(),
                    h.br(),

                    `To add attributes to the created element, you can pass an object as a literal argument to the element function. Each key-value pair in the object represents an attribute and its corresponding value. For example, if you want to add a class attribute with the value of "container" to a `, h.code(`div`), ` element, you can use `,
                    h.code(`h.div({ class: "container" }, ...args)`), '.',

                    h.br(),
                    h.br(),

                    `By nesting elements and passing multiple attributes, you can create complex and structured markup with ease. Here's an example of how you can nest elements and add multiple attributes to a`, h.code(`div`), ` element:`,
                    h.br(),
                    h.br(),
                    h.Code(
                        `h.div(
    { class: 'container', id: 'myDiv' },
    h.h1('Hello World'),
    h.p('This is a paragraph.'),
    h.button({ type: 'button' }, 'Click Me')                                     
);` ,

                        { class: 'language-js' }
                    ),

                    `In the above example, we create a `, h.code(`div`), ` element with the `, h.code('class'), ` attribute set to `, h.code('container'), ` and the`, h.code(`id`), ` attribute set to `, h.code('myDiv'), `. Inside the`, h.code(`div`), ` , we nest an`, h.code('h1'), `  element with the text 'Hello World', a `, h.code(`p`), ` element with the text 'This is a paragraph.', and a `, h.code(`button`), ` element with the attribute type set to 'button' and the text 'Click Me'.`,
                    h.br(),
                    `This will generate the following HTML markup:`
                ),


                h.p(
                    h.Code(
                        `<div class="container" id="myDiv">
     <h1>Hello World</h1>
     <p>This is a paragraph.</p>
     <button type="button">Click Me</button>
 </div>`
                    ),
                    h.br(),
                    `With OpenScript.Js's concise syntax for element creation and attribute assignment, you can easily construct dynamic and interactive web UIs.`
                ),

                h.h3(`Components`),

                h.p(
                    `In OpenScript.Js, a component is a reusable and modular UI element that encapsulates logic, structure, and functionality. It is created by extending the OpenScript.Component class and defining a render method. Components in OpenScript.Js serve as building blocks for constructing the user interface of a web application. They allow developers to break down the UI into smaller, self-contained units, making it easier to manage and maintain the codebase. By separating UI components into individual classes, components can be reused across multiple parts of an application, providing consistency and reducing code duplication. Components in OpenScript.Js promote a more structured and efficient development process, enabling developers to build modular, maintainable, and reusable UI elements.`
                ),
                h.Code(
                    `class Comment extends OpenScript.Component {
    /**
     * @param {string} content 
     */
    render(content) {
        return h.div(
            { class: 'comment' },
            h.div({ class: 'comment-content' }, content),
            h.i({ class: 'fa fa-thumbs-up' }),
            h.i({ class: 'fa fa-reply' })
        );
    }
}`
                ),

                h.br(),

                h.p(
                    `In the example above, we define a new component called Comment by extending the OpenScript.Component class. The render method is responsible for rendering the structure and content of the Comment component.`,
                    h.br(),

                    `The render method takes a content parameter, which represents the comment text to be displayed. Inside the render method, we create a`, h.code(`div`), `element with the class 'comment'.`,


                    `Within the`, h.code('div'), `, we nest two child elements. The first child element is another`, h.code('div'), ` with the class 'comment-content', which will display the comment text passed as the content parameter.`,
                    h.br(),
                    h.br(),

                    `The second and third child elements are`, h.code('i'), `elements representing icons. In this example, we use Font Awesome icons with classes 'fa fa-thumbs-up' and 'fa fa-reply'. You can adjust these classes or use different icon libraries based on your requirements.`,
                    h.br(),
                    h.br(),

                    `To use the Comment component in your application, you can instantiate it and include it within your OpenScript.Js markup. For example:`,

                    h.Code(
                        `class App extends OpenScript.Component {
    render(...args) {
        return h.div( { class: 'app' },
                  h.h1('My App'),
                  h.Comment('This is a comment.'),
                   ...args
        );
    }
}                      
h.App({ parent: h.dom.getElementById('root'), resetParent: true });`
                    ),
                    h.br(),


                    `We define a component called App by extending the OpenScript.Component class. The render method of the App component returns the OpenScript.Js markup for the application UI. Inside the render method, we include the h.Comment('This is a comment.') element to render the Comment component with the specified comment content.`,
                    h.br(),

                    `To render the App component and mount it to the DOM, we use h.App({ parent: h.dom.getElementById('root'), resetParent: true }). This will find the element with the ID 'root' and render the App component within it.`,
                    h.br(),


                    `The resulting HTML markup will be:`,

                    h.Code(
                        `<div class="app">
     <h1>My App</h1>
     <div class="comment">
        <div class="comment-content">This is a comment.</div>
        <i class="fa fa-thumbs-up"></i>
         <i class="fa fa-reply"></i>
     </div>
 </div>`
                    ),
                    h.br(),


                    `By creating components like Comment in OpenScript.Js, you can encapsulate the structure and functionality of your UI elements, making them reusable and modular within your application.`




                ),

                h.h3('Context'),

                h.p(
                    `In OpenScript.Js, contexts provide a powerful mechanism for sharing data across components in a hierarchical manner. To create a context in OpenScript.Js, you can define a class that extends the OpenScript.Context class. Within the context class, you can define methods to initialize and manage the data that needs to be shared. Each data item is stored as a context value, which can be accessed and modified by components that consume the context.`,

                    h.br(),
                    h.br(),

                    `Contexts are used to store and manage shared data, making it accessible to different components within a specific part of the component tree. This enables components to access and use data without the need for manual data passing through parameters, simplifying data sharing and promoting a more modular and flexible application architecture.`,

                    `We could maybe create a context for the app component that we used above`,

                    h.Code(
                        `class AppContext extends OpenScript.Context {
         theme;
         user;
    constructor() {
        super();                    
        this.has('theme').value = ' dark'
        this.has('user').value = {
            name: 'John Doe',
            role: 'User',
            loggedIn: false
        };
    }
}`

                    ),

                    `In the above example the AppContext class is a custom context in OpenScript.Js  serves  as a data-sharing mechanism for the app component. It contains two crucial data items: the application's current theme and user information. The theme property holds the application's theme, initially set to 'dark', allowing components to access and apply theme-specific styles or layouts. The user property stores an object with user-related details like name, role, and login status, facilitating UI personalization and conditional rendering based on the user's information.`,

                    h.br(),
                    h.br(),

                    `By using contexts  like AppContext fosters a modular and efficient approach to managing shared data, promoting reusability and consistency across the application's components. The context encapsulates the essential data and provides a seamless way to share it with components at different levels of the component tree.`



                ),

                h.h3('Router'),
                h.p(
                    `Routers in OpenScript.Js serve as a fundamental tool for developing single-page applications with multiple views. Unlike traditional web applications where each view corresponds to a separate page, routers enable developers to create dynamic applications that transition between different content sections within a single page. This mechanism enhances user experience by providing a seamless and interactive browsing environment without the need for full page reloads.`
                ),
                h.Code(
                    `// Fetch context and mediators
 fetchContext(['global'], 'Groups.Urgent');
  mediators(['appActions']);
                    
 // Get the 'global' context
  const gc = context('global');
  gc.root = h.dom.querySelector('#root');
                    
  // Define a route for the home view
  route.orOn(['/', 'index', 'index.html', 'home'], function(){
       req('Groups.HomeView');
        h.HomeView(
            {
                 parent: gc.root,
                 resetParent: route.reset
            }
                );
                    });
                    
 // Define a route for the contact view
 router.orOn(['contact', 'contact.html'], function() {
    req('GroupsContactView.');
       h.ContactView(
          {
              parent: rootElement,
             resetParent: true
           }
                        );
                    });
                    
     // Listen to route changes
    route.listen();
                    `
                ),
                h.br(),
                h.br(),

                h.p(
                    `
                    
                    
                     In the above example,a router is demonstrated within an OpenScript.Js application. The process begins by fetching the required context and mediators to facilitate data management and communication with the backend. The application's global context is retrieved and assigned, along with specifying the root element where views will be rendered. Two distinct route handlers are then defined: one for the home view and another for the contact view. These handlers dictate what components to load when specific URL paths are matched. The router listens for URL changes and dynamically imports and renders the corresponding components within their designated parent elements, effectively altering the content of the application without requiring full page reloads. This approach enables users to smoothly navigate between the home and contact views, enhancing user experience and optimizing performance by eliminating unnecessary page transitions.`
                ),
                h.br(),
                h.br(),

                h.p(
                    `Routers in OpenScript.Js empower developers to craft interactive single-page applications where different content sections are seamlessly navigated. By defining route handlers for specific URL paths, the application can transition between different views, enhancing the user experience and optimizing application performance.  Routers also facilitate dynamic content presentation within a unified web page, ultimately resulting in more engaging and user-friendly applications.`
                )



            ]
        }
    ];
}