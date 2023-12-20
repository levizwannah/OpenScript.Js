# OpenScript.Js
A frontend framework for developing and Managing Reactive UIs in an elegant and easy way using normal non-module base JavaScript. That is, you can run this just like every other browser script. 

# Key Building Blocks
- OSM - OpenScript Markup
- UI Component
- State
- Context
- Class Importer
- Broker
- Mediator
- Router
- Events

# Key But Novice Concepts
- Asynchronous Rendering
- Selective Reaction
- Late Reaction
- Context Reconciliation
- Anonymous UI Components
- Mediation
- Component-View-Mediators Architecture

# Introduction
OpenScript is a JavaScript UI framework built to run directly in the browser like other javascript files. Because it runs in the browser like a normal JavaScript, it is highly asynchronous. You can use OJS to develop your full UI or a section of it. OJS also comes with a concept called `Component-View-Mediators` that separate UI from Frontend Logic. This makes your UI very extensible. You can use this feature of OJS only if you like.

Hello OpenScript
```js
// define a component App.js
function App(...args) {
    return h.div(
        {class: 'container py-3'},
        h.p('Hello OpenScript'),
        ...args
    );
}

// app.js
req("App");

let root = document.getElementById('root');

// render the App component in the
// root element
h.App({parent: root, resetParent: true});

```
# Installation
There are two ways to do this get OJS into your project:
1. Direct Download(recommended): Download the source file `OpenScript.Js` and the config file `ojs-config.js` and include them directly in your html files.

2. Use the CDN link: https://cdn.jsdelivr.net/gh/levizwannah/OpenScript.Js@latest/OpenScript.js. Take note of the `@latest` please change that to the version you need to avoid breaking changes. After this step, you need to create `ojs-config.js` using the following example, set the configuration of OJS.  

Include OpenScript in your project like this:
```html
<script src="js/path/to/OpenScript.js|CDN Link"></script>
<script src="js/path/to/ojs-config.js"></script>
```
### Configuration
Code in your `ojs-config.js` file:
Everything is explained, so set the values as necessary. 

```javascript
/*----------------------------------
 | Do OpenScript Configurations Here
 |----------------------------------
*/

/*-----------------------------------
 | Set the global runtime prefix.
 | This prefix will be appended
 | to every path before resolution.
 | So ensure when defining routes,
 | you have it as the main prefix.
 |------------------------------------
*/
route.runtimePrefix('');

/**----------------------------------
 * 
 * Set the default route path here
 * ----------------------------------
 */
route.basePath('/');

/*-----------------------------------
 | set the directories in which we
 | can find the context files
 |-----------------------------------
*/
ContextProvider.directory = route.baseUrl('/contexts');

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
MediatorManager.directory = route.baseUrl('/mediators');

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
loader.dir = route.baseUrl('/components');

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

autoload.dir = route.baseUrl('/');

/*-----------------------------------
 | set the version number of the
 | JS files so that we load
 | a fresh file when they change
 |-----------------------------------
*/
autoload.version = '1.0.0';

/*---------------------------------
 | Get the initial body style so
 | so that when routes change
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
broker.CLEAR_LOGS_AFTER = 30000;

/*--------------------------------
 | Set how old an event must be
 | to be deleted from the broker's
 | event log during logs clearing
 |--------------------------------
*/
broker.TIME_TO_GC = 10000;


/*-------------------------------------------
 | Start the garbage 
 | collector for the broker
 |-------------------------------------------
*/
broker.removeStaleEvents();

/*------------------------------------------
 | Should the broker display events
 | in the console as they are fired
 |------------------------------------------
*/
if(/^(127\.0\.0\.1|localhost)$/.test(route.url().hostname)) {
    broker.withLogs(true);
}
 

/**
 * ---------------------------------------------
 * Should the broker require events registration.
 * This ensures that only registered events
 * can be listened to and fire by the broker.
 * ---------------------------------------------
 */
broker.requireEventsRegistration(true);
```
## Folder Structure
There are three types of files:
- Components
- Contexts
- Mediators

The expected structure is as follows:
```
|root|
    |- mediators
        |-Folder
        |-Auth.js
        |-Blog.js
        |-...js
    |- components
        |-App.js
        |-Blog
            |-Blog.js
            |-BlogItem.js
            |-...js
        |-...
    |- contexts
        |-Folder
        |-RootContext.js
        |-...js
```
You can always use another structure, just update your config file to let OpenScript know where to find your components, mediators, and context files.

## Other JS files
OpenScript has a built in loader called `autoload`. This loads any JS file as long as the file has only declared contents such as classes and functions. If not, then the loader cannot load such file.
>Please see the ojs-config to understand how to configure the `autoload` object.

## Loading Files
Every file type in the config has a version number. This is because, the browser caches JS files, hence if you change them, you want to update the versions so that a fresh file is loaded.

### Namespacing
All file loaders are of type `OpenScript.AutoLoader`. When an AutoLoader loads a file, it keeps the file in its histories to avoid requesting the file later. Therefore, when you try to load the same file more than once, only one request is made and the rest of the loads only returns the kept file content.

To avoid file clashes, the AutoLoader put the files in a namespace that is similar to the folder structure.

For example, a class file with path `js/classes/user/User.js` will be placed in `window.js.classes.user.User`. Therefore, to accesses the class, you need to use `js.classes.user.User.User`.
>**Notice the class name is doubled at the end**.

Imagine that the `User.js` file has two user classes declared in it: `User` and `Admin`. Therefore, it now makes sense to use the file name as part of the namespace because it make contain multiple classes. In the above example, we will use `js.classes.user.User.Admin` to access the admin class.

However, `AutoLoaders` return a map with key-values pairs. Each Key represent 1 declaration in the file. For our example, the `AutoLoader` will return
```javascript
new Map([
    [
        "js.classes.User.User",
        [
            "User", // class name
            `class User`, // class
        ]
    ],
    [
        "js.classes.User.Admin",
        [
            "Admin", // class name
            `class Admin` // class
        ]
    ]
])
```
So if you want to create a new object of he loaded class, you know how to find it.
>Loading is async, so ensure to use async/await or promises.

### Loading Files
You can use the `.` notation to specify the file path. Keep in mind this will become the namespace of the file.
```js
autoload.req("Folder.folder.fOlder.File"); // throws exception when file is missing
autoload.include("folder.File"); // throws no exception when file is missing.
```

### Loading other JS files
The later sections will explain how to load the various types of files. However, if you want to load any other type of file, provided you have configured the root director of the `autoload` object, use the below code.
```javascript
// folder structure
|root
    |-classes
        |-Utility.js

// ojs-config.js
...
autoload.dir = route.baseUrl('classes');
autoload.version = '1.0.0';

// loading
await autoload.req('Utility')

// access the loaded file here
let Utility = new js.classes.Utility();

```
# UI
## Components

## States

## Context

# Frontend Logic + UX
## Events

## Broker

## Mediators

## Component-View-Mediators Architecture (CVM)

# Building Single Page Applications (SPA)

## Routing

# Putting It Together

# Engineering
You really expect me to write this section?

Author: Levi Kamara Zwannah 
Contributors: Jesse Richard


