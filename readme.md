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
OpenScript is a JavaScript UI framework built to run directly in the browser like other javascript files. Because it runs in the browser like normal JavaScript, it is highly asynchronous. You can use OJS to develop your full UI or a section of it. OJS also comes with a concept called `Component-View-Mediators` that separate UI from Frontend Logic. This makes your UI very extensible. You can use this feature of OJS only if you like.

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

2. Use the CDN link: https://cdn.jsdelivr.net/gh/levizwannah/OpenScript.Js@latest/OpenScript.js. Take note of the `@latest` please change that to the version you need to avoid breaking changes. After this step, you need to create an `ojs-config.js` file using the following example, set the configuration of OJS.  

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
You can always use another structure, just update your config file to let OpenScript know where to find your components, mediators, and contexts files.

## Other JS files
OpenScript has a built-in loader called `autoload`. This loads any JS file as long as the file has only declared contents such as classes and functions. If not, then the loader cannot load such file.
>Please see the ojs-config to understand how to configure the `autoload` object.

## Loading Files
Every file type in the config has a version number. This is because, the browser caches JS files, hence if you change them, you want to update the versions so that a fresh file is loaded.

### Namespacing
All file loaders are of type `OpenScript.AutoLoader`. When an AutoLoader loads a file, it keeps it in its history to avoid requesting it later. Therefore, when you try to load the same file more than once, only one request is made and the rest of the loads only return the kept file content.

To avoid file clashes, the AutoLoader puts the files in a namespace similar to the folder structure.

For example, a class file with path `js/classes/user/User.js` will be placed in `window.js.classes.user.User`. Therefore, to access the class, you need to use `js.classes.user.User.User`.
>**Notice the class name is doubled at the end**.

Imagine that the `User.js` file has two user classes declared in it: `User` and `Admin`. Therefore, it now makes sense to use the file name as part of the namespace because it may contain multiple classes. In the above example, we will use `js.classes.user.User.Admin` to access the admin class.

However, `AutoLoaders` return a map with key-value pairs. Each Key represents 1 declaration in the file. For our example, the `AutoLoader` will return
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
So if you want to create a new object of the loaded class, you know how to find it.
>Loading is async, so ensure to use async/await or promises.

### Loading Files
You can use the `.` notation to specify the file path. Keep in mind this will become the namespace of the file.
```js
autoload.req("Folder.folder.fOlder.File"); // throws exception when file is missing
autoload.include("folder.File"); // throws no exception when file is missing.
```

### Loading other JS files
The later sections will explain how to load the various types of files. However, if you want to load any other type of file, provided you have configured the root directory of the `autoload` object, use the below code.
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
## OSM - OpenScript Markup
OSM allows you to write markup using Javascript method. In OJS, there is an object called `h` representing the `MarkupEngine`. You can create any element using this object similar to HTML. Just like HTML in the browser, OSM is element agnostic.

### Syntax
```javascript
h.element(
    {attributes}, 
    h.children({attributes}),
    ...
); // returns HTMLElement

h.$anSVGElement(
    {attributes},
    h.$svgChildren({attributes}),
    ...
); // returns SVGElement e.g h.$svg(...)

```
* To create an element, use `h.elementName()`.
* Attributes are key-value pairs passed to the element in objects. Replace every dash with an underscore in the attribute names.
* Add children to the element following the above guide. Note that you can also pass an array of children and attributes to an element.

### OSM Example
**HTML**
```html
<div class="container" id="div-1" data-method="holder">
    <p class="paragraph">Hello OSM</p>
    <input type="checkbox" onclick="doSomething()" id="input-1">
</div>
```
**OSM**
```javascript

h.div(
    { class: "container", id: "div-1", data_method: "holder" },
    h.p({class: "paragraph"}, "Hello OSM"), 
    h.input({ type: "checkbox", onclick: "doSomething()", id: "input-1" }),
)

```
### Special Attributes
Some attributes are special and tell OJS Markup engine to perform specific actions when rendering.

| Attribute | Value | Function |
|-----------|-------|----------| 
| parent    | HTML Element| appends the rendered OSM to the parent element.|
| resetParent| boolean| tells OJS to replace the elements in the parent with the rendered OSM.|
| replaceParent | boolean | tells OJS to replace the parent element completely with the rendered OSM |
| firstOfParent | boolean | tells OJS to place the rendered OSM as the first child of the parent element|
| c_attr | object of attributes | used as attributes for the wrapper element of a rendered OSM component|
| listeners | object of event-callback pairs | equivalent to `element.addEventListener(event, callback)`|

### Special Elements
Some elements are special in OSM because they are methods of the Markup engine itself and cannot be used as element names.

| Reserved name | Function | Usage |
|---------------|----------|-------|
| component | used to register OSM components| `h.component('BlogList', BlogList)`|
| call | used to executed a function in an OSM | `h.call(() => h.p("hello"))`|
| $ or _ | used in a component to skip the return of an OSM wrapper element | `return h.$() or h._()` |
| dom | the document object | `h.dom.getElementById('x')` |
| deleteComponent | delete a component from the Markup Engine | `h.deleteComponent('BlogList')`
| has | checks if a component exist in the Markup Engine | `h.has('BlogList')`|
| isRegistered | checks if a component is registered| `h.isRegistered('BlogList')`|
| func | used to format a function and its arguments to be used as a listener in a component| `h.func('method', [...args])`|
| on | used to add an event listener to an OSM  component | `h.on('BlogList', 'rendered', () => console.log('rendered blog list'))`|
| onAll | used to add an event listener to an OSM  component that reacts to past and future events | `h.onAll('BlogList', 'rerendered', () => console.log('still reacts event if arrived late'))`|

### Examples
Let `index.html` have a `div` with ID `root`. We will render all elements in the root.

```html
<!-- index.html -->
...
<div id="root"></div>
...

```

```js
// app.js
let root = h.dom.querySelector(`#root`);

// simple OSM
h.div(
    {
        class: "container",
        parent: root,
        resetParent: true,
    },
    h.h1("Hello H1")
);

// simple table appended to root div
// using h.call for showcase
// we could use the each function
h.table(
    { parent: root, class: "table p-4" },
    each([1, 2, 3, 4, 5], (num) => h.tr(
            { class: "row", onclick: "sayHello()" },

           each([0, 1, 2, 3, 4, 5], (i) => h.td(`Column ${i} row ${num}`)
            )
            
        )
    )
);

// getting a rendered element
let liElement = h.li({class: "list m-2"}, "Hello LI");
root.append(liElement);

```
>**Utility Functions:** The `each` function is a utility function that takes each element in an object, passes it to a callback, and put the what the callback returns in an internal array, and returns the array after execution.

In OSM, every object will be parsed as an attribute. The class attribute is specifically considered when passed more than once. For example,
```javascript
h.div({class: 'container'}, {class: 'mb-4'})
```
will be rendered as

```
<div class="container mb-4"></div>
```
However, this is not true for the other attributes. Passing them more than once will lead to overrides.
### Formatting Functions
#### For Markup
When a function is added as a listener that is available on the DOM, the function should be formatted as a string similar to how it is in `HTML` files. For example, we have a `sayHello` function and we want to add that function to an `OSM`.

```js
function sayHello(name) {
    console.log(`Hello ${name}`);
}

```
We would do so on an HTML button.
```js
<button onclick="sayHello('James')">Hello James</button>
```

In OSM
```js
h.button(
    {
        onclick: "sayHello("James")",
    },
    "Hello James"
);
```
>Components address this using the `this.method(...args)` or `this.xMethod(...args)` methods. This will be shown under the components section.  

#### Escape Formats
The arguments will be formatted such that they are parsable when placed in the `HTML` markup. for example:
- strings will have quotations around them,
- number will have no quotations
- objects will be JSONified  

However, if you want to reference the current `HTML` element on the DOM using `this`, you will have to escape it. If not, the `this` will have a string quotation or reference the object that the parsing is taking place in. To escape any argument, use `"${argument}"`. For example:

```js
h.button(
    {onclick: h.func("sayHello", "this")},
    "Hello"
);

```
Will be parsed to

```html
<button onclick="sayHello('this')">Hello</button>

```
But when escaped, you can reference the actual HTML element. See the following:

```js
h.button(
    {onclick: h.func("sayHello", "${this}")},
    "Hello"
);

```
Will be parsed to

```html
<button onclick="sayHello(this)">Hello</button>

```
#### As DOM Object Listener
You can add event listeners to a DOM element using the `listeners` attribute. The value of the  `listeners` attribute is an `object` with (key-value) `event-callbacks` pairs. The `callbacks` can be a single callback function or an array of callback functions.
>This most recommened since the number of events you can listen for with minimum hustle is unlimited.

```javascript
{
    listeners: {
        click: () => {},
        change: [recordValue, sendData, () => {'and this';}],
    }
}
```
Example:
```javascript
h.button(
    {
        listeners: {
            click: () => {console.log('hello')},
            mouseover: [(event) => doSomething(event, globalParam), justChill]
        },
        class: "btn btn-primary",
        data_bs_target: "[name='canvas-opener']"
    },
    "Open Canvas"
);

```

## Components
Components wrap UI, the methods required to render the UI, and actions specific to that UI. For example, a component could render differently based on the authentication status of a user. In OJS, it is advised to keep Component responsible for UI only. If you are to fetch data from the backend or validate user input, you want to offload that to a Mediator. Mediators will be discussed in later sections.

```js
req("App");

// render app in the root element
h.App({parent: root});
```

### Component Development
Every component extends the `OpenScript.Component` class.(That is you are using the recommened class-based Components). Your components should be placed in the components directory specified in the `ojs-config.js` file.   

Components can be class-based or functional and can be grouped together in a single file. Every component name must start with an Uppercase letter and should be `PascalCase`.

This section discusses components in detail.

##### Component Vs Views
There is only one(1) instance of a component in memory regardless of the number of times it gets rendered on the DOM. This is the difference between Components and Views. Views are the HTML markups and Components are the factories for those markups.


#### Class-based Component
Class-based components are components which are declared as classes and extend the `OpenScript.Component` class. The default name of a class based component is the name of the class. However, you can change the name by passing a name to the `super(name)` constructor in the constructor of the component class. 

There is only one required method for a component: `render(...args)`. This method must return an HTML Element or data types that can be converted to HTML elements by the Markup Engine.  

Below, we create a comment component. 
>Note that we can have more than one(1) component in the same file.

```js
// /components/Comment.js

// class based
class Comment extends OpenScript.Component 
{

    render(comment, ...args) {
        return h.div(
            {class: 'comment-container'},
            h.div(
                {class: 'comment-heading'},
                h.img({
                    class: 'avatar',
                    src: comment.owner.avatar,
                    alt: 'user profile image',
                }),
                h.span({class: 'user-name'}, comment.owner.name),
            ),
            h.div({class: 'comment-content'}, comment.content),
            h.div(
                {class: 'comment-reply'},
                h.textarea({id: `comment-reply-${comment.id}`}),
                h.button(
                    {
                        class: 'send-button',
                        onclick: h.func('sendComment', [comment])
                    },
                    'Reply'
                ),
            )
            ...args
        );
    }
}

```
>**To rename a component, simply add the constructor and pass a name to the `super` constructor. By default, the class name is the component's name.**
```js
class X extends OpenScript.Component 
{
    constructor(){
        // rename
        super('Y');
    }

    render() {
        return 'Y';
    }
}

// usages
h.Y(); // not h.X();
```
#### Functional Components
Functional components are components created using functions. They follow the naming convention but avoid the class declaration.  

When such components are loaded, these happen:
- OJS creates a component in the background.
- The name of the function is given to the created component.
- The function is then set as the render function of the created component.

For example, we can write the `Comment` component as a function.

```js
function Comment(comment, ...args) {
    
    return h.div(
        {class: 'comment-container'},
        h.div(
            {class: 'comment-heading'},
            h.img({
                class: 'avatar',
                src: comment.owner.avatar,
                alt: 'user profile image',
            }),
            h.span({class: 'user-name'}, comment.owner.name),
        ),
        h.div({class: 'comment-content'}, comment.content),
        h.div(
            {class: 'comment-reply'},
            h.textarea({id: `comment-reply-${comment.id}`}),
            h.button(
                {
                    class: 'send-button',
                    onclick: h.func('sendComment', [comment])
                },
                'Reply'
            ),
        )
        ...args
    );

}

```
##### Shortcomings of Functional Components 

* Unknown additional methods before render: You cannot have extra methods on the component that are available before rendering. This is because, when you declare a method in the render function, then JavaScript will add that method to the component when the render function is called. For example:
```js
function X(){
    this.y = () => console.log('a method');

    return h.span('Hello from X');
}
```
>y will only be available on the `X` component when it is first rendered.
* Reset method on every render: It is clear that are added in a functional component will always be reset when the component renders. Therefore, handle this appropriately.
* Load-only: Since OJS loader must do some background work to create the component, functional components must be loaded. You cannot directly include the file that has a functional component as an HTML script, they must be loaded using `req("File")` function. Else, they will not be registered as components.

You most likely want to use functional components when you have pure rendering task at hand. If the component has some UI specific procedure to handle, it's best going the class-based. Also, with the class-based components, you can create attributes you can use across renders.

##### Grouping Components
You can group components by declaring them in the same file. Both functional and class-based components can be declared in the same file. When the file is loaded, all the components in that file are registered, mounted, and bound.

```js
// Main.js
class App extends OpenScript.Component {...}

function Comment(comment, ...args) {...}

function Footer() {...}

function Header() {...}
```

>*Note*: Do not put semi-colon at the end of any declaration. This can prevent parsing. `function Header() {...};❌`

#### Rendering
##### Loading the Component
The components are in different files, therefore, they must be loaded and registered before rendering. To load a file that contains component declarations, ensure that you have set the components path in your `ojs-config` file. Then use the below code in the file you want to load the component in.

```js
// folder structure
|-components
    |-Blog
        |-List.js
        |-Comment.js
    |-App.js

// index.js
req("App");
req("Blog.List");
req("Blog.Comment");

```
The `req` function will load and register the component. Please note that it is asynchronous and will not block the thread. This is the primary reason for **Asynchronous Rendering** which we will discuss later in this documentation.  

When this function is used to load components, these components are `mounted` and `bound`. The latter is due to Asynchronous Rendering. However, it is important to know that a component must be mounted before using the Markup Engine to render it.

##### Rendering The Component
After Loading, you can render the component like other `HTML` elements using the Markup Engine. `h.ComponentName(...args)`.

```js
h.App(
    { parent: root, resetParent: true },
    h.h4("The Blog App"),

    h.BlogList(blogs), // blog list
    h.Comment(comment, { class: "mb-3" }), // comment

    h.footer(...)
); // app component

```
##### Asynchronous Rendering
Asynchronous rendering enables OJS markup engine to render the currently registered  components that are available on the DOM while leaving a hint for those that will arrive later over the network. This ensures that the user can see the rendered UI as quickly as possible.  
```js
h.App(
    { parent: root, resetParent: true },
    h.h4("The Blog App"),

    h.BlogList(blogs), // rendered
    h.Comment(comment, { class: "mb-3" }), // leave hint

    h.footer(...)
); // rendered

```
For example, in the code snippet above, if the `App` component is already registered and the `Comment` Component is still being loaded, the `App` will still render, leaving a placeholder for the `Comment` component. When the `Comment` component arrives, it will `bind` itself to each placeholder and render them accordingly.

>To avoid Janky Animation of things popping up all over the DOM, you should group Major building blocks components in one File so that they can all be registered at the same time. For example: Header, Footer, and App components. Imagine the App renders and the Header just Pop up later followed by the footer.

##### The Generated Markup - The Views
OJS wraps a component's rendered markup in a tag to show that it is a Component. After rendering, each component's tag will look like this:

```html
<ojs-app>
    <h4>The Blog App</h4>

    <ojs-blog-list>
        ...
    </ojs-blog-list>

    <ojs-comment>
        ...
    </ojs-comment>
</ojs-app> 

```
These markups are the `Views`.   

If a component renders multiple times, there will only be one of that Component in memory which controls all the `Views`. So whenever a state that this component listens to changes, it will re-render only the `Views` that depended/listens to that State, not all of its `Views`. This concept is called *Selective Reaction*.

This makes it difficult to style the `wrapper` tag since one has no direct control over it. However, you are able to style it using the OJS `c_attr` attribute.

##### Styling the Wrapper Tag
The wrapper tag makes re-rendering efficient for OJS. But wrappers are not default HTML elements and hence have no styling. But it is possible to style the wrapper tag using the `c_attr` attribute or prefixing the attribute with a `$` sign. The value of the `c_attr` is an object of attributes that should be applied to the component's wrapper element. This attribute or `$`attributes should be placed on the outermost element so that it can be applied to the wrapper. See the below example.

```javascript
// Test.js
function Test(...args) {
    return h.div(
        {
            class: "div-class",
            id: "div-id",
            $id: "ojs-test-id",
            c_attr: {
                class: "ojs-test-class",
                data_name: "test-attribute",
            }, // will be applied to the rendered Test component.
        }
        h.p("A paragraph"),
        ...args,
    );
}

```
When `Test` is rendered, this will be the final styling.
```html
<ojs-test class="ojs-test-class" id="ojs-test-id" data-name="test-attribute" >
    <div class="div-class" id="div-id" >
        <p>A paragraph</p>
    </div>
</ojs-test>

```
Every attribute that can be added to an element directly in OSM, can be added to the wrapper tag using the `c_attr` attribute on the outmost returned element. Except for the `listeners` attribute. This include event listeners such as onclick, onchange, etc.

```js
{
    c_attr: {
        onclick: this.method('hello', '${this}'),
        onchange: `sendEvent('Hello')`,
        class: 'test-class',
        data_bs_target: '[name="test"]'
    },
    $onchange: h.func("handleChange", "${this}")
    class: "element-class",
}
...
```
##### Fragments
You can get rid of the wrapper tags by using a `Fragment`. Fragments can only have 1 child element which will be the final rendered element. However, the child elements can have its own children. When there is no wrapper tag, OJS will not recognize the rendered element as a `View` that belongs to a Component, hence the element won't re-render when state changes. This means, Components that return a fragment must not listen to States.   

>Views of a component that rerender when states change must be wrapped in a wrapper tag.

Syntax
```javascript
h.$(element);
// or
h._(element);

```
For example, let's convert an HTML table to an OJS Component that returns the final table without any wrapper tags.

```javascript
function Table(data, ...args) {
    return h._(
        h.table(
            {class:  'table'},
            h.tbody(
                each(data, (value) => h.Row(value)),
            ),
            ...args
        )
    )
}

function Row(columns, ...args){
    return h.$(
        h.tr(
            each(columns, (value) => h.Column(value)),
            ...args
        )
    )
}

function Column(data, ...args) {
    return h._(
        h.td(data, ...args)
    );
}
```
```javascript
// app.js
h.App(
    h.Table([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ]),
    ...
);

```
Output
```html
<table class="table">
    <tbody>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>4</td>
            <td>5</td>
            <td>6</td>
        </tr>
        <tr>
            <td>7</td>
            <td>8</td>
            <td>9</td>
        </tr>
    </tbody>
</table>
```

##### Accessing Internal methods
Internal methods can be accessed with the `this.method(name, [...args])` function of a component. This is used for methods that should be placed on the actual `Views`. This is similar to the `h.func(name, ...args)` function and has the same specifications for arguments.

```javascript
class Test extends OJS.Component {
    increment(elem, number) {
        elem.value = elem.value - 0 + 1;
    }

    render(...args) {
        return h.div(
            {
                onclick: this.method('increment', ['${this}', 3])
            },
            "0"
        );
    }
}

```
Final output
```html
<ojs-test>
    <div onclick="component('Test').increment(this, 3)">0</div>
</ojs-test>

```
##### Accessing Other Components' Methods
Similar to the previous section, you can use the `this.xMethod('component.method', [...args])` method to access methods from other components. See below,

```js
class Test extends OJS.Component {
    increment(elem, number) {
        elem.value = elem.value - 0 + 1;
    }    
}

function Counter(...args) {
    return h.div(
        {
            onclick: this.xMethod('Test.increment', ['${this}', 3])
        },
        "0"
    );
}
```
Final output
```html
<ojs-counter>
    <div onclick="component('Test').increment(this, 3)">0</div>
</ojs-counter>

```
#### Reactivity
A component reacts to changes in states. When a `state` changes, it causes all the components listening to it to rerender. A `state` is any data that is observed for changes. States will be covered in detail in other sections of this document. The reactivity model is opt-in. That means, a component can only react to a state when it explicitly opts in. A state declared in a component is not automatically listened to by that component. In fact, states and components are independent of each other.  

##### Listening to a State
There are two ways to listen to a state:
1. Pass the state as an argument when rendering the component.
2. Pass the component to the state as an explicit listener. (this doesn't work due to selective reaction).

###### As Argument
Every state passed as an argument to a component during render is listened to by that component. You should make sure that you are handling these arguments accordingly. This is because a state has a `toString` method which will be called if it's rendered directly in a markup. (I bet you will figure this out on your own).

```js
const count = state(0);
const name = state("James");
const person = state({ name: "Levi", age: 23 });

h.Counter(count, { class: "bg-success" }); // re-renders when count changes.

h.Test(name, { class: "bg-info" }); // Generated View re-renders when name changes.
                                    // doesn't re-render when person changes

h.Test(name, person, { class: "bg-info" }); // re-renders when name changes.
                                            // re-renders when person changes.
```
###### Direct Listening
Every state has the `listener` method that accepts a component.
```js
name.listener(Test);
person.listener(Test);
count.listener(Counter);

```
>Note: Due to Selective reaction, this will not result in any views re-rendering since no View is dependent directly on the state in question. Therefore, do not use this approach.  

##### Selective Reaction
When a component reacts to a state change, it only re-renders the views that depend on the state that changed. In OJS, only one component exist in memory for all the views being rendered. That is, if you render the `Test` component multiple times, you will have multiple views but they will all be controlled by the same `Test` component. So, when a state changes, the `Test` component will only re-render the views that passed that state as a parameter during rendering. See the below example.
```javascript
h.div(
    {class: "test-div"},
    h.Test(state1, { $id: 1 }),
    h.Test(state2, { $id: 2 }),
    h.Test(state1, state2, { $id: 3 }),
)
```
Output:
```html
<div class="test-div" >
    <ojs-test id="1" s-1="1" ></ojs-test> // View 1
    <ojs-test id="2" s-2="2" ></ojs-test> // View 2
    <ojs-test id="3" s-1="1" s-2="2" ></ojs-test> // View 3
</div>

```
In the above snippet, there are three `Views` of the `Test` component rendered, each with its ID. Additionally, there are `state1` and `state2`.   
- When `state1` changes, the `Test Views` with `ID=1 and 3` will be re-rendered by the `Test` component because they depend on `state1`. It is important to note that it is the `Test` component in memory that manages the rerendering of the selected views. 
- When `state2` changes, the `Test Views` wih `ID=2 and 3` will be re-rendered by the `Test` component because they depend on `state2`.

In short, selective reaction states that only the views that depend on a state will re-render when that state changes. A view that depends on a state has the state ID on the wrapper element denoted by `s-stateId="stateId"`. For example, `... s-1="1"`.

##### Anonymous Components
Sometimes a state change should not cause a component to rerender in the application. For example, consider a Count state. When the Count state changes, you only want to rerender the number, not the whole component. In that case, use anonymous components.  

In OpenScript.Js, the `v` function, representing `valueOf` is used to create an anonymous component. The `v` indicates that you only want to use the value of a state. It passes the value of the state to a provided callback function which should return an `OSM` or a `string`. By default, it returns the value of the state.

*Syntax*
```js
v(state, callback(value) => OSM | string);
```  

*Usage*
```js
let counter = state(0);

function Clock(...args) {
    return h.div(
        {class: 'd-flex mb-3'},
        h.span('I will not rerender when counter change'),
        
        v(counter), // counter.value --> will change when counter value changes
        
        ...args
    );
}

h.Clock({
    parent: root,
    $class: 'd-block',
});

// change counter value
setTimeout(() => counter.value++, 1000);
```
You can pass a callback function to the `v` function and return a formatted string. For example, returning the time in hours:minutes:seconds.

```js
function Clock(...args) {
    return h.div(
        {class: 'd-flex mb-3'},
        h.span('I will not rerender when counter change'),
        
        v(counter, (value) => {
            let sec = value;
            let hour = Math.floor(sec / 3600);
            sec %= 3600;
            
            let minute = Math.floor(sec / 60);
            sec %= 60;

            hour = Math.floor(hour / 10) === 0 ? `0${hour}` : hour;
            minute = Math.floor(minute / 10) === 0 ? `0${minute}` : minute;
            sec = Math.floor(sec / 10) === 0 ? `0${sec}` : sec;

            let time = `${hour}:${minute}:${sec}`;

            return time;
        }),
        
        ...args
    );
}
```
> You can even return a full `OSM` from the `v` function.

##### Component Events
###### Listening to Internal Events
###### Listening to Other Components' Events
###### Late Reaction

### Component Lifecycle

#### Mounting

#### Binding

#### Rendering

#### Rerendering

### Accessing Methods from Rendered Views
#### Internal Methods

#### External Methods

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


