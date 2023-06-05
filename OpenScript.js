
/**
 * The OpenScript Namespace
 */
var OpenScript = {
    
    /**
     * Base Component Class
     */
    Component: class {

        /**
         * Name of the component
         */
        name;

        /**
         * The argument Map for rerendering on state changes
         */
        argsMap = new Map();


        constructor() {
            this.name = this.constructor.name;
        }

        /**
         * Initializes the component and adds it to
         * the component map of the markup engine
         */
        async mount(){
            h.component(this.name, this);
        }

        /**
         * Renders the Element and returns an HTML Element
         * @param  {...any} args 
         * @returns {HTMLElement|String|Array<HTMLElement|String>}
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
            let final = {index: -1, parent: null };

            for(let i in args){

                if(!(args[i] instanceof HTMLElement) 
                    && args[i].parent ) final = { index: i, parent: args[i].parent };

                if(args[i] instanceof OpenScript.State) {
                    args[i].listener(this);
                } 
            }

            return final;
        }

        wrap(...args) {

            const lastArg = args[args.length - 1];

            let { index, parent } = this.getParentAndListen(args);

            // check if the render was called due to a state change
            if(lastArg && lastArg['called-by-state-change']) {

                delete args[index];

                let current = h.dom.querySelectorAll(`ojs-${this.name.toLowerCase()}`) ?? [];
                
                current.forEach(e => {
                    e.textContent = "";

                    let arg = this.argsMap.get(e.getAttribute("uuid"));

                    this.render(...arg, { parent: e });

                });

                return;
            }

            let uuid = `${(new Date()).getTime()}${Math.floor(Math.random() * 100000)}`;

            this.argsMap.set(uuid, args ?? []);

            return h[`ojs-${this.name}`]({ uuid, parent }, this.render(...args));
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
         * Adds a Context Path to the Map
         * @param {string} referenceName  
         * @param {string} qualifiedName The Context File path, ignoring the context directory itself.
         * @param {boolean} load Should this context be loaded automatically
         */
        put = async (referenceName, qualifiedName) => {
            if(!this.map.has(referenceName)){
                let Context =  await (new OpenScript
                    .AutoLoader(
                        OpenScript.
                        ContextProvider.
                        directory,
                        OpenScript
                        .ContextProvider
                        .version )).include(qualifiedName);
    
               
                if(!Context) {
                    Context = OpenScript.Context;
                }
                
                this.map.set(referenceName, new Context());
    
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

        constructor() {
            this.__contextName__ = this.constructor.name + "Context";
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
    },

    /**
     * The main State class
     */
    State: class {
        
        /**
         * The value of the state
         */
        value;

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

                    constructor() {
                        super();
                    }

                    push = (...args) => {
                        if(!Array.isArray(this.value)) return;

                        this.value.push(...args);
                        this.fire();
                    }

                }, 
                class {
                
                    set(target, prop, value) {
                    
                        if(prop === "value" && target.value !== value) {

                            Reflect.set(...arguments);
                            target.fire();

                            return;
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
     * Base Markup Engine Class
     */
    MarkupEngine: class {
        /**
         * Keeps the components
         */
        compMap = new Map();
    
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
         * Removes an already registered company
         * @param {string} name 
         * @returns {boolean}
         */
        deleteComponent(name){
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
            let root = this.dom.createElement(name);
    
            let parseAttr = (obj) => {
    
                for(let k in obj){
    
                    if(k === "parent" && obj[k] instanceof HTMLElement) {
                        parent = obj[k]; continue;
                    }
    
                    let val = `${obj[k]}`
                    if(Array.isArray(obj[k])) val = `${obj[k].join(' ')}`;
    
                    k = k.replace(/_/g, "-");

                    if(k.toLowerCase() === "class") val = root.getAttribute(k) ?? "" + ` ${val}`;

                    root.setAttribute(k, val);
                }
            }
    
            for(let arg of args){
    
                if(Array.isArray(arg)) {
                    arg.forEach(e => root.appendChild(this.toElement(e)));
                    continue;
                }
    
                if(arg instanceof HTMLElement) {
                    root.appendChild(arg); continue;
                }
    
                if(typeof arg === "object") {
                    
                    parseAttr(arg); continue;
                }
    
                root.appendChild(this.toElement(arg));
            }
           
            if(parent) return parent.appendChild(root);
    
            return root;
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
         * Converts a value to HTML element;
         * @param {string|HTMLElement} value 
         */
        toElement = (value) => {
            if(value instanceof HTMLElement) return value;
    
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
            * @param {string} text 
            * @returns 
            */
        normalize(text){
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

            let obj = window[names[0]];
            let final = names.slice(1, names.length - 1);

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
         * The markup engine for OpenScript.Js
         */
        h = OpenScript.MarkupHandler.proxy();

        /**
         * Context Function
         */
        context;

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
    }
}

const {
    ojs,
    require,
    include,
    namespace,
    h,
    contextProvider,
    loader,
    context,
    state
} = new OpenScript.Initializer();


