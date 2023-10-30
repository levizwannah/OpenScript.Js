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

/*----------------------------------
* Set the default route path here.
* This will be used when files
* are loaded.
* ----------------------------------
*/
route.basePath(''); // === '/'

/*-----------------------------------
| ROUTER CONFIGURATION
|------------------------------------
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

```

Full documentation at: https://levizwannah.github.io/OpenScript.Js

Author: Levi Kamara Zwannah 
Contributors: Jesse Richard


