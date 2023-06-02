class __MarkupEngine__ {
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
     * @param {Function<Array>} callback the callback for rendering.
     * 
     * 
     * @return HTMLElement
     */
    component = (name, callback = (...args) => {}) => {
        if(!(typeof name === "string")) throw Error(`A Component's name must be a string: type '${typeof name}' given`);

        this.compMap.set(name, (...args) => this.toElement( callback(...args) ))
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
            return this.compMap.get(name)(...args);
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
                
                root.setAttribute(k, val);
            }
        }

        for(let arg of args){
            
            if(Array.isArray(arg)) throw Error(`An Element's argument cannot be of type array. Passed Array to element creation of type '${name}'`);

            if(arg instanceof HTMLElement) {
                root.appendChild(arg); continue;
            }

            if(typeof arg === "object") parseAttr(arg);

            if(typeof arg === "string") root.innerHTML += this.toElement(arg);
        }

        if(parent) return parent.appendChild(root);

        return root;
    }

    /**
     * Executes a function that returns an
     * HTMLElement and adds that element to the overall markup.
     * @param {function} f - This function should return an HTMLElement or a string
     * markup of **a single HTML element**
     * @returns {HTMLElement}
     */
    call = (f = () => `<jsm-group></jsm-group>`) => {
        return this.toElement(f());
    }

    /**
     * Converts a value to HTML element;
     * @param {string|HTMLElement} value 
     */
    toElement(value){
        if(value instanceof HTMLElement) return value;

        let tmp = this.dom.createElement("jsm-group");
        tmp.innerHTML = value;

        if(tmp.children.length > 1) return tmp;

        if(tmp.children.length === 0 
            && 
           tmp.firstChild.nodeName === "#text"
        ) return value;

        
        return tmp.children[0];
    }
}

/**
 * Handler for the MarkupEngine
 */
class __MarkupHandler__ {
    
    /**
     * The reserved properties of the Markup engine
     */
    reserved = new Map();

    static proxyInstance = null;

    constructor(){
        let keys = Object.keys(new __MarkupEngine__());
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
     * @returns {__MarkupEngine__}
     */
    static proxy(){
        if(!__MarkupHandler__.proxyInstance) __MarkupHandler__.proxyInstance = new Proxy(new __MarkupEngine__(), new __MarkupHandler__());

        return __MarkupHandler__.proxyInstance;
    }
}

var jm = __MarkupHandler__.proxy();
