
/**
 * The OpenScript Namespace
 */
var OpenScript = {

    /**
     * OpenScript's Router Class
     */
    Router: class {

        /**
         * Current Prefix
         * @type {string}
         */
        __prefix = '';

        /**
         * The routes Map
         * @type {Map<string,Map<string,function>|string|function>}
         */
        map = new Map();

        /**
         * The Params in the URL
         * @type {object}
         */
        params = {}

        /**
         * The Query String
         * @type {URLSearchParams}
         */
        qs = {};

        /**
         * Should the root element be cleared?
         */
        reset;

        /**
         * The default path
         */
        path = "";

        /**
         * Default Action
         * @type {function}
         */
        defaultAction = () => {
            alert('404 File Not Found')
        }

        /**
         *  
         */
        constructor() {

            this.reset = OpenScript.State.state(false);

            window.addEventListener('popstate', () => {
                this.reset.value = true;
                this.listen();
            });
        }

        /**
         * Sets the default path
         * @param {string} path 
         * @returns 
         */
        basePath(path) {
            this.path = path;
            return this;
        }

        /**
         * Sets the default action if a route is not found
         * @param {function} action 
         */
        default(action) {
            this.defaultAction = action;
        }

        /**
         * Adds an action on URL path
         * @param {string} path 
         * @param {function} action action to perform
         */
        on(path, action) {

            const paths =`${this.path}/${this.__prefix}/${path}`.split('/');
            
            let key = null;
            let map = this.map;

            for(const cmp of paths) {

                if(cmp.length < 1) continue;

                key = /^\{\w+\}$/.test(cmp) ? '*' : cmp;

                let val = map.get(key);
                if(!val) val = [cmp, new Map()];

                map.set(key, val);
                map = map.get(key)[1];
            }

            map.set('->', [true, action]);

            return this;
        }

        /**
         * Used to add multiple routes to the same action
         * @param {Array<string>} paths 
         * @param {function} action 
         */
        orOn(paths, action){
            
            for(let path of paths) {
                this.on(path, action);
            }

            return this;
        }

        /**
         * Creates a prefix for a group of routes
         * @param {string} name 
         */
        prefix(name){

            this.__prefix = name;

            return new this.PrefixRoute(this);
        }

        /**
         * Executes the actions based on the url
         */
        listen(){
            
            let url = new URL(window.location.href);
            this.params = {};

            let paths = url.pathname.split('/');

            let map = this.map;

            for(const cmp of paths) {

                if(cmp.length < 1) continue;

                let next = map.get(cmp);

                if(!next) {
                    next = map.get('*');
                    if(next) this.params[next[0].replace(/[\{\}]/g, '')] = cmp;
                }

                if(!next) {
                    console.error(`${url.pathname} was not found`);
                    this.defaultAction();
                    return this;
                } 

                map = next[1];
            }
            
            this.qs = new URLSearchParams(url.search);

            map.get('->')[1]();
            
            this.reset.value = false;

            return this;
        }

        /**
         * Change the URL path without loading
         * @param {string} path 
         * @param {object} qs Query string
         */
        to(path, qs = {}){

            path = `${this.path}/${path}`.trim();

            let paths = path.split('/');

            path = '';

            for(let p of paths) {
                if(p.length === 0 || /^\s+$/.test(p)) continue;

                if(path.length) path += '/';

                path += p.trim();
            }

            let s = '';

            for(let k in qs) {
                if(s.length > 0) s += '&';
                s += `${k}=${qs[k]}`;
            }

            if(s.length > 0) s = `?${s}`;

            this.history().pushState({random: Math.random()}, '', `/${path}${s}`);
            this.reset.value = true;

            return this.listen();
        }

        /**
         * Gets the base URL
         * @param {string} path
         * @returns string
         */
        baseUrl(path = ''){
            return (new URL(window.location.href)).origin + 
           ( (this.path.length > 0) ? '/' + this.path: '' )  + '/' + path;
        }

        /**
         * Redirects to a page using loading
         * @param {string} to 
         */
        redirect(to){
            return window.location.href = to;
        }

        /**
         * Refreshes the current page
         */
        refresh(){
            this.history().go();
            return this;
        }

        /**
         * Goes back to the previous route
         * @returns 
         */
        back() {
           this.history().back();
           return this; 
        }

        /**
         * Goes forward to the next route
         * @returns 
         */
        forward(){
            this.history().forward();
            return this;
        }

        /**
         * Returns the Window History Object
         * @returns {History}
         */
        history(){
            return window.history;
        }


        /**
         * Allows Grouping of routes
         */
        PrefixRoute = class PrefixRoute {
            
            /**
             * Parent Router
             * @type {OpenScript.Router}
             */
            router;

            /**
             * Creates a new PrefixRoute
             * @param {OpenScript.Router} router 
             */
            constructor(router) {
                this.router = router;
            }

            /**
             * Creates a Group 
             * @param {function} func 
             * @returns {OpenScript.Router}
             */
            group(func = () => {}) {
                
                func();

                this.router.__prefix = "";

                return this.router;
            }
        }

    },

    /**
     * Event Emitter Class
     */
    Emitter: class {
        listeners = {}
        
        addListener(eventName, fn) {
          this.listeners[eventName] = this.listeners[eventName] || [];
          this.listeners[eventName].push(fn);
          return this;
        }
        // Attach event listener
        on(eventName, fn) {
          return this.addListener(eventName, fn);
        }
      
        // Attach event handler only once. Automatically removed.
        once(eventName, fn) {
          this.listeners[eventName] = this.listeners[eventName] || [];
          const onceWrapper = () => {
            fn();
            this.off(eventName, onceWrapper);
          }
          this.listeners[eventName].push(onceWrapper);
          return this;
        }
      
        // Alias for removeListener
        off(eventName, fn) {
          return this.removeListener(eventName, fn);
        }
      
        removeListener (eventName, fn) {
          let lis = this.listeners[eventName];
          if (!lis) return this;
          for(let i = lis.length; i > 0; i--) {
            if (lis[i] === fn) {
              lis.splice(i,1);
              break;
            }
          }
          return this;
        }
      
        // Fire the event
        emit(eventName, ...args) {
    
          let fns = this.listeners[eventName];
          if (!fns) return false;
          fns.forEach((f) => {
            f(...args);
          });
          return true;

        }
      
        listenerCount(eventName) {
          let fns = this.listeners[eventName] || [];
          return fns.length;
        }
      
        // Get raw listeners
        // If the once() event has been fired, then that will not be part of
        // the return array
        rawListeners(eventName) {
          return this.listeners[eventName];
        }
      
    },
    /**
     * Base Component Class
     */
    Component: class {

        /**
         * List of events that a component emits
         */
        EVENTS = {
            rendered: 'rendered', // component is visible on the dom
            rerendered: 'rerendered', // component was rerendered
            premount: 'premount', // component is ready to register
            mounted: 'mounted', // the component is now registered
            prebind: 'prebind', // the component is ready to bind
            bound: 'bound', // the component has bound
            markupBound: 'markup-bound' // a temporary markup has bound
        }
        /**
         * Name of the component
         */
        name;


        /**
         * Anonymous component ID
         */
        static aCId = 0;

        /**
         * Generate IDs for the components
         */
        static uid = 0;

        /**
         * The argument Map for rerendering on state changes
         */
        argsMap = new Map();

        /**
         * Event Emitter for the component
         */
        emitter = new OpenScript.Emitter();

        constructor() {
            this.name = this.constructor.name;
        }

        /**
         * Initializes the component and adds it to
         * the component map of the markup engine
         * @emits mounted
         * @emits pre-mount
         */
        async mount(){
            this.claimListeners();
            this.emit(this.EVENTS.premount);
            h.component(this.name, this);
            await this.bind();
            this.emit(this.EVENTS.mounted);
        }

        /**
         * Emits an event
         * @param {string} event 
         * @param {Array<*>} args 
         */
        emit(event, args = []) {
            this.emitter.emit(event, this, event, ...args);
        }

        /**
         * Binds this component to the elements on the dom.
         * @emits pre-bind
         * @emits markup-bound 
         * @emits bound
         */
        async bind() {
            
            this.emit(this.EVENTS.prebind);

            let all = h.dom.querySelectorAll(`ojs-${this.name.toLowerCase()}-tmp`);

            for(let elem of all) {

                let hId = elem.getAttribute('ojs-key');
                let args = [...h.compArgs.get(hId)];

                this.wrap(...args, {parent: elem, replaceParent: true});
                
                this.emit(this.EVENTS.markupBound, [elem, args]);
            }

            this.emit(this.EVENTS.bound);

            return true;
        }

        /**
         * Gets all the listeners for itself and adds them to itself
         */
        claimListeners() {

            if(!h.eventsMap.has(this.name)) return;

            let events = h.eventsMap.get(this.name);

            for(let event in events) {

                if(!this.emitter.listeners[event]) {
                    this.emitter.listeners[event] = events[event];
                    continue;
                } 

                this.emitter.listeners[event].push(...events[event]);
            }

            h.eventsMap.delete(this.name);
        }

        /**
         * Renders the Element and returns an HTML Element
         * @param  {...any} args 
         * @returns {DocumentFragment|HTMLElement|String|Array<DocumentFragment|HTMLElement|String>}
         */
        render(...args) {
            return h.toElement("<ojs></ojs>");
        }

        /**
         * Finds the parent in the argument list
         * @param {Array<*>} args 
         * @returns 
         */
        getParentAndListen(args){
            let final = {index: -1, parent: null, states: [], resetParent: false, replaceParent: false };

            for(let i in args){

                if(!(args[i] instanceof DocumentFragment 
                    || args[i] instanceof HTMLElement) && args[i].parent ) {

                    if(args[i].parent){
                        final.index = i;
                        final.parent = args[i].parent;
                    }
                    
                    if(args[i].resetParent){
                        final.resetParent = args[i].resetParent;
                        delete args[i].resetParent;
                    }

                    if(args[i].replaceParent) {
                        final.replaceParent = args[i].replaceParent;
                        delete args[i].replaceParent;
                    }

                    delete args[i].parent;
                }

                if(args[i] instanceof OpenScript.State) {
                    args[i].listener(this);
                    final.states.push(args[i]);
                } 
            }

            return final;
        }

        /**
         * Wraps the rendered content
         * @emits re-rendered
         * @param  {...any} args 
         * @returns 
         */
        wrap(...args) {

            const lastArg = args[args.length - 1];
            let { index, parent, resetParent, states, replaceParent } = this.getParentAndListen(args);
            
            // check if the render was called due to a state change
            if(lastArg && lastArg['called-by-state-change']) {

                let state = lastArg.self;

                delete args[index];

                let current = h.dom.querySelectorAll(`ojs-${this.name.toLowerCase()}[s-${state.id}="${state.id}"]`) ?? [];

                current.forEach(e => {
                    e.textContent = "";

                    let arg = this.argsMap.get(e.getAttribute("uuid"));

                    this.render(...arg, { parent: e, component: this, event: this.EVENTS.rerendered, eventParams: [] });
                });

                return;
            }

            let uuid = `${OpenScript.Component.uid++}-${(new Date()).getTime()}`;

            this.argsMap.set(uuid, args ?? []);

            let attr = {uuid, parent, resetParent, replaceParent};

            states.forEach((s) => {
                attr[`s-${s.id}`] = s.id;
            });

            return h[`ojs-${this.name}`](attr, this.render(...args), {
                component: this, 
                event: this.EVENTS.rendered,
                eventParams: []});
        }

        /**
         * Returns a mounted anonymous component's name.
         */
        static anonymous() {
            let id = OpenScript.Component.aCId++;
            
            let Cls = class extends OpenScript.Component {

                constructor() {
                    super();
                    this.name = `anonym-${id}`;
                }

                /**
                 * Render function takes a state
                 * @param {OpenScript.State} state 
                 * @param {Function} callback that returns the value to
                 * put in the markup
                 * @returns 
                 */
                render(state , callback, ...args ) {
                    return h[`ojs-wrapper`](callback(state), ...args);
                }
            }

            let c = new Cls();
            
            c.mount();

            return c.name;
        }

    },

    /**
     * Creates a Proxy
     */
    ProxyFactory: class {
        /**
         * Makes a Proxy
         * @param {class} Target 
         * @param {class} Handler 
         * @returns 
         */
        static make(Target, Handler){
            return new Proxy(new Target(), new Handler());
        }
    },

    /**
     * The base Context Provider
     */
    ContextProvider: class {

        /**
         * The directory in which the Context
         * files are located
         */
        static directory;

        /**
         * The version number for the network request to 
         * get updated files
         */
        static version;

        /**
         * The Global Context
         */
        globalContext = {};

        /**
         * Context mapping
         */
        map = new Map();

        /**
         * Gets the Context with the given name.
         * @note The name must be in the provider's map
         * @param {string} name 
         */
        context(name){
            return this.map.get(name);
        }

        /**
         * Asynchronously loads a context
         * @param {string|Array<string>} referenceName 
         * @param {string} qualifiedName 
         * @param {boolean} fetch
         */
        load(referenceName, qualifiedName, fetch = false) {
            if(!Array.isArray(referenceName)) referenceName = [ referenceName ];
            
            for(let name of referenceName) {
                let c = this.map.get(name);

                if(!c) {
                    this.map.set(name, new OpenScript.Context());
                }
            }

            
            this.put(referenceName, qualifiedName, fetch);

            return referenceName.length == 1 ? this.map.get(referenceName[0]) : this.map;
        }

        /**
         * Adds a Context Path to the Map
         * @param {string|Array<string>} referenceName  
         * @param {string} qualifiedName The Context File path, ignoring the context directory itself.
         * @param {boolean} fetch Should the file be fetched from the backend
         * @param {boolean} load Should this context be loaded automatically
         */
        put = async (referenceName, qualifiedName, fetch = false) => {
            if(!Array.isArray(referenceName)) referenceName = [referenceName];

            let c = this.map.get(referenceName[0]);

            let shouldFetch = false;

            if(!c || (c && !c.__fromNetwork__ && fetch)) shouldFetch = true;
            
            if(shouldFetch){
                let Context = fetch ?  await (new OpenScript
                    .AutoLoader(
                        OpenScript.
                        ContextProvider.
                        directory,
                        OpenScript
                        .ContextProvider
                        .version )).include(qualifiedName)
                        : null;
    
               
                if(!Context) {
                    Context = new Map([qualifiedName, ['_', OpenScript.Context]]);
                }

                let counter = 0;

                for(let [k, v] of Context) {

                    try{
                        let cxt = new v[1]();
                        
                        /**
                         * Update States that should be updated
                         */
                        let key = referenceName[counter] ?? cxt.__contextName__;

                        if(shouldFetch) cxt.reconcile(this.map, key);

                        this.map.set(key, cxt);
                    }
                    catch(e) {
                        console.error(`Unable to load ${referenceName} because it already exists in the window. Please ensure that you are loading your contexts before your components`, e);
                    }

                    counter++;
                }
            }
            else {
                console.log(`${referenceName[0]} already exists. If you have multiple contexts in the file in ${qualifiedName}, then you can use context('[contextName]Context') to access them.`)
            }
            
            return this.context(referenceName);
        }

        /**
         * Refreshes the whole context
         */
        refresh(){
            this.map.clear;
        }

    },

    /**
     * The Base Context Class for OpenScript
     */
    Context: class {

        /**
         * Name of the context
         */
        __contextName__;

        /**
         * Let us know if this context was loaded from the network
         */
        __fromNetwork__ = false;

        /**
         * Keeps special keys
         */
        $__specialKeys__ = new Map();

        constructor() {
            this.__contextName__ = this.constructor.name + "Context";

            for(const key in this) {
                this.$__specialKeys__.set(key, true);
            }
        }

        /**
         * Puts a value in the context
         * @param {string} name 
         * @param {*} value 
         */
        put(name, value = {}) {
            this[name] = value;
        };

        /**
         * Get a value from the context
         * @param {string} name 
         * @returns 
         */
        get(name){
            return this[name];
        }

        /**
         * Reconciles all states in the temporary context with the loaded context
         * including additional data
         * @param {Map<string,*>} map 
         * @param {string} referenceName 
         */
        reconcile(map, referenceName) {

            //console.log('reconciling', this.__contextName__);

            let cxt = map.get(referenceName);
            
            if(!cxt) return true;

            for(let key in cxt) {
                
                if(this.$__specialKeys__.has(key)) continue;

                let v = cxt[key];

                if(v instanceof OpenScript.State && !v.$__changed__) {
                    v.value = this[key]?.value ?? v.value;
                }

                this[key] = v;
            }

            this.__fromNetwork__ = true;

            return true;
        }

        /**
         * Ensures a property exist
         * @param {string} name 
         * @param {*} def 
         * @returns 
         */
        has(name, def = state({})) {
            if(!this[name]) this[name] = def;
            return this[name];
        }

        /**
         * Sets all the initial values in state
         * so that upon load, they can cause DOM re-rendering
         * @param {object} obj 
         */
        states(obj = {}) {
            for(let k in obj) {
                if(this[k]) continue;

                this[k] = state(obj[k]);
            }
        }
    },

    /**
     * The main State class
     */
    State: class {
        
        /**
         * The value of the state
         */
        value;

        /**
         * ID of this state
         */
        id;

        /**
         * Has this state changed
         */
        $__changed__ = false;

        /**
         * The count of the number of states in the program
         */
        static count = 0;

        static VALUE_CHANGED = "value-changed";
        
        /**
         * Tells the component to rerender
         */
        signature = { 'called-by-state-change': true, self: this };


        listeners = new Map();

        /**
         * Add a component that listens to this state
         * @param {OpenScript.Component} component
         * @returns 
         */
        listener(component) {
            this.listeners.set(component.name, component);
            return this;
        }
    
        /**
         * Adds a listener that is automatically removed once the event is fired
         * @param {OpenScript.Component} component 
         * @returns 
         */
        once(component) {

            const onceWrapper = {
                name: component.name,
                
                wrap:  (...args) => {

                    this.off(component.name);

                    return component.wrap(...args);
                }
            }

            this.listeners.set(component.name, onceWrapper);

            return this;
        }
    
        /**
         * Removes a Component
         * @param {OpenScript.Component} component 
         * @returns 
         */
        off(component) {
            return this.listeners.delete(component.name);
        }
    
        /**
         * Fires on state change
         * @param  {...any} args 
         * @returns 
         */
        fire(...args) {
            
            for(let [k, component] of this.listeners){
                component.wrap(...args, this.signature);
            }

            return this;
        }

        *[Symbol.iterator](){

            if(typeof this.value !== "object") {
                yield this.value;
            }
            else {
                for(let k in this.value ){
                    yield this.value[k];
                }
            }
        }

        /**
         * Creates a new State
         * @param {any} value 
         * @returns {OpenScript.State}
         */
        static state(v = null){
            
            return OpenScript.ProxyFactory.make(
                class extends OpenScript.State {
                    
                    value = v;

                    id = OpenScript.State.count++;

                    constructor() {
                        super();
                    }

                    push = (...args) => {
                        if(!Array.isArray(this.value)) return;

                        this.value.push(...args);
                        this.$__changed__ = true;

                        this.fire();
                    }

                }, 
                class {
                
                    set(target, prop, value) {
                    
                        if(prop === "value") {

                            if(target.value === value) return true;

                            Reflect.set(...arguments);

                            target.$__changed__ = true;

                            target.fire();

                            return true;
                        }

                        else if(prop !== "listeners" && prop !== "signature" && target.value[prop] !== value) {
                            
                            target.value[prop] = value;
                            target.$__changed__ = true;

                            target.fire();

                            return true;
                        }
                        
                        return Reflect.set(...arguments);
                    }

                    get(target, prop, receiver) {
                        
                        if(prop === "length" && typeof target.value === "object") {
                            return Object.keys(target.value).length;
                        }

                        if(typeof prop !== "symbol" && /\d+/.test(prop) && Array.isArray(target.value)) {
                            return target.value[prop];
                        }

                        return Reflect.get(...arguments);
                    }

                    deleteProperty(target, prop) {

                        if(typeof target.value !== "object") return false;
                        
                        if(Array.isArray(target.value)){
                            target.value = target.value.filter((v, i) => i != prop);
                        }
                        else {
                            delete target.value[prop];
                        }

                        target.fire();

                        return true;
                    }
                }
            );
        }
    },

    /**
     * Various Utility Functions
     */
    Utils: class {
        /**
         * Runs a foreach on an array
         * @param {Iterable} array 
         * @param {Function} callback 
         */
        static each = (array, callback = (v) => v) => {
            let output = [];

            for(let v of array) output.push(callback(v));

            return output;
        }

        /**
         * Iterates over array elements using setTimeout
         * @param {Iterable} array 
         * @param {Function} callback 
         */
        static lazyFor = (array, callback = (v) => v) => {
            let index = 0;

            if(array.length < 1) return;

            const iterate = () => {

                callback(array[index]);
                index++;

                if(index < array.length) return setTimeout(iterate, 0);
            }

            setTimeout(iterate, 0);
        }
    },

    /**
     * Base Markup Engine Class
     */
    MarkupEngine: class {
        /**
         * Keeps the components
         * @type {Map<string,OpenScript.Component>}
         */
        compMap = new Map();

        /**
         * Keeps the components arguments
         * @type {Map<string, Array<string|DocumentFragment|HTMLElement>}
         */
        compArgs = new Map();

        /**
         * Keeps a temporary component-events map
         * @type {Map<string,Array<Function>>}
         */
        eventsMap = new Map();

        /**
         * The IDs for components on the DOM awaiting 
         * rendering
         */
        static ID = 0;
    
        /**
         * References the DOM object
         */
        dom = window.document;
    
        /**
         * 
         * @param {string} name component name 
         * @param {OpenScript.Component} component OpenScript component for rendering.
         * 
         * 
         * @return {HTMLElement|Array<HTMLElement|String>}
         */
        component = (name, component) => {

            if(!(typeof name === "string")) {
                throw Error(`A Component's name must be a string: type '${typeof name}' given`);
            }
    
            if(!(component instanceof OpenScript.Component)) {
                throw new Error(`The component for ${name} must be an OpenScript.Component component. ${component.constructor.name} was passed`);
            }

            this.compMap.set(name, component);
        }
    
        /**
         * @emits unmount
         * Removes an already registered company
         * @param {string} name 
         * @returns {boolean}
         */
        deleteComponent(name){
            this.compMap.get(name)
            .emitter
            .emit('unmount', this.compMap.get(name));

            return this.compMap.delete(name);
        }
    
        /**
         * handles the DOM element creation
         * @param {string} name
         * @param  {...any} args
         */
        handle = (name, ...args) => {
    
            /**
             * If this is a component, return it
             */
    
            if(this.compMap.has(name)) {
                return this.compMap.get(name).wrap(...args);
            }
    
            let component;
            let event = '';
            let eventParams = [];

            /**
             * @type {DocumentFragment|HTMLElement}
             */
            let parent = null;

            let emptyParent = false;
            let replaceParent = false;
            let rootFrag = new DocumentFragment();
            let finalRoot = new DocumentFragment();

            const isUpperCase = (string) => /^[A-Z]*$/.test(string);
            let isComponent = isUpperCase(name[0]);
            let root = null;

            /**
             * When dealing with a component
             * save the argument for async rendering
             */
            if(isComponent) {
                root = this.dom.createElement(`ojs-${name}-tmp`);

                let id = `ojs-${name}-${OpenScript.MarkupEngine.ID++}`;
                root.setAttribute('ojs-key', id);

                this.compArgs.set(id, args);
            }
            else {
                root = this.dom.createElement(name);
            }
    
            let parseAttr = (obj) => {
                
                for(let k in obj){
                    let v = obj[k];
                    

                    if(v instanceof OpenScript.State){
                        v = v.value;
                    } 

                    if(k === "parent" && v instanceof HTMLElement) {
                        parent = v; continue;
                    }

                    if(k === "resetParent" && typeof v === "boolean") {
                        emptyParent = v;
                        continue;
                    }
                    
                    if(k === "event" && typeof v === "string") {
                        event = v;
                        continue;
                    }

                    if(k === "replaceParent" && typeof v === "boolean") {
                        replaceParent = v;
                        continue;
                    }

                    if(k === "eventParams") {
                        if(!Array.isArray(v)) v = [v];
                        eventParams = v;
                        continue;
                    }

                    if(k === "component" && v instanceof OpenScript.Component){
                        component = v;
                        continue;
                    }
    
                    let val = `${v}`
                    if(Array.isArray(v)) val = `${v.join(' ')}`;
    
                    k = k.replace(/_/g, "-");

                    if(k === "class" || k === "Class") val = root.getAttribute(k) ?? "" + ` ${val}`;

                    root.setAttribute(k, val);
                }
            }


            for(let arg of args){

                if(isComponent && parent) break;

                if(arg instanceof OpenScript.State) continue;

                if(Array.isArray(arg)) {
                    if(isComponent) continue;
                    arg.forEach(e => rootFrag.append(this.toElement(e)));
                    continue;
                }
    
                if(arg instanceof DocumentFragment || arg instanceof HTMLElement) {
                    if(isComponent) continue;
                    rootFrag.append(arg);
                    continue;   
                }
    
                if(typeof arg === "object") {
                    parseAttr(arg); 
                    continue;
                }

                if(isComponent) continue;
                
                let v = this.toElement(arg);
                if(typeof v !== 'undefined') rootFrag.append(v);
            }

            root.append(rootFrag);
            finalRoot.append(root);

            if(parent) {
                
                if(emptyParent){
                    parent.textContent = '';
                }

                if(replaceParent) {
                    parent.replaceWith(finalRoot);
                }
                else {
                    parent.append(finalRoot);
                }
                if(component) component.emit(event, eventParams);
                return finalRoot;
            } 
    
            return finalRoot;
        }
    
        /**
         * Executes a function that returns an
         * HTMLElement and adds that element to the overall markup.
         * @param {function} f - This function should return an HTMLElement or a string or an Array of either
         * @returns {HTMLElement|string|Array<HTMLElement|string>}
         */
        call = (f = () => `<ojs-group></ojs-group>`) => {
            return f();
        }

        /**
         * Allows you to add functions to HTML elements
         * directly from within a component
         * @param {OpenScript.Component} component 
         * @param {string} method name of the method 
         * @param  {...any} args arguments to pass to the method
         * @returns 
         */
        func = (component, method, ...args) => {
            return `h.compMap.get('${component.name}')['${method}'](${this._escape(args)})`;
        }

        /**
         * adds quotes to string arguments
         * and serializes objects for 
         * param passing
         */
        _escape = (args) => {
            let final= [];

            for(let e of args) {
                if(typeof e === "number") final.push(e);
                else if(typeof e === "string") final.push(`'${e}'`);
                else if(typeof e === "object") final.push(JSON.stringify(e));
            }

            return final;
        }

        /**
         * Adds an event listener to a component
         * @param {string|Array<string>} component component name 
         * @param {string} event event name
         * @param  {...function} listeners listeners
         */
        on = (component, event, ...listeners) =>{
            let components = component;

            if(!Array.isArray(component)) components = [component];

            for(let component of components) {
                
                if(/\./.test(component)){
                    let tmp = component.split('.').filter(e => e);
                    component = tmp[0];
                    listeners.push(event);
                    event = tmp[1];
                }

                if(this.compMap.has(component)) {
                    
                    if(!this.emitter(component).listeners[event]) {
                        this.emitter(component).listeners[event] = [];
                    }

                    this.emitter(component).listeners[event].push(...listeners);
                    continue;
                }
    
                if(!this.eventsMap.has(component)){
                    this.eventsMap.set(component, {});
                    this.eventsMap.get(component)[event] = listeners;
                    continue;
                }

                if(!this.eventsMap.get(component)[event]) {
                    this.eventsMap.get(component)[event] = [];  
                }

                this.eventsMap.get(component)[event].push(...listeners);
            }
        }

        /**
         * Gets the event emitter of a component
         * @param {string} component component name 
         * @returns 
         */
        emitter = (component) => {
            return this.compMap.get(component)?.emitter;
        }


        /**
         * Gets a component and returns it
         * @param {string} name 
         * @returns {OpenScript.Component|null}
         */
        getComponent = (name) => {
            return this.compMap.get(name);
        }

        /**
         * Creates an anonymous component
         * around a state
         * @param {OpenScript.State} state 
         * @param {Array<string>} attribute attribute path
         * @returns 
         */
        $anonymous = (state, callback = (state) => state.value) => {
            return h[OpenScript.Component.anonymous()](state, callback);
        }
    
        /**
         * Converts a value to HTML element;
         * @param {string|HTMLElement} value 
         */
        toElement = (value) => {

            if(value instanceof DocumentFragment || value instanceof HTMLElement) {
                return value;
            }

            if(value.length === 0) return this.dom.createTextNode(value);

            let tmp = this.dom.createElement("ojs-group");
            tmp.innerHTML = value;
    
            if(tmp.children.length > 1) return tmp;
    
            if(tmp.children.length === 0 
                && 
               tmp.firstChild.nodeName === "#text"
            ) return this.dom.createTextNode(value);
    
            
            return tmp.children[0];
        }
    },
    
    /**
     * Handler for the OpenScript.MarkupEngine
     */
    MarkupHandler: class {
        
        /**
         * The reserved properties of the Markup engine
         */
        reserved = new Map();
    
        static proxyInstance = null;
    
        constructor(){
            let keys = Object.keys(new OpenScript.MarkupEngine());
            keys.forEach(e => this.reserved.set(e, true));
        }
    
        get(target, prop, receiver){ 
            
            if(this.reserved.has(prop)){
                return target[prop];
            }
    
            return (...args) => target.handle(prop, ...args);
        }
    
        /**
         * For Documentation, we return a proxy of Markup Engine
         * @returns {OpenScript.MarkupEngine}
         */
        static proxy(){
            if(!OpenScript.MarkupHandler.proxyInstance) OpenScript.MarkupHandler.proxyInstance = new Proxy(new OpenScript.MarkupEngine(), new OpenScript.MarkupHandler());
    
            return OpenScript.MarkupHandler.proxyInstance;
        }
    },

    /**
     * AutoLoads a class from a file
     */
    AutoLoader: class ClassLoader {

        /**
         * Keeps track of the files that have been loaded
         */
        history = new Map();

        /**
            * The Directory or URL in which all JS files are located
            */
        dir = ".";
    
        /**
            * The extension of the files
            */
        extension = ".js";
    
        /**
            * The version of the files. It will be appended as ?v=1.0 for example
            * This enable fresh reloading if necessary
            */
        version = "1.0.0";
    
        /**
            * 
            * @param {string} dir Directory from which the file should be loaded
            * @param {string} extension the extension of the file .js by default
            */
        constructor(dir = ".", version = "1.0.0"){
            this.dir = dir;
        }

        /**
            * Changes . to forward slashes
            * @param {string|Array} text 
            * @returns 
            */
        normalize(text){
            if(text instanceof Array) {
                return text.join('/');
            }
            return text.replace(/\./g, "/");
        }
    
        /**
            * 
            * @param {string} fileName script name without the .js.
            */
        async req(fileName){
            
            let names = fileName.split(/\./);
            
            if(this.history.has(`${this.dir}.${fileName}`)) return this.history.get(`${this.dir}.${fileName}`);
            
            let response = await fetch(`${this.dir}/${this.normalize(fileName)}${this.extension}?v=${this.version}`);
    
            let classes = await response.text();

            let matches = classes.match(/class\s+[A-Za-z]+/g);
            

            // checking if there is only one class
            if(matches && matches.index) matches = [matches[0]];

            classes = classes.split(/class\s+[A-Za-z]+/g);

            let classMap = new Map();
            let codeMap = new Map();

            let prefixArray = [...names];

            let prefix = prefixArray.join('.');
            if(prefix.length > 0 && !/^\s+$/.test(prefix)) prefix += '.';
            
            classes.shift();

            for(let k in classes){
                if(classes[k].length === 0 || /^[\s+\n+\r+\t+]*$/.test(classes[k])) continue;
                
                classes[k] = classes[k].trim();
                matches[k] = matches[k].trim();
                
                let m = matches[k].match(/\s+/);
                let name = matches[k].substring(m['index'])?.trim();
            
                let key = prefix + name;
                
                classMap.set(key, [name, `${matches[k]} ${classes[k]}`]);

            }

            for(let [k, arr] of classMap){
                
                let inheritance = arr[1].match(/extends[\s\n]+\s*.+\s*[\s\n]+\{/);

                if(inheritance) {

                    let parent = inheritance[0].replace(/[\n\s\{]+/g, " ");
                    parent = parent.replace(/extends/g, "").trim();

                    let original = parent;

                    if(!/\./g.test(parent)) parent = prefix + parent;
                    
                    if(!this.exists(parent)) {

                        if(!classMap.has(parent)) {
                            await this.req(parent);
                        }
                        else {
                            let pCode = classMap.get(parent);

                            prefixArray.push(pCode[0]);

                            let code = await this.setFile(prefixArray, Function( `return (${pCode[1]})`)());

                            prefixArray.pop();

                            codeMap.set(parent, [pCode[0], code]);
                        }
                    }
                    else {
                        let replacement = inheritance[0].replace(original, parent);
                        //console.log(k, arr[1]);

                        let c = arr[1].replace(inheritance[0], replacement);
                        arr[1] = c;
                    }
                }

                if(!this.exists(k)){
                    prefixArray.push(arr[0]);

                    let code = await this.setFile(prefixArray, Function( `return (${arr[1]})`)());

                    prefixArray.pop();

                    codeMap.set(k, [arr[0], code]);
                }
            }
            
            this.history.set(`${this.dir}.${fileName}`, codeMap);

            return codeMap;
        }
    
        async include(fileName){

            try{ 
                return await this.req(fileName);
            } catch(e) {}

            return null;
        }

        /**
         * Adds a class file to the window
         * @param {Array<string>} names 
         */
        async setFile(names, content){
            OpenScript.namespace(names[0]);

            let obj = window;
            let final = names.slice(0, names.length - 1);

            for(const n of final){
                if(!obj[n]) obj[n] = {};
                obj = obj[n];
            }

            obj[ names[ names.length - 1] ] = content;

            // Init the component if it is a 
            // component

            if(content.prototype instanceof OpenScript.Component) {
                await (new content()).mount();
            } 

            return content;
        }

        /**
         * Checks if an object exists in the window
         * @param {string} qualifiedName 
         */
        exists = (qualifiedName) => {

            let names = qualifiedName.split(/\./);
            let obj = window[names[0]];

            for(let i = 1; i < names.length; i++){
                if(!obj) return false;
                obj = obj[names[i]];
            }

            if(!obj) return false;


            return true;
        }
    },

    /**
     * Adds a new Namespace to the window
     * @param {string} name 
     */
    namespace: (name) => {
        if(!window[name]) window[name] = {};
        return window[name]; 
    },

    /**
     * Wraps the function to execute
     * @param {Function} callback 
     * @returns 
     */
    wrap: async( callback ) => {
        return await callback();
    },

    /**
     * Initializes the OpenScript
     */
    Initializer: class {

        /**
         * Wrapper to write OJS codes in
         */
        ojs = OpenScript.wrap;

        /**
         * Automatically loads in class files
         */
        loader = new OpenScript.AutoLoader();

        /**
         * Used to Import any File
         */
        autoload = new OpenScript.AutoLoader();

        /**
         * Create a namespace if it doesn't exists and returns it.
         */
        namespace = OpenScript.namespace;

        /**
         * The Global Context Provider
         */
        contextProvider;

        /**
         * Creates a new State Object
         */
        state = (value) => OpenScript.State.state(value);

        /**
         * Creates an anonymous component around a state
         * @param {OpenScript.State} state 
         * @param {Function<OpenScript.State>} callback the function that returns
         * the value to put in the anonymous markup created
         * @returns 
         */
        v = (state, callback = (state) => state.value) => h.$anonymous(state, callback);
        /**
         * The markup engine for OpenScript.Js
         */
        h = OpenScript.MarkupHandler.proxy();

        /**
         * Context Function
         */
        context;

        /**
         * Open Script Context Provider
         */
        ContextProvider = OpenScript.ContextProvider;

        /**
         * The Event Emitter Class
         */
        Emitter = OpenScript.Emitter;

        /**
         * The Router class
         */
        Router = OpenScript.Router;

        /**
         * The router object
         */
        route = new OpenScript.Router();

        constructor( configs = {
            directories: {
                components: "./components",
                contexts: "./contexts"
            },

            version: "1.0.0"
        }){
            this.loader.dir = configs.directories.components;
            this.loader.version = configs.version;

            OpenScript.ContextProvider.directory = 
            configs.directories.contexts;

            OpenScript.ContextProvider.version = configs.version;

            this.contextProvider = this.createContextProvider();
            /**
             * 
             * @param {string} name 
             * @returns {OpenScript.Context}
             */
            this.context = (name) => this.contextProvider.context(name);

        }

        /**
         * @returns {OpenScript.ContextProvider}
         */
        createContextProvider(){
            return OpenScript.ProxyFactory.make(
                OpenScript.ContextProvider, 
                class {
                    set(target, prop, receiver){   
                        throw new Error("You cannot Set any Property on the ContextProvider");
                    }
                }
            );
        }

        /**
         * Loads a File into the window namespace. Throws an
         * exception
         * @param {string} qualifiedName `Namespace.SubsNamespace.Name` the file to load. Note that Namespaces represents folders. 
         * @returns {class|object|Function}
         * @throws Error if the file is not found
         */
        req  = async (qualifiedName) => {
            return await this.loader.req(qualifiedName);
        }

        /**
         * Loads a file into the Window Namespace
         * @param {string} qualifiedName `Namespace.SubNamespace.Name` the file to include
         * @returns {class|object|Function}
         */
        include  = async (qualifiedName) => {
            return await this.loader.include(qualifiedName);
        }

        /**
         * Iterates over the values of an array using set timeout.
         */
        lazyFor = OpenScript.Utils.lazyFor;

        /**
         * Iterates over each elements
         * in the array
         */
        each = OpenScript.Utils.each;

        /**
         * Adds a context without loading it from the network
         * @param {string} referenceName 
         * @param {string} qualifiedName e.g. 'Blog.Context'
         * @returns 
         */
        putContext = (referenceName, qualifiedName) => {
            return this.contextProvider.load(referenceName, qualifiedName);
        }

        /**
         * Fetch a context asynchronously over the network and reconciles it.
         * @param {string} referenceName 
         * @param {string} qualifiedName 
         * @returns 
         */
        fetchContext = (referenceName, qualifiedName) => {
            return this.contextProvider.load(referenceName, qualifiedName, true);
        }
    }
}

const {
    /**
     * The OJS wrapper function in which you write your code
     */
    ojs,

    /**
     * The function for autoloading components or files in general @throws exception
     */
    req,

    /**
     * The function for including a file without exceptions
     */
    include,

    /**
     * Function for creating an initial namespace in the window
     */
    namespace,

    /**
     * The markup engine
     */
    h,

    /**
     * The wrapper for anonymous components
     */
    v,

    /**
     * The context provider for initialize contexts and putting them in the window
     */
    contextProvider,

    /**
     * The Context Provider class
     */
    ContextProvider,

    /**
     * The underlying Autoloader for loading components
     */
    loader,

    /**
     * Gets a context from the window
     */
    context,

    /**
     * Creates a state object
     */
    state,

    /**
     * The Event Emitter Class
     */
    Emitter,

    /**
     * Lazy For-loop
     */
    lazyFor,

    /**
     * Asynchronously loads a context
     */
    putContext,

    /**
     * Fetch a Context from the network
     */
    fetchContext,

    /**
     * Iterates using the each function
     */
    each,

    /**
     * The router class
     */
    Router,

    /**
     * The router object
     */
    route,

    /**
     * Used to Autoload Files
     */
    autoload

} = new OpenScript.Initializer();


