class GettingStarted {
  icon = "fa-person-walking";
  id = "ojs-getting-started";
  title = "Getting Started";
  content = [
    h.p(
      "This guide will walk you through the process of getting started with OpenScript.Js. By the end of this section, you will have OpenScript.Js set up in your project."
    ),
  ];

  sections = [
    {
      id: "ojs-getting-started-1",
      title: "Installation",
      heading: "Installation",
      content: [
        h.p(
          "You have two options for installing OpenScript.Js: downloading the source code from the GitHub repository or using the JsDelivr CDN. When you use former option, you get autocomplete"
        ),

        h.h3("Option 1: Download from GitHub Repository"),

        h.List("ol", [
          [
            "Start by downloading the OpenScript.Js source code from the GitHub repository at: ",
            h.br(),
            h.ExternalLink(
              "https://github.com/levizwannah/OpenScript.Js",
              " https://github.com/levizwannah/OpenScript.Js"
            ),
          ],

          [
            "Once you have downloaded the source code, locate the ",
            h.code("OpenScript.Js"),
            " file in the repository and the ",
            h.code("ojs-config.js"),
            " file as well. ",
            "The OpenScript.Js file contains the main logic and functionality of the OpenScript.Js framework. And the config file enables you to configure the OJS.",
          ],

          [
            "You can include the OpenScript.Js file in your HTML pages using a  <script> tag like this:",

            h.Code(
              `<script src="js/path/to/OpenScript.js"></script>
<script src="js/path/to/ojs-config.js"></script>`
            ),

            "Make sure to adjust the src attribute value according to the location where you placed the OpenScript.Js and the ojs-config files.",
          ],
        ]),

        h.h3("Option 2: Use JsDelivr CDN"),

        h.p(
          "If you prefer using a CDN to include OpenScript.Js in your project, you can leverage the JsDelivr CDN to load the framework."
        ),

        h.List("ol", [
          [
            "Use this link to get the latest version or use a specific version to avoid breaking your code on updates to OJS. To get a specific version, replace `latest` with for example, 4.2.1. Here is the CDN link: ",
            h.Code(
              "https://cdn.jsdelivr.net/gh/levizwannah/OpenScript.Js@latest/OpenScript.js"
            ),

            h.Callout("warning", {
              title: "Heads Up",
              content:
                "This URL represents the latest version of OpenScript.Js available on JsDelivr's CDN. To use a specific version, change the 'latest' to the version number. e.g. 4.2.1",
            }),
          ],
          [
            "Include the generated JsDelivr URL in your HTML pages using a <script> tag, as shown below: ",
            h.br(),
            h.Code(
              { class: "language-html" },
              `<script src="https://cdn.jsdelivr.net/gh/levizwannah/OpenScript.Js@latest/OpenScript.js"></script>`
            ),
            h.Callout("info", {
              title: "Configuration",
              content:
                "You must create a file for configuring OJS and include it right below the OJS script tag. Use the OJS template below for your config file.",
            }),
          ],
        ]),

        h.h3("Configuration"),

        h.p(
          `Before you can start using OpenScript.Js in your project, there are some initial configurations that you need to set up. These configurations allow you to customize various aspects of OpenScript.Js to suit your project's requirements.`
        ),

        h.List("ol", [
          [
            `Create a new JavaScript file in your project, preferably named`,
            h.code(`ojs-config.js`),
            `.This file will contain the OpenScript.Js configurations.`,
          ],

          [
            "Open the ojs-config.js file and add the following configurations:",

            h.Code(
              `/*----------------------------------
| Do OpenScript Configurations Here
|----------------------------------
*/

/*----------------------------------
* 
* Set the default route path here
* ----------------------------------
*/
route.basePath(''); // === '/'

/*-----------------------------------
| Set the global runtime prefix.
| This prefix will be appended
| to every path before resolution.
| So ensure when defining routes,
| you have it as the main prefix.
|------------------------------------
*/
route.runtimePrefix(''); // === ''

/*-----------------------------------
| set the directories in which we
| can find the context files
|-----------------------------------
*/
ContextProvider.directory = route.baseUrl('js/contexts');

/*-----------------------------------
| set the version number of the
| context files so that we can
| always load the new files incase
| files change
|-----------------------------------
*/
ContextProvider.version = '1.0.0';

/*-----------------------------------
| Set the Mediators directory
| so that we an load the mediators
| from that directory
|-----------------------------------
*/
MediatorManager.directory = route.baseUrl('js/mediators');

/*-----------------------------------
| Set the version number of the 
| mediator files so that we can
| always load a fresh copy of the
| mediators files upon changes.
|----------------------------------
*/
MediatorManager.version = '1.0.0';

/*-----------------------------------
| Set the default component
| directory for the loader
|-----------------------------------
*/
loader.dir = route.baseUrl('js/components');

/*-----------------------------------
| set the version number of the
| component files so that we load
| a fresh file when they change
|-----------------------------------
*/
loader.version = '1.0.0';

/*-----------------------------------
| Set the default directory of the
| autoload object for loading
| files.
|-----------------------------------
*/

autoload.dir = route.baseUrl('js/classes');

/*-----------------------------------
| set the version number of the
| JS files so that we load
| a fresh file when they change
|-----------------------------------
*/
autoload.version = '1.0.0';


/*---------------------------------
| Get the initial body style so
| so that when routes change,
| we can reset the body style.
| Sometimes, the body element's
| style is affected by elements
| That are no longer on the DOM.
| example, bootstrap offcanvas.
| In these cases, you need to
| reset the body style when
| the routeChanged event is fired
| by the router. So you can listen
| to it and use this to reset
| the style.
|----------------------------------
*/
var __bodyStyle = document.body.getAttribute("style");

/*--------------------------------
| Set the logs clearing interval
| for the broker to remove stale
| events. (milliseconds)
|--------------------------------
*/
broker.CLEAR_LOGS_AFTER = 30000; // 30 secs

/*--------------------------------
| Set how old an event must be
| to be deleted from the broker's
| event log during logs clearing
|--------------------------------
*/
broker.TIME_TO_GC = 10000; // 10 secs


/*-------------------------------------------
| Start the garbage 
| collector for the broker
|-------------------------------------------
*/
broker.removeStaleEvents(); // broker garbage collection started

/*------------------------------------------
| When this is set to true, the broker
| will display events and their payloads
| in the console when they are fired
|------------------------------------------
*/
broker.withLogs(false); 
`,

              { class: "language-js" }
            ),

            h.Alert(
              "warning",
              "Make sure to adjust the directory paths in the configurations according to the structure of your project."
            ),
          ],

          [
            "Save the",
            h.code("ojs-config.js"),
            " file in a location accessible to your HTML pages, preferably in the same directory as your OpenScript.Js files.",
          ],

          [
            "Finally, include the",
            h.code("ojs-config.js"),
            " file in your HTML pages using a <script> tag. Place this script tag after you include the OpenScript.Js file:",

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
            ),
          ],
        ]),
      ],
    },

    {
      id: "ojs-getting-started-2",
      title: "Hello OpenScript.Js",
      heading: "Hello OpenScript",
      content: [
        h.p(
          `In this section, we cover the fundamental aspects of OpenScript.Js by creating a simple "Hello World" example. This example will serve as a starting point to understand the basic usage of OpenScript.Js components, state, context, mediators.`
        ),
        h.h3("Setting up"),
        h.p(
          "Create an",
          h.code("index.html"),
          " file and an ",
          h.code("js/app.js"),
          ". Put the below content in the HTML file. We will gradually build the ",
          h.code("app.js"),
          " file as we progress through the Hello World Section. Ensure you already have the ",
          h.code("OpenScript.js"),
          ", ",
          h.code("ojs-config.js"),
          " files in the ",
          h.code("js"),
          " directory"
        ),
        h.h4("The Index.html file"),
        h.Code(
          `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello OpenScript.js</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

</head>
<body>

    <div id="root">
            <!-- We will render our content in this div -->
    </div>

    <footer>
        <script src="./js/OpenScript.js"></script>
        <script src="./js/ojs-config.js"></script>
        <script src="./js/app.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    </footer>

</body>
</html>
`
        ),

        h.h4("The app.js file"),
        h.p(
          "In the app.js file, we will render our components. Due to Asynchronous rendering, you can use a component before creating the component. In OJS, you render a component by using the h.ComponentName(...arguments). We are going to render our an App component in the root div of the index.html. Notice that nothing happens except that we have an <ojs-app-tmp--> element in the root div when you inspect it."
        ),

        h.Code(
          `
const rootElement = document.getElementById('root');

// render the App in the root element
h.App(
    {
      parent: rootElement,
      resetParent: true
    }
);
`
        ),

        h.QuickNote([
          h.b("`parent`"),
          " tells OJS the HTML element to put the generated HTML markup in. This can be used on a normal html element or an OJS component.",
          h.br(),
          h.b("`resetParent`"),
          " tells OJS to remove all the current inner HTML of the parent before placing the generated HTML in it. By default, OJS will append the generated markup to the parent inner HTML.",
        ]),

        h.h3("Markup Generation"),

        h.p(
          `In OpenScript.Js, you can create HTML elements using the `,
          h.code(`h`),
          ` object followed by the element name. For example, to create a div element, you can use`,
          h.code(`h.div(...args)`),
          `.`,

          h.br(),
          h.br(),

          `To add attributes to the created element, you can pass an object as a literal argument to the element function. Each key-value pair in the object represents an attribute and its corresponding value. For example, if you want to add a class attribute with the value of "container" to a `,
          h.code(`div`),
          ` element, you can use `,
          h.code(`h.div({ class: "container" }, ...args)`),
          ".",

          h.br(),
          h.br(),

          `By nesting elements and passing multiple attributes, you can create complex and structured markup with ease. Here's an example of how you can nest elements and add multiple attributes to a`,
          h.code(`div`),
          ` element:`,
          h.br(),
          h.br(),
          h.Code(
`h.div(
    { class: 'container', id: 'myDiv' },
    h.h1('Hello World'),
    h.p('This is a paragraph.'),
    h.button({ type: 'button' }, 'Click Me')                                     
);`
          ),

          `In the above example, we create a `,
          h.code(`div`),
          ` element with the `,
          h.code("class"),
          ` attribute set to `,
          h.code("container"),
          ` and the`,
          h.code(`id`),
          ` attribute set to `,
          h.code("myDiv"),
          `. Inside the `,
          h.code(`div`),
          ` , we nest an `,
          h.code("h1"),
          `  element with the text 'Hello World', a `,
          h.code(`p`),
          ` element with the text 'This is a paragraph.', and a `,
          h.code(`button`),
          ` element with the attribute type set to 'button' and the text 'Click Me'.`,
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
        ),

        h.CodeOutput(
          h.div(
            { class: 'container', id: 'myDiv' },
            h.h1('Hello World'),
            h.p('This is a paragraph.'),
            h.button({ type: 'button' }, 'Click Me')                                     
          )
        ),

        h.h3(`Components`),

        h.p(
          `In OJS a component is a reusable UI element that encapsulates logic, structure, and functionality. It is created by extending the OpenScript.Component class and defining a render method. Components allow developers to break down the UI into smaller, self-contained units, making it easier to manage and maintain the codebase. In this hello world example, we will create a post that has comments. Let's create the comments component`
        ),
        h.Code(
`class Comment extends OpenScript.Component {
    /**
     * @param {string} content 
     */
    render(content, ...args) {
        return h.div(
            { class: 'comment' },
            h.div({ class: 'comment-content' }, content),
            h.i({ class: 'fa fa-thumbs-up' }),
            h.i({ class: 'fa fa-reply' }),
            ...args
        );
    }
}`
        ),
        h.QuickNote(
          ['Always remember to put the ', h.code('...args'), ' at the end of the render method parameters. It is used by OJS to pass metadata to the component when the it reacts to changes in state (data). For the above component, ...args is not necessary because there is no state.']
        ),

        h.br(),

        h.p(
          `In the example above, we define a new component called Comment by extending the OpenScript.Component class. The render method is responsible for rendering the structure and content of the Comment component.`,
          h.br(),

          `The render method takes a content parameter, which represents the comment text to be displayed. Inside the render method, we create a`,
          h.code(`div`),
          `element with the class 'comment'.`,

          `Within the`,
          h.code("div"),
          `, we nest two child elements. The first child element is another`,
          h.code("div"),
          ` with the class 'comment-content', which will display the comment text passed as the content parameter.`,
          h.br(),
          h.br(),

          `The second and third child elements are`,
          h.code("i"),
          `elements representing icons. In this example, we use Font Awesome icons with classes 'fa fa-thumbs-up' and 'fa fa-reply'. You can adjust these classes or use different icon libraries based on your requirements.`,
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

        h.h3("Context"),

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

        h.h3("Router"),
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
 route.orOn(['contact', 'contact.html'], function() {
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
        ),
      ],
    },
  ];
}
