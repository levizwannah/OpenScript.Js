
/**
 * The OpenScript Namespace
 */
var OpenScript = {

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
            this.emit('pre-mount');

            h.component(this.name, this);
            this.bind();

            this.emit('mounted');
        }

        /**
         * Emits an event
         * @param {string} event 
         * @param {Array<*>} args 
         */
        emit(event, args) {
            this.emitter.emit(event, this, args = []);
        }

        /**
         * Binds this component to the elements on the dom.
         * @emits pre-bind
         * @emits markup-bound 
         * @emits bound
         */
        async bind() {
            
            this.emit('pre-bind');

            let all = h.dom.querySelectorAll(`ojs-${this.name.toLowerCase()}-tmp`);



            for(let elem of all) {

                let hId = elem.getAttribute('ojs-key');
                let args = [...h.compArgs.get(hId)];

                this.wrap(...args, {parent: elem});
                
                this.emit('markup-bound', [elem, args]);
            }

            this.emit('bound');

            return true;
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
            let final = {index: -1, parent: null, states: [] };

            for(let i in args){

                if(!(args[i] instanceof DocumentFragment 
                    || args[i] instanceof HTMLElement) && args[i].parent ) {
                    final.index = i;
                    final.parent = args[i].parent;

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
            let { index, parent, states } = this.getParentAndListen(args);
            
            // check if the render was called due to a state change
            if(lastArg && lastArg['called-by-state-change']) {

                let state = lastArg.self;

                delete args[index];

                let current = h.dom.querySelectorAll(`ojs-${this.name.toLowerCase()}[s-${state.id}="${state.id}"]`) ?? [];

                current.forEach(e => {
                    e.textContent = "";

                    let arg = this.argsMap.get(e.getAttribute("uuid"));

                    this.render(...arg, { parent: e });

                    this.emit('re-rendered', arg);
                });

                return;
            }

            let uuid = `${OpenScript.Component.uid++}-${(new Date()).getTime()}`;

            this.argsMap.set(uuid, args ?? []);

            let attr = {uuid, parent};

            states.forEach((s) => {
                attr[`s-${s.id}`] = s.id;
            });

            return h[`ojs-${this.name}`](attr, this.render(...args));
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
                 * @returns 
                 */
                render(state , ...args ) {
                    return h[`ojs-wrapper`](state.value, ...args);
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
         * @param {string} referenceName 
         * @param {string} qualifiedName 
         * @param {boolean} fetch
         */
        load(referenceName, qualifiedName, fetch = false) {
            let c = this.map.get(referenceName);

            if(!c) {
                this.map.set(referenceName, new OpenScript.Context());
            }

            this.put(referenceName, qualifiedName, fetch);

            return this.map.get(referenceName);
        }

        /**
         * Adds a Context Path to the Map
         * @param {string} referenceName  
         * @param {string} qualifiedName The Context File path, ignoring the context directory itself.
         * @param {boolean} fetch Should the file be fetched from the backend
         * @param {boolean} load Should this context be loaded automatically
         */
        put = async (referenceName, qualifiedName, fetch = false) => {
            let c = this.map.get(referenceName);

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
                    Context = OpenScript.Context;
                }
                
                try{
                    let cxt = new Context();
                    
                    /**
                     * Update States that should be updated
                     */
                    if(shouldFetch) cxt.reconcile(this.map, referenceName);

                    this.map.set(referenceName, cxt);
                }
                catch(e) {
                    console.error(`Unable to load ${referenceName} because it already exists in the window. Please ensure that you are loading your contexts before your components`);
                }
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
         * Sets all the initial values in state
         * so that upon load, they can cause DOM re-rendering
         * @param {object} obj 
         */
        states(obj = {}) {
            for(let k in obj) {
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
        static state(value = null){
            
            return OpenScript.ProxyFactory.make(
                class extends OpenScript.State {
                    
                    value = value;

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
                    
                        if(prop === "value" && target.value !== value) {

                            Reflect.set(...arguments);

                            target.$__changed__ = true;

                            target.fire();

                            return;
                        }

                        if(prop !== "listeners" && prop !== "signature" && target.value[prop] !== value) {
                            
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
         */
        compMap = new Map();

        /**
         * Keeps the components arguments
         */
        compArgs = new Map();

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
    
            let parent = null;
            let emptyParent = false;
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
    
                    if(k === "parent" && obj[k] instanceof HTMLElement) {
                        parent = obj[k]; continue;
                    }

                    if(k === "resetParent" && typeof obj[k] === "boolean") {
                        emptyParent = obj[k]; continue;
                    }
    
                    let val = `${obj[k]}`
                    if(Array.isArray(obj[k])) val = `${obj[k].join(' ')}`;
    
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
                if(emptyParent) parent.textContent = '';

                parent.append(finalRoot);
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
         * Creates an anonymous component
         * around a state
         * @param {OpenScript.State} state 
         * @returns 
         */
        $anonymous = (state) => {
            return h[OpenScript.Component.anonymous()](state);
        }
    
        /**
         * Converts a value to HTML element;
         * @param {string|HTMLElement} value 
         */
        toElement = (value) => {

            if(value instanceof DocumentFragment || value instanceof HTMLElement) {
                return value;
            }

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
            * @param {string} className script name without the .js.
            */
        async require(className){
            
            let names = className.split(/\./);
            let obj;

            for(let n of names){

                if(!obj) {
                    obj = window[n];
                    continue;
                }
                
                if(!obj) {
                    obj = null;
                    break;
                } 

                obj = obj[n];
            }

            if(obj) return obj;
    
            let response = await fetch(`${this.dir}/${this.normalize(className)}${this.extension}?v=${this.version}`);
    
            let jsCode = await response.text();

            let inheritance = jsCode.match(/extends[\s\n]+\s*.+\s*[\s\n]+\{/);

            if(inheritance) {

                let parent = inheritance[0].replace(/[\n\s\{]+/g, " ");
                parent = parent.replace(/extends/g, "").trim();

                if(!this.exists(parent)) {
                    await this.require(parent);
                }
            }

            return await this.setFile(names, Function( `return (${jsCode})`)());
        }
    
        async include(className){

            try{ 
                return await this.require(this.normalize(className));
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
         * @returns 
         */
        v = (state) => h.$anonymous(state);
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
        require  = async (qualifiedName) => {
            return await this.loader.require(qualifiedName);
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
    require,

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
    fetchContext

} = new OpenScript.Initializer();


