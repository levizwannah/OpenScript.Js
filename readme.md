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
// define a component
class App extends OpenScript.Component
{
    render(...args) {
        return h.div(
            {class: 'container py-3'},
            h.p('Hello OpenScript'),
            ...args
        );
    }
}

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

Full documentation at: https://levizwannah.github.io/OpenScript.Js

Author: Levi Kamara Zwannah 
Contributors: Jesse Richard


