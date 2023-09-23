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
         * @type {Array<string>}
         */
        __prefix = [""];

        /**
         * Prefix to append
         * To all the runtime URL changes
         * @type {string}
         */
        __runtimePrefix = "";

        /**
         * The routes Map
         * @type {Map<string,Map<string,function>|string|function>}
         */
        map = new Map();

        /**
         * The Params in the URL
         * @type {object}
         */
        params = {};

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
            alert("404 File Not Found");
        };

        /**
         *
         */
        constructor() {
            this.reset = OpenScript.State.state(false);

            window.addEventListener("popstate", () => {
                this.reset.value = true;
                this.listen();
            });
        }

        /**
         * Sets the global runtime prefix
         * to use when resolving routes
         * @param {string} prefix
         */
        runtimePrefix(prefix) {
            this.__runtimePrefix = prefix;
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
            const paths = `${this.path}/${this.__prefix.join(
                "/"
            )}/${path}`.split("/");

            let key = null;
            let map = this.map;

            for (const cmp of paths) {
                if (cmp.length < 1) continue;

                key = /^\{\w+\}$/.test(cmp) ? "*" : cmp;

                let val = map.get(key);
                if (!val) val = [cmp, new Map()];

                map.set(key, val);
                map = map.get(key)[1];
            }

            map.set("->", [true, action]);

            return this;
        }

        /**
         * Used to add multiple routes to the same action
         * @param {Array<string>} paths
         * @param {function} action
         */
        orOn(paths, action) {
            for (let path of paths) {
                this.on(path, action);
            }

            return this;
        }

        /**
         * Creates a prefix for a group of routes
         * @param {string} name
         */
        prefix(name) {
            this.__prefix.push(name);

            return new this.PrefixRoute(this);
        }

        /**
         * Executes the actions based on the url
         */
        listen() {
            let url = new URL(window.location.href);
            this.params = {};

            let paths = url.pathname.split("/");

            let map = this.map;

            for (const cmp of paths) {
                if (cmp.length < 1) continue;

                let next = map.get(cmp);

                if (!next) {
                    next = map.get("*");
                    if (next) this.params[next[0].replace(/[\{\}]/g, "")] = cmp;
                }

                if (!next) {
                    console.error(`${url.pathname} was not found`);
                    this.defaultAction();
                    return this;
                }

                map = next[1];
            }

            this.qs = new URLSearchParams(url.search);

            map.get("->")[1]();

            this.reset.value = false;

            broker.send("routeChanged");

            return this;
        }

        /**
         * Change the URL path without loading
         * @param {string} path
         * @param {object} qs Query string
         */
        to(path, qs = {}) {
            path = `${this.path}/${this.__runtimePrefix}/${path}`.trim();

            let paths = path.split("/");

            path = "";

            for (let p of paths) {
                if (p.length === 0 || /^\s+$/.test(p)) continue;

                if (path.length) path += "/";

                path += p.trim();
            }

            let s = "";

            for (let k in qs) {
                if (s.length > 0) s += "&";
                s += `${k}=${qs[k]}`;
            }

            if (s.length > 0) s = `?${s}`;

            this.history().pushState(
                { random: Math.random() },
                "",
                `/${path}${s}`
            );
            this.reset.value = true;

            return this.listen();
        }

        /**
         * Gets the base URL
         * @param {string} path
         * @returns string
         */
        baseUrl(path = "") {
            return (
                new URL(window.location.href).origin +
                (this.path.length > 0 ? "/" + this.path : "") +
                "/" +
                path
            );
        }

        /**
         * Redirects to a page using loading
         * @param {string} to
         */
        redirect(to) {
            return (window.location.href = to);
        }

        /**
         * Refreshes the current page
         */
        refresh() {
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
        forward() {
            this.history().forward();
            return this;
        }

        /**
         * Returns the Window History Object
         * @returns {History}
         */
        history() {
            return window.history;
        }

        /**
         * Returns the current URL
         * @returns {URL}
         */
        url() {
            return new URL(window.location.href);
        }

        /**
         * Gets the value after hash in the url
         * @returns {string}
         */
        hash() {
            return this.url().hash.replace("#", "");
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

                this.router.__prefix.pop();

                return this.router;
            }
        };
    },

    /**
     * Event Emitter Class
     */
    Emitter: class Emitter {
        listeners = {};

        /**
         * List of emitted events
         */
        emitted = {};

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
            const onceWrapper = (...args) => {
                fn(...args);
                this.off(eventName, onceWrapper);
            };
            this.listeners[eventName].push(onceWrapper);
            return this;
        }

        // Alias for removeListener
        off(eventName, fn) {
            return this.removeListener(eventName, fn);
        }

        removeListener(eventName, fn) {
            let lis = this.listeners[eventName];
            if (!lis) return this;
            for (let i = lis.length; i > 0; i--) {
                if (lis[i] === fn) {
                    lis.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        // Fire the event
        emit(eventName, ...args) {
            this.emitted[eventName] = args;

            let fns = this.listeners[eventName];
            if (!fns) return false;
            fns.forEach((f) => {
                try {
                    f(...args);
                } catch (e) {
                    console.error(e);
                }
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
     * The Broker Class
     */
    Broker: class Broker {
        /**
         * Should the events be logged as they are fired?
         */
        #shouldLog = false;

        /**
         * TIME DIFFERENCE BEFORE GARBAGE
         * COLLECTION
         */
        CLEAR_LOGS_AFTER = 10000;

        /**
         * TIME TO GARBAGE COLLECTION
         */
        TIME_TO_GC = 30000;

        /**
         * The event listeners
         * event: {time:xxx, args: xxx}
         */
        #logs = {};

        /**
         * The emitter
         */
        #emitter = new OpenScript.Emitter();

        /**
         * Add Event Listeners
         * @param {string} event
         * @param {function} listener - asynchronous function
         */
        on(event, listener) {
            if (this.#logs[event]) {
                let emitted = this.#logs[event];

                for (let i = 0; i < emitted.length; i++) {
                    listener(...emitted[i].args);
                }
            }

            return this.#emitter.on(event, listener);
        }

        /**
         * Emits an event
         * @param {string} event
         * @param  {...any} args
         * @returns
         */
        async send(event, ...args) {
            return this.emit(event, ...args);
        }

        /**
         * Broadcasts an event
         * @param {string} event
         * @param  {...any} args
         * @returns
         */
        async broadcast(event, ...args) {
            return this.send(event, ...args);
        }

        /**
         * Emits Events
         * @param {string} event
         * @param  {...any} args
         * @returns
         */
        async emit(event, ...args) {
            let events = event.split(/\s+/g);

            for(let i = 0; i < events.length; i++){
                let evt = events[i];
                if(evt.length < 1) continue;
                this.#emit(evt, ...args);
            }
        }

        async #emit(event, ...args){
            const currentTime = () => new Date().getTime();

            this.#logs[event] = this.#logs[event] ?? [];
            this.#logs[event].push({ timestamp: currentTime(), args: args });
            if (this.#shouldLog) console.log(`fired ${event}: args: `, args);

            return this.#emitter.emit(event, ...args);
        }

        /**
         * Clear the logs
         */
        clearLogs() {
            for (let event in this.#logs) {
                let d = new Date();
                let k = -1;

                for (let i in this.#logs[event]) {
                    if (
                        d.getTime() - this.#logs[event][i].timestamp >=
                        this.TIME_TO_GC
                    ) {
                        k = i;
                    }
                }

                if (k !== -1) {
                    this.#logs[event] = this.#logs[event].slice(k + 1);
                }

                if (this.#logs[event].length < 1) delete this.#logs[event];
            }
        }

        /**
         * Do Events Garbage Collection
         */
        removeStaleEvents() {
            setInterval(this.clearLogs.bind(this), this.CLEAR_LOGS_AFTER);
        }

        /**
         * If the broker should display events as they are fired
         * @param {boolean} shouldLog
         */
        withLogs(shouldLog) {
            this.#shouldLog = shouldLog;
        }
    },

    /**
     * The Mediator Manager
     */
    MediatorManager: class MediatorManager {
        static directory = "./mediators";
        static version = "1.0.0";
        mediators = new Map();

        /**
         * Fetch Mediators from the Backend
         * @param {string} qualifiedName
         */
        async fetchMediators(qualifiedName) {
            let Mediator = await new OpenScript.AutoLoader(
                OpenScript.MediatorManager.directory,
                OpenScript.MediatorManager.version
            ).include(qualifiedName);

            if (!Mediator) {
                Mediator = new Map([qualifiedName, ["_", OpenScript.Mediator]]);
            }

            for (let [k, v] of Mediator) {
                try {
                    if (this.mediators.has(k)) continue;

                    let mediator = new v[1]();
                    mediator.register();

                    this.mediators.set(k, mediator);
                } catch (e) {
                    console.error(`Unable to load '${k}' Mediator.`, e);
                }
            }
        }
    },

    /**
     * The Mediator Class
     */
    Mediator: class Mediator {
        async register() {
            let obj = this;
            let seen = new Set();

            do {
                if (!(obj instanceof OpenScript.Mediator)) break;

                for (let method of Object.getOwnPropertyNames(obj)) {
                    if (seen.has(method)) continue;

                    if (typeof this[method] !== "function") continue;
                    if (method.length < 3) continue;

                    if (method.substring(0, 2) !== "$$") continue;

                    let events = method
                        .substring(2)
                        .split(/_/g)
                        .filter((a) => a.length > 0);

                    for (let ev of events) {
                        if (ev.length === 0) continue;

                        broker.on(ev, this[method].bind(this));
                    }

                    seen.add(method);
                }
            } while ((obj = Object.getPrototypeOf(obj)));
        }

        /**
         * Emits an event through the broker
         * @param {string} event
         * @param  {...string} args data to send
         */
        send(event, ...args) {
            broker.send(event, ...args);
            return this;
        }

        /**
         * Emits/Broadcasts an event through the broker
         * @param {string} event
         * @param  {...any} args
         */
        broadcast(event, ...args) {
            return this.send(event, ...args);
        }

        /**
         * parses a JSON string
         * `JSON.parse`
         * @param {string} JSONString
         * @returns
         */
        parse(JSONString) {
            return JSON.parse(JSONString);
        }

        /**
         * Stringifies a JSON Object
         * `JSON.stringify`
         * @param {object} object
         * @returns
         */
        stringify(object) {
            return JSON.stringify(object);
        }
    },

    /**
     * A Broker Listener
     */
    Listener: class Listener {
        /**
         * Registers with the broker
         */
        async register() {
            let obj = this;
            let seen = new Set();

            do {
                if (!(obj instanceof OpenScript.Listener)) break;

                for (let method of Object.getOwnPropertyNames(obj)) {
                    if (seen.has(method)) continue;

                    if (typeof this[method] !== "function") continue;
                    if (method.length < 3) continue;

                    if (method.substring(0, 2) !== "$$") continue;

                    let events = method
                        .substring(2)
                        .split(/_/g)
                        .filter((a) => a.length > 0);

                    for (let ev of events) {
                        if (ev.length === 0) continue;

                        broker.on(ev, this[method].bind(this));
                    }

                    seen.add(method);
                }
            } while ((obj = Object.getPrototypeOf(obj)));
        }
    },

    /**
     * The Event Data class
     */
    EventData: class EventData {
        /**
         * The Meta Data
         */
        _meta = {};

        /**
         * Message containing the args
         */
        _message = {};

        meta(data) {
            this._meta = data;
            return this;
        }

        message(data) {
            this._message = data;
            return this;
        }

        /**
         * Convert the Event Schema to string
         * @returns {string}
         */
        encode() {
            return JSON.stringify(this);
        }

        /**
         * JSON.parse
         * @param {string} str
         * @returns {EventData}
         */
        static decode(str) {
            return JSON.parse(str);
        }
        /**
         * Parse and Event Data
         * @param {string} eventData
         * @returns
         */
        static parse(eventData) {
            let ed = OpenScript.EventData.decode(eventData);

            if (!"_meta" in ed) ed._meta = {};
            if (!"_message" in ed) ed._message = {};

            return {
                meta: {
                    ...ed._meta,
                    has: function (key) {
                        return key in this;
                    },
                    get: function (key, def = null) {
                        return this[key] ?? def;
                    },
                    put: function (key, value) {
                        this[key] = value;
                        return this;
                    },
                },
                message: {
                    ...ed._message,
                    has: function (key) {
                        return key in this;
                    },
                    get: function (key, def = null) {
                        return this[key] ?? def;
                    },
                    put: function (key, value) {
                        this[key] = value;
                        return this;
                    },
                },
                encode: function () {
                    return eData(this.meta, this.message);
                },
            };
        }
    },

    /**
     * Base Component Class
     */
    Component: class Component {
        /**
         * List of events that the component emits
         */
        EVENTS = {
            rendered: "rendered", // component is visible on the dom
            rerendered: "rerendered", // component was rerendered
            premount: "premount", // component is ready to register
            mounted: "mounted", // the component is now registered
            prebind: "prebind", // the component is ready to bind
            bound: "bound", // the component has bound
            markupBound: "markup-bound", // a temporary markup has bound

            beforeHidden: "before-hidden",
            hidden: "hidden",
            unmounted: "unmounted", // removed from the markup engine memory
            beforeVisible: "before-visible", // before the markup is made visible
            visible: "visible", // the markup is now made visible
        };

        /**
         * List of all components that are listening to
         * specific events
         */
        listening = {};

        /**
         * All the states that this component is listening to
         * @type {object<OpenScript.State>}
         */
        states = {};

        /**
         * List of components that this component is listening
         * to.
         */
        listeningTo = {};

        /**
         * Name of the component
         */
        name;

        /**
         * Has the component being mounted
         */
        mounted = false;

        /**
         * Has the component bound
         */
        bound = false;

        /**
         * Has the component rendered
         */
        rendered = false;

        /**
         * Has the component rerendered
         */
        rerendered = false;

        /**
         * Is the component visible
         */
        visible = true;

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

        constructor(name = null) {
            this.name = name ?? this.constructor.name;

            this.emitter.once(
                this.EVENTS.rendered,
                (th) => (th.rendered = true)
            );
            this.emitter.on(this.EVENTS.hidden, (th) => (th.visible = false));
            this.emitter.on(
                this.EVENTS.rerendered,
                (th) => (th.rerendered = true)
            );
            this.emitter.on(this.EVENTS.bound, (th) => (th.bound = true));
            this.emitter.on(this.EVENTS.mounted, (th) => (th.mounted = true));
            this.emitter.on(this.EVENTS.visible, (th) => (th.visible = true));

            this.getDeclaredListeners();
        }

        /**
         * Make the component's method accessible from the
         * global window
         * @param {string} methodName - the method name
         * @param {[*]} args - arguments to pass to the method
         * To pass a literal string param use '${param}' in the args.
         * For example ['${this}'] this will reference the DOM element.
         */
        method(name, args) {
            if (!Array.isArray(args)) args = [args];

            return h.func(this, name, ...args);
        }

        /**
         * Get an external Component's method
         * to add it to a DOM Element
         * @param {string} componentMethod `Component.method` e.g. 'MainNav.notify'
         * @param {[*]} args
         */
        xMethod(componentMethod, args) {
            let splitted = componentMethod
                .trim()
                .split(/\./)
                .map((a) => a.trim());

            if (splitted.length < 2) {
                console.error(
                    `${componentMethod} has syntax error. Please use ComponentName.methodName`
                );
            }

            return component(splitted[0]).method(splitted[1], args);
        }

        /**
         * Adds a Listening component
         * @param {event} event
         * @param {OpenScript.Component} component
         */
        addListeningComponent(component, event) {
            if (this.emitsTo(component, event)) return;

            if (!this.listening[event]) this.listening[event] = new Map();
            this.listening[event].set(component.name, component);

            component.addEmittingComponent(this, event);
        }

        /**
         * Adds a component that this component is listening to
         * @param {string} event
         * @param {OpenScript.Component} component
         */
        addEmittingComponent(component, event) {
            if (this.listensTo(component, event)) return;

            if (!this.listeningTo[component.name])
                this.listeningTo[component.name] = new Map();

            this.listeningTo[component.name].set(event, component);

            component.addListeningComponent(this, event);
        }

        /**
         * Checks if this component is listening
         * @param {string} event
         * @param {OpenScript.Component} component
         */
        emitsTo(component, event) {
            return this.listening[event]?.has(component.name) ?? false;
        }

        /**
         * Checks if this component is listening to the other
         * component
         * @param {*} event
         * @param {*} component
         */
        listensTo(component, event) {
            return this.listeningTo[component.name]?.has(event) ?? false;
        }

        /**
         * Deletes a component from the listening array
         * @param {string} event
         * @param {OpenScript.Component} component
         */
        doNotListenTo(component, event) {
            this.listeningTo[component.name]?.delete(event);

            if (this.listeningTo[component.name].size == 0) {
                delete this.listeningTo[component.name];
            }

            if (!component.emitsTo(this, event)) return;

            component.doNotEmitTo(this, event);
        }

        /**
         * Stops this component from emitting to the other component
         * @param {string} event
         * @param {OpenScript.Component} component
         * @returns
         */
        doNotEmitTo(component, event) {
            this.listening[event]?.delete(component.name);

            if (!component.listensTo(this, event)) return;
            component.doNotListenTo(this, event);
        }

        /**
         * Get all Emitters declared in the component
         */
        getDeclaredListeners() {
            let obj = this;
            let seen = new Set();

            do {
                if (!(obj instanceof OpenScript.Component)) break;

                for (let method of Object.getOwnPropertyNames(obj)) {
                    if (seen.has(method)) continue;

                    if (typeof this[method] !== "function") continue;
                    if (method.length < 3) continue;

                    if (method[0] !== "$") continue;

                    if (method[1] !== "$" && method[1] !== "_") continue;

                    if (method[1] === "$") {
                        let events = method
                            .substring(2)
                            .split(/_/g)
                            .filter((a) => a.length);

                        for (let i = 0; i < events.length; i++) {
                            broker.on(events[i], this[method].bind(this));
                        }

                        continue;
                    }

                    let meta = method.substring(1).split(/\$/g);

                    let events = meta[0].split(/_/g);
                    events.shift();
                    let cmpName = this.name;

                    let subjects = meta.slice(1);

                    if (!subjects?.length) subjects = [this.name, "on"];

                    let methods = { on: true, onAll: true };

                    let stack = [];

                    for (let i = 0; i < subjects.length; i++) {
                        let current = subjects[i];
                        stack.push(current);

                        while (stack.length) {
                            i++;
                            current = subjects[i] ?? null;

                            if (current && methods[current]) {
                                stack.push(current);
                            } else {
                                stack.push("on");
                                i--;
                            }

                            let m = stack.pop();
                            let cmp = stack.pop();

                            for (let j = 0; j < events.length; j++) {
                                let ev = events[j];

                                if (!ev.length) continue;

                                h[m](cmp, ev, (component, event, ...args) => {
                                    try {
                                        h
                                            .getComponent(cmpName)
                                            [method]?.bind(
                                                h.getComponent(cmpName)
                                            )(component, event, ...args);
                                    } catch (e) {
                                        console.error(e);
                                    }
                                });
                            }
                        }
                    }

                    seen.add(method);
                }
            } while ((obj = Object.getPrototypeOf(obj)));
        }
        /**
         * Initializes the component and adds it to
         * the component map of the markup engine
         * @emits mounted
         * @emits pre-mount
         */
        async mount() {
            h.component(this.name, this);

            this.claimListeners();
            this.emit(this.EVENTS.premount);
            await this.bind();
            this.emit(this.EVENTS.mounted);
        }

        /**
         * Deletes all the component's markup from the DOM
         */
        unmount() {
            let all = this.markup();

            for (let elem of all) {
                elem.remove();
            }

            for (let event in this.listening) {
                for (let [_name, component] of this.listening[event]) {
                    component.doNotListenTo(this, event);
                }
            }

            for (let id in this.states) {
                this.states[id]?.off(this);
                delete this.states[id];
            }

            return true;
        }

        /**
         * Checks if this component has
         * elements on the dom and if they are
         * visible
         */
        checkVisibility() {
            let elem = h.dom.querySelector(`ojs-${this.kebab(this.name)}`);

            if (
                elem &&
                elem.parentElement?.style.display !== "none" &&
                !this.visible
            ) {
                return this.show();
            }

            if (
                elem &&
                elem.parentElement?.style.display === "none" &&
                this.visible
            ) {
                return this.hide();
            }

            if (
                elem &&
                elem.style.display !== "none" &&
                elem.style.visibility !== "hidden" &&
                !this.visible
            ) {
                this.show();
            }

            if (
                (!elem ||
                    elem.style.display === "none" ||
                    elem.style.visibility === "hidden") &&
                this.visible
            ) {
                this.hide();
            }
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

            let all = h.dom.querySelectorAll(
                `ojs-${this.kebab(this.name)}-tmp--`
            );

            if (all.length < 1) {
                setTimeout(this.bind.bind(this), 500);
                return;
            }

            for (let elem of all) {
                let hId = elem.getAttribute("ojs-key");

                let args = [...h.compArgs.get(hId)];

                this.wrap(...args, { parent: elem, replaceParent: true });

                this.emit(this.EVENTS.markupBound, [elem, args]);
            }

            this.emit(this.EVENTS.bound);

            return true;
        }

        /**
         * Converts camel case to kebab case
         * @param {string} name
         */
        kebab(name) {
            let newName = "";

            for (const c of name) {
                if (c.toLocaleUpperCase() === c && newName.length > 1)
                    newName += "-";
                newName += c.toLocaleLowerCase();
            }

            return newName;
        }

        /**
         * Return all the current DOM elements for this component
         * From the parent.
         * @param {HTMLElement | null} parent
         * @returns
         */
        markup(parent = null) {
            if (!parent) parent = h.dom;

            return parent.querySelectorAll(`ojs-${this.kebab(this.name)}`);
        }

        /**
         * Hides all the markup of this component
         * @emits before-hidden
         * @emits hidden
         * @returns {bool}
         */
        hide() {
            this.emit(this.EVENTS.beforeHidden);

            let all = this.markup();

            for (let elem of all) {
                elem.style.display = "none";
            }

            this.emit(this.EVENTS.hidden);

            return true;
        }

        /**
         * Remove style-display-none from all this component's markup
         * @emits before-visible
         * @emits visible
         * @returns bool
         */
        show() {
            this.emit(this.EVENTS.beforeVisible);

            let all = this.markup();

            for (let elem of all) {
                elem.style.display = "";
            }

            this.emit(this.EVENTS.visible);

            return true;
        }

        /**
         * Ensure that the action will get called
         * even if the event was emitted previous
         * @param {string} event
         * @param {...function} listeners
         */
        onAll(event, ...listeners) {
            // check if we have previously emitted this event
            listeners.forEach((a) => {
                if (event in this.emitter.emitted)
                    a(...this.emitter.emitted[event]);

                this.emitter.on(event, a);
            });
        }

        /**
         * Add Event Listeners to that component
         * @param {string} event
         * @param {...function} listeners
         */
        on(event, ...listeners) {
            // check if we have previously emitted this event
            listeners.forEach((a) => {
                if (Array.isArray(a)) {
                    a.forEach((f) => this.emitter.on(event, f));
                    return;
                }

                this.emitter.on(event, a);
            });
        }

        /**
         * Gets all the listeners for itself and adds them to itself
         */
        claimListeners() {
            if (!h.eventsMap.has(this.name)) return;

            let events = h.eventsMap.get(this.name);

            for (let event in events) {
                events[event].forEach((listener) => {
                    let func = listener.function;

                    if (listener.type === "all") this.onAll(event, func);
                    else this.on(event, func);
                });
            }

            h.eventsMap.delete(this.name);
        }

        /**
         * Renders the Element and returns an HTML Element
         * @param  {...any} args
         * @returns {DocumentFragment|HTMLElement|String|Array<DocumentFragment|HTMLElement|String>}
         */
        render(...args) {
            return h.ojs(...args);
        }

        /**
         * Finds the parent in the argument list
         * @param {Array<*>} args
         * @returns
         */
        getParentAndListen(args) {
            let final = {
                index: -1,
                parent: null,
                states: [],
                resetParent: false,
                replaceParent: false,
            };

            for (let i in args) {
                if (
                    !(
                        args[i] instanceof DocumentFragment ||
                        args[i] instanceof HTMLElement
                    ) &&
                    args[i] &&
                    !Array.isArray(args[i]) &&
                    typeof args[i] === "object" &&
                    args[i].parent
                ) {
                    if (args[i].parent) {
                        final.index = i;
                        final.parent = args[i].parent;
                    }

                    if (args[i].resetParent) {
                        final.resetParent = args[i].resetParent;
                        delete args[i].resetParent;
                    }

                    if (args[i].replaceParent) {
                        final.replaceParent = args[i].replaceParent;
                        delete args[i].replaceParent;
                    }

                    delete args[i].parent;
                }

                if (args[i] instanceof OpenScript.State) {
                    args[i].listener(this);
                    this.states[args[i].id] = args[i];
                    final.states.push(args[i]);
                }
            }

            return final;
        }

        /**
         * Gets the value of object
         * @param {any|OpenScript.State} object
         * @returns
         */
        getValue(object) {
            if (object instanceof OpenScript.State) return object.value;
            return object;
        }

        /**
         * Wraps the rendered content
         * @emits re-rendered
         * @param  {...any} args
         * @returns
         */
        wrap(...args) {
            const lastArg = args[args.length - 1];
            let { index, parent, resetParent, states, replaceParent } =
                this.getParentAndListen(args);

            // check if the render was called due to a state change
            if (lastArg && lastArg["called-by-state-change"]) {
                let state = lastArg.self;

                delete args[index];

                let current =
                    h.dom.querySelectorAll(
                        `ojs-${this.kebab(this.name)}[s-${state.id}="${
                            state.id
                        }"]`
                    ) ?? [];

                current.forEach((e) => {
                    if (!this.visible) e.style.display = "none";
                    else e.style.display = "";
                    e.textContent = "";

                    let arg = this.argsMap.get(e.getAttribute("uuid"));

                    this.render(...arg, {
                        parent: e,
                        component: this,
                        event: this.EVENTS.rerendered,
                        eventParams: [e],
                    });
                });

                return;
            }

            let event = this.EVENTS.rendered;

            if (
                parent &&
                (this.getValue(resetParent) || this.getValue(replaceParent))
            ) {
                if (!this.markup().length) this.argsMap.clear();
                else {
                    let all = this.markup(parent);

                    all.forEach((elem) =>
                        this.argsMap.delete(elem.getAttribute("uuid"))
                    );
                }

                if (this.argsMap.size) event = this.EVENTS.rerendered;
            }

            let uuid = `${OpenScript.Component.uid++}-${new Date().getTime()}`;

            this.argsMap.set(uuid, args ?? []);

            let attr = {
                uuid,
                parent,
                resetParent,
                replaceParent,
                class: "__ojs-c-class__",
            };

            states.forEach((s) => {
                attr[`s-${s.id}`] = s.id;
            });

            if (!this.visible) attr.style = "display: none;";

            let markup = this.render(...args, { withCAttr: true });
            let cAttributes = {};

            if (markup instanceof HTMLElement) {
                cAttributes = JSON.parse(
                    markup?.getAttribute("c-attr") ?? "{}"
                );
                markup.setAttribute("c-attr", "");
            }

            attr = { ...attr, component: this, event, eventParams: [markup] };

            return h[`ojs-${this.kebab(this.name)}`](attr, markup, cAttributes);
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
                render(state, callback, ...args) {
                    return h[`ojs-wrapper`](callback(state), ...args);
                }
            };

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
        static make(Target, Handler) {
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
        context(name) {
            return this.map.get(name);
        }

        /**
         * Asynchronously loads a context
         * @param {string|Array<string>} referenceName
         * @param {string} qualifiedName
         * @param {boolean} fetch
         */
        load(referenceName, qualifiedName, fetch = false) {
            if (!Array.isArray(referenceName)) referenceName = [referenceName];

            for (let name of referenceName) {
                let c = this.map.get(name);

                if (!c) {
                    this.map.set(name, new OpenScript.Context());
                }
            }

            this.put(referenceName, qualifiedName, fetch);

            return referenceName.length === 1
                ? this.map.get(referenceName[0])
                : this.map;
        }

        /**
         * Adds a Context Path to the Map
         * @param {string|Array<string>} referenceName
         * @param {string} qualifiedName The Context File path, ignoring the context directory itself.
         * @param {boolean} fetch Should the file be fetched from the backend
         * @param {boolean} load Should this context be loaded automatically
         */
        put = async (referenceName, qualifiedName, fetch = false) => {
            if (!Array.isArray(referenceName)) referenceName = [referenceName];

            let c = this.map.get(referenceName[0]);

            let shouldFetch = false;

            if (!c || (c && !c.__fromNetwork__ && fetch)) shouldFetch = true;

            if (shouldFetch) {
                let Context = fetch
                    ? await new OpenScript.AutoLoader(
                          OpenScript.ContextProvider.directory,
                          OpenScript.ContextProvider.version
                      ).include(qualifiedName)
                    : null;

                if (!Context) {
                    Context = new Map([
                        qualifiedName,
                        ["_", OpenScript.Context],
                    ]);
                }

                let counter = 0;

                for (let [k, v] of Context) {
                    try {
                        let cxt = new v[1]();

                        /**
                         * Update States that should be updated
                         */
                        let key = referenceName[counter] ?? cxt.__contextName__;

                        if (shouldFetch) cxt.reconcile(this.map, key);

                        this.map.set(key, cxt);
                    } catch (e) {
                        console.error(
                            `Unable to load '${referenceName}' context because it already exists in the window. Please ensure that you are loading your contexts before your components`,
                            e
                        );
                    }

                    counter++;
                }
            } else {
                console.warn(
                    `[${referenceName}] context already exists. If you have multiple contexts in the file in ${qualifiedName}, then you can use context('[contextName]Context') or the aliases you give them to access them.`
                );
            }

            return this.context(referenceName);
        };

        /**
         * Refreshes the whole context
         */
        refresh() {
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

            for (const key in this) {
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
        }

        /**
         * Get a value from the context
         * @param {string} name
         * @returns
         */
        get(name) {
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

            if (!cxt) return true;

            for (let key in cxt) {
                if (this.$__specialKeys__.has(key)) continue;

                let v = cxt[key];

                if (v instanceof OpenScript.State && !v.$__changed__) {
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
            if (!this[name]) this[name] = def;
            return this[name];
        }

        /**
         * Sets all the initial values in state
         * so that upon load, they can cause DOM re-rendering
         * @param {object} obj
         */
        states(obj = {}) {
            for (let k in obj) {
                if (this[k]) continue;

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
        signature = { "called-by-state-change": true, self: this };

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

                wrap: (...args) => {
                    this.off(component.name);

                    return component.wrap(...args);
                },
            };

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
        async fire(...args) {
            for (let [k, component] of this.listeners) {
                component.wrap(...args, this.signature);
            }

            return this;
        }

        *[Symbol.iterator]() {
            if (typeof this.value !== "object") {
                yield this.value;
            } else {
                for (let k in this.value) {
                    yield this.value[k];
                }
            }
        }

        /**
         * Creates a new State
         * @param {any} value
         * @returns {OpenScript.State}
         */
        static state(v = null) {
            return OpenScript.ProxyFactory.make(
                class extends OpenScript.State {
                    value = v;

                    id = OpenScript.State.count++;

                    constructor() {
                        super();
                    }

                    push = (...args) => {
                        if (!Array.isArray(this.value)) return;

                        this.value.push(...args);
                        this.$__changed__ = true;

                        this.fire();
                    };
                },
                class {
                    set(target, prop, value) {
                        if (prop === "value") {
                            let current = target.value;
                            let nVal = value;

                            if (typeof current === "object") {
                                current = JSON.stringify(current);
                                nVal = JSON.stringify(nVal);
                            }

                            if (current === nVal) return true;

                            Reflect.set(...arguments);

                            target.$__changed__ = true;

                            target.fire();

                            return true;
                        } else if (
                            prop !== "listeners" &&
                            prop !== "signature" &&
                            target.value[prop] !== value
                        ) {
                            target.value[prop] = value;
                            target.$__changed__ = true;

                            target.fire();

                            return true;
                        }

                        return Reflect.set(...arguments);
                    }

                    get(target, prop, receiver) {
                        if (
                            prop === "length" &&
                            typeof target.value === "object"
                        ) {
                            return Object.keys(target.value).length;
                        }

                        if (
                            typeof prop !== "symbol" &&
                            /\d+/.test(prop) &&
                            Array.isArray(target.value)
                        ) {
                            return target.value[prop];
                        }

                        if (
                            !target[prop] &&
                            target.value &&
                            typeof target.value === "object" &&
                            target.value[prop]
                        )
                            return target.value[prop];

                        return Reflect.get(...arguments);
                    }

                    deleteProperty(target, prop) {
                        if (typeof target.value !== "object") return false;

                        if (Array.isArray(target.value)) {
                            target.value = target.value.filter(
                                (v, i) => i != prop
                            );
                        } else {
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
            if (Array.isArray(array)) {
                array.forEach((v, i) => output.push(callback(v, i)));
            } else {
                for (let k in array) output.push(callback(array[k], k));
            }
            return output;
        };

        /**
         * Iterates over array elements using setTimeout
         * @param {Iterable} array
         * @param {Function} callback
         */
        static lazyFor = (array, callback = (v) => v) => {
            let index = 0;

            if (array.length < 1) return;

            const iterate = () => {
                callback(array[index]);
                index++;

                if (index < array.length) return setTimeout(iterate, 0);
            };

            setTimeout(iterate, 0);
        };

        /**
         * Converts kebab case to camel case
         * @param {string} name
         * @param {boolean} upperFirst
         */
        static camel(name, upperFirst = false) {
            let _name = "";
            let upper = upperFirst;

            for (const c of name) {
                if (c === "-") {
                    upper = true;
                    continue;
                }
                if (upper) {
                    _name += c.toUpperCase();
                    upper = false;
                } else {
                    _name += c;
                }
            }

            return _name;
        }

        /**
         * Converts camel case to kebab case
         * @param {string} name
         */
        static kebab(name) {
            let newName = "";

            for (const c of name) {
                if (c.toLocaleUpperCase() === c && newName.length > 1)
                    newName += "-";
                newName += c.toLocaleLowerCase();
            }

            return newName;
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
            if (!(typeof name === "string")) {
                throw Error(
                    `A Component's name must be a string: type '${typeof name}' given`
                );
            }

            if (!(component instanceof OpenScript.Component)) {
                throw new Error(
                    `The component for ${name} must be an OpenScript.Component component. ${component.constructor.name} was passed`
                );
            }

            this.compMap.set(name, component);
        };

        /**
         * Deletes the component from the Markup Engine Map.
         * @emits unmount
         * Removes an already registered company
         * @param {string} name
         * @param {string} withMarkup remove the markup of this component
         * as well.
         * @returns {boolean}
         */
        deleteComponent = (name, withMarkup = true) => {
            if (!this.has(name)) {
                console.info(
                    `Trying to delete an unregistered component {${name}}. Please ensure that the component is registered before deleting it.`
                );

                return false;
            }

            if (withMarkup) this.getComponent(name).unmount();

            this.getComponent(name).emit("unmount");

            return this.compMap.delete(name);
        };

        /**
         * Checks if a component is registered with the
         * markup engine.
         * @param {string} name
         * @returns
         */
        has = (name) => {
            return this.compMap.has(name);
        };

        /**
         * Checks if a component is registered
         * @param {string} name
         * @param {string} method method name
         * @returns
         */
        isRegistered = (name, method = "access") => {
            if (this.has(name)) return true;

            console.info(
                `Trying to ${method} an unregistered component {${name}}. Please ensure that the component is registered by using h.has(componentName)`
            );

            return false;
        };

        /**
         * Removes all a component's markup
         * from the DOM
         * @param {string} name
         */
        hide = (name) => {
            if (!this.isRegistered(name, "hide")) return false;

            const c = this.getComponent(name);
            c.hide();

            return true;
        };

        /**
         * make all the component visible
         * @param {string} name component name
         * @returns
         */
        show = (name) => {
            if (!this.isRegistered(name, "show")) return false;

            const c = this.getComponent(name);
            c.show();

            return true;
        };

        /**
         * handles the DOM element creation
         * @param {string} name
         * @param  {...any} args
         */
        handle = (name, ...args) => {
            /**
             * If this is a component, return it
             */

            if (this.compMap.has(name)) {
                return this.compMap.get(name).wrap(...args);
            }

            let component;
            let event = "";
            let eventParams = [];

            const isComponentName = (tag) => {
                return /^ojs-.*$/.test(tag);
            };

            /**
             *
             * @param {string} tag
             */
            const getComponentName = (tag) => {
                let name = tag
                    .toLowerCase()
                    .replace(/^ojs-/, "")
                    .replace(/-tmp--$/, "");

                return ojsUtils.camel(name, true);
            };

            const checkComponentsVisibility = async () => {
                for (let [k, comp] of this.compMap) {
                    comp.checkVisibility();
                }

                return true;
            };

            /**
             * @type {DocumentFragment|HTMLElement}
             */
            let parent = null;

            let emptyParent = false;
            let replaceParent = false;
            let rootFrag = new DocumentFragment();

            const isUpperCase = (string) => /^[A-Z]*$/.test(string);
            let isComponent = isUpperCase(name[0]);
            let root = null;

            let componentAttribute = {};
            let withCAttr = false;

            /**
             * When dealing with a component
             * save the argument for async rendering
             */
            if (isComponent) {
                root = this.dom.createElement(
                    `ojs-${ojsUtils.kebab(name)}-tmp--`
                );

                let id = `ojs-${ojsUtils.kebab(name)}-${OpenScript.MarkupEngine
                    .ID++}`;

                root.setAttribute("ojs-key", id);
                root.setAttribute("class", "__ojs-c-class__");

                this.compArgs.set(id, args);
            } else {
                root = this.dom.createElement(name);
            }

            let parseAttr = (obj) => {
                for (let k in obj) {
                    let v = obj[k];

                    if (v instanceof OpenScript.State) {
                        v = v.value;
                    }

                    if (k === "parent" && v instanceof HTMLElement) {
                        parent = v;
                        continue;
                    }

                    if (k === "resetParent" && typeof v === "boolean") {
                        emptyParent = v;
                        continue;
                    }

                    if (k === "event" && typeof v === "string") {
                        event = v;
                        continue;
                    }

                    if (k === "replaceParent" && typeof v === "boolean") {
                        replaceParent = v;
                        continue;
                    }

                    if (k === "eventParams") {
                        if (!Array.isArray(v)) v = [v];
                        eventParams = v;
                        continue;
                    }

                    if (
                        k === "component" &&
                        v instanceof OpenScript.Component
                    ) {
                        component = v;
                        continue;
                    }

                    if (k === "c_attr") {
                        componentAttribute = v;
                        continue;
                    }

                    if (k === "withCAttr") {
                        withCAttr = true;
                        continue;
                    }

                    let val = `${v}`;
                    if (Array.isArray(v)) val = `${v.join(" ")}`;

                    k = k.replace(/_/g, "-");

                    if (k === "class" || k === "Class") {
                        val = (root.getAttribute(k) ?? "") + ` ${val}`;
                    }

                    root.setAttribute(k, val);
                }
            };

            const parse = (arg, isComp) => {
                if (
                    arg instanceof DocumentFragment ||
                    arg instanceof HTMLElement
                ) {
                    if (isComp) return true;

                    rootFrag.append(arg);
                    return true;
                }

                if (typeof arg === "object") {
                    parseAttr(arg);
                    return true;
                }

                if (typeof arg !== "undefined") {
                    rootFrag.append(arg);
                    return true;
                }

                return false;
            };

            for (let arg of args) {
                if (isComponent && parent) break;

                if (arg instanceof OpenScript.State) continue;

                if (Array.isArray(arg)) {
                    if (isComponent) continue;

                    arg.forEach((e) => {
                        if (e) parse(e, isComponent);
                    });

                    continue;
                }

                if (parse(arg, isComponent)) continue;

                if (isComponent) continue;

                let v = this.toElement(arg);
                if (typeof v !== "undefined") rootFrag.append(v);
            }

            root.append(rootFrag);

            if (withCAttr) {
                root.setAttribute("c-attr", JSON.stringify(componentAttribute));
            }

            root.toString = function () {
                return this.outerHTML;
            };

            if (parent) {
                if (emptyParent) {
                    parent.textContent = "";
                }

                if (replaceParent) {
                    parent.replaceWith(root);
                } else {
                    parent.append(root);
                }

                // checkComponentsVisibility();

                if (component) {
                    component.emit(event, eventParams);

                    let sc = root.querySelectorAll(".__ojs-c-class__");

                    sc.forEach((c) => {
                        if (!isComponentName(c.tagName.toLowerCase())) return;
                        let cmpName = getComponentName(c.tagName);

                        let cmp = h.getComponent(getComponentName(c.tagName));

                        if (cmp && cmp.listensTo(component, event)) return;

                        h.onAll(component.name, event, () => {
                            h.getComponent(cmpName)?.emit(event, eventParams);
                        });

                        if (!cmp) return;
                        component.addListeningComponent(cmp, event);
                    });
                }

                return root;
            }

            return root;
        };

        /**
         * Executes a function that returns an
         * HTMLElement and adds that element to the overall markup.
         * @param {function} f - This function should return an HTMLElement or a string or an Array of either
         * @returns {HTMLElement|string|Array<HTMLElement|string>}
         */
        call = (f = () => h["ojs-group"]()) => {
            return f();
        };

        /**
         * Allows you to add functions to HTML elements
         * directly from within a component
         * @param {OpenScript.Component} component
         * @param {string} method name of the method
         * @param  {...any} args arguments to pass to the method
         * @returns
         */
        func = (component, method, ...args) => {
            return `component('${component.name}')['${method}'](${this._escape(
                args
            )})`;
        };

        /**
         *
         * adds quotes to string arguments
         * and serializes objects for
         * param passing
         * @note To escape adding quotes use ${string}
         */
        _escape = (args) => {
            let final = [];

            for (let e of args) {
                if (typeof e === "number") final.push(e);
                else if (typeof e === "string") {
                    if (e.length && e.substring(0, 2) === "${") {
                        let length =
                            e[e.length - 1] === "}" ? e.length - 1 : e.length;
                        final.push(e.substring(2, length));
                    } else final.push(`'${e}'`);
                } else if (typeof e === "object") final.push(JSON.stringify(e));
            }

            return final;
        };

        __addToEventsMap = (component, event, listeners) => {
            if (!this.eventsMap.has(component)) {
                this.eventsMap.set(component, {});
                this.eventsMap.get(component)[event] = listeners;
                return;
            }

            if (!this.eventsMap.get(component)[event]) {
                this.eventsMap.get(component)[event] = [];
            }

            this.eventsMap.get(component)[event].push(...listeners);
        };

        /**
         * Adds an event listener to a component
         * @param {string|Array<string>} component component name
         * @param {string} event event name
         * @param  {...function} listeners listeners
         */
        on = (component, event, ...listeners) => {
            let components = component;

            if (!Array.isArray(component)) components = [component];

            for (let component of components) {
                if (/\./.test(component)) {
                    let tmp = component.split(".").filter((e) => e);
                    component = tmp[0];
                    listeners.push(event);
                    event = tmp[1];
                }

                if (this.has(component)) {
                    this.getComponent(component).on(event, ...listeners);

                    continue;
                }

                listeners.forEach((f, i) => {
                    listeners[i] = { type: "after", function: f };
                });

                this.__addToEventsMap(component, event, listeners);
            }
        };

        /**
         * Add events listeners to a component that will
         * execute even after the event has been emitted
         * @param {string|Array<string>} component
         * @param {string} event
         * @param  {...function} listeners
         */
        onAll = (component, event, ...listeners) => {
            let components = component;

            if (!Array.isArray(component)) components = [component];

            for (let component of components) {
                if (/\./.test(component)) {
                    let tmp = component.split(".").filter((e) => e);
                    component = tmp[0];
                    listeners.push(event);
                    event = tmp[1];
                }

                if (this.has(component)) {
                    this.getComponent(component).onAll(event, ...listeners);
                    continue;
                }

                listeners.forEach((f, i) => {
                    listeners[i] = { type: "all", function: f };
                });

                this.__addToEventsMap(component, event, listeners);
            }
        };

        /**
         * Gets the event emitter of a component
         * @param {string} component component name
         * @returns
         */
        emitter = (component) => {
            return this.compMap.get(component)?.emitter;
        };

        /**
         * Gets a component and returns it
         * @param {string} name
         * @returns {OpenScript.Component|null}
         */
        getComponent = (name) => {
            return this.compMap.get(name);
        };

        /**
         * Creates an anonymous component
         * around a state
         * @param {OpenScript.State} state
         * @param {Array<string>} attribute attribute path
         * @returns
         */
        $anonymous = (state, callback = (state) => state.value, ...args) => {
            return h[OpenScript.Component.anonymous()](
                state,
                callback,
                ...args
            );
        };

        /**
         * Converts a value to HTML element;
         * @param {string|HTMLElement} value
         */
        toElement = (value) => {
            return value;
        };
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

        constructor() {
            let keys = Object.keys(new OpenScript.MarkupEngine());
            keys.forEach((e) => this.reserved.set(e, true));
        }

        get(target, prop, receiver) {
            if (this.reserved.has(prop)) {
                return target[prop];
            }

            return (...args) => target.handle(prop, ...args);
        }

        /**
         * For Documentation, we return a proxy of Markup Engine
         * @returns {OpenScript.MarkupEngine}
         */
        static proxy() {
            if (!OpenScript.MarkupHandler.proxyInstance)
                OpenScript.MarkupHandler.proxyInstance = new Proxy(
                    new OpenScript.MarkupEngine(),
                    new OpenScript.MarkupHandler()
                );

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
        static history = new Map();

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
        constructor(dir = ".", version = "1.0.0") {
            this.dir = dir;
        }

        /**
         * Changes . to forward slashes
         * @param {string|Array} text
         * @returns
         */
        normalize(text) {
            if (text instanceof Array) {
                return text.join("/");
            }
            return text.replace(/\./g, "/");
        }

        /**
         * Changes / to .
         * @param {string|Array} text
         * @returns
         */
        dot(text) {
            if (text instanceof Array) {
                return text.join(".");
            }
            return text.replace(/\//g, ".");
        }

        /**
         * Splits a file into smaller strings
         * based on the class in that file
         */
        Splitter = class Splitter {
            /**
             * Gets the class Signature
             * @param {string} content
             * @param {int} start
             * @param {object<>} signature {name: string, signature: string, start: number, end: number}
             */
            classSignature(content, start) {
                const signature = {
                    name: "",
                    definition: "",
                    start: -1,
                    end: -1,
                    parent: null,
                };

                let startAt = start;

                let output = [];
                let tmp = "";

                let pushTmp = (index) => {
                    if (tmp.length === 0) return;

                    if (output.length === 0) startAt = index;

                    output.push(tmp);
                    tmp = "";
                };

                for (let i = start; i < content.length; i++) {
                    let ch = content[i];

                    if (/[\s\r\t\n]/.test(ch)) {
                        pushTmp(i);

                        continue;
                    }

                    if (/\{/.test(ch)) {
                        pushTmp(i);
                        signature.end = i;

                        break;
                    }

                    tmp += ch;
                }

                signature.start = startAt;

                if (output.length % 2 !== 0)
                    throw Error(
                        `Invalid Class File. Could not parse \`${content}\` from index ${start} because it doesn't have the proper syntax. ${content.substring(
                            start
                        )}`
                    );

                if (output.length > 2) {
                    signature.parent = output[3];
                }

                signature.name = output[1];
                signature.definition = output.join(" ");

                return signature;
            }

            /**
             * Splits the content of the file by
             * class
             * @param {string} content file content
             * @return {Map<string,string>} class map
             */
            classes(content) {
                content = content.trim();

                const stack = [];
                const map = new Map();
                const qMap = new Map([
                    [`'`, true],
                    [`"`, true],
                    ["`", true],
                ]);

                let index = 0;
                let code = "";

                while (index < content.length) {
                    let signature = this.classSignature(content, index);
                    index = signature.end;

                    let ch = content[index];
                    stack.push(ch);

                    code += signature.definition + " ";
                    code += ch;

                    let text = [];

                    index++;

                    while (stack.length && index < content.length) {
                        ch = content[index];
                        code += ch;

                        if (qMap.has(ch)) {
                            text.push(ch);
                            index++;

                            while (text.length && index < content.length) {
                                ch = content[index];
                                code += ch;

                                let last = text.length - 1;

                                if (qMap.has(ch) && ch === text[last]) {
                                    text.pop();
                                } else if (
                                    ch === "\n" &&
                                    (text[last] === '"' || text[last] === "'")
                                ) {
                                    text.pop();
                                }

                                index++;
                            }
                            continue;
                        }
                        if (/\{/.test(ch)) stack.push(ch);
                        if (/\}/.test(ch)) stack.pop();

                        index++;
                    }

                    map.set(signature.name, {
                        extends: signature.parent,
                        code,
                        name: signature.name,
                        signature: signature.definition,
                    });
                    code = "";
                }

                return map;
            }
        };

        /**
         *
         * @param {string} fileName script name without the .js.
         */
        async req(fileName) {
            if(!/^[\w\._-]+$/.test(fileName)) throw Error(`OJS-INVALID-FILE: '${fileName}' is an invalid file name`);

            let names = fileName.split(/\./);
            
            if (OpenScript.AutoLoader.history.has(`${this.dir}.${fileName}`))
                return OpenScript.AutoLoader.history.get(
                    `${this.dir}.${fileName}`
                );

            let response = await fetch(
                `${this.dir}/${this.normalize(fileName)}${this.extension}?v=${
                    this.version
                }`
            );
            

            let classes = await response.text();
            let content = classes;

            let classMap = new Map();
            let codeMap = new Map();
            let basePrefix = "";

            try {
                let url = new URL(this.dir);
                basePrefix = this.dot(url.pathname);
            } catch (e) {
                basePrefix = this.dot(this.dir);
            }

            let prefixArray = [
                ...basePrefix.split(/\./g).filter((v) => v.length),
                ...names,
            ];

            let prefix = prefixArray.join(".");
            if (prefix.length > 0 && !/^\s+$/.test(prefix)) prefix += ".";

            let splitter = new this.Splitter();

            classes = splitter.classes(content);

            for (let [k, v] of classes) {
                let key = prefix + k;
                classMap.set(key, [k, v.code]);
            }

            for (let [k, arr] of classMap) {
                let parent = classes.get(arr[0]).extends;

                if (parent) {
                    let original = parent;

                    if (!/\./g.test(parent)) parent = prefix + parent;

                    if (!this.exists(parent)) {
                        if (!classMap.has(parent)) {
                            await this.req(parent);
                        } else {
                            let pCode = classMap.get(parent);

                            prefixArray.push(pCode[0]);

                            let code = await this.setFile(
                                prefixArray,
                                Function(`return (${pCode[1]})`)()
                            );

                            prefixArray.pop();

                            codeMap.set(parent, [pCode[0], code]);
                        }
                    } else {
                        let signature = classes.get(arr[0]).signature;

                        let replacement = signature.replace(original, parent);

                        let c = arr[1].replace(signature, replacement);
                        arr[1] = c;
                    }
                }

                if (!this.exists(k)) {
                    prefixArray.push(arr[0]);

                    let code = await this.setFile(
                        prefixArray,
                        Function(`return (${arr[1]})`)()
                    );

                    prefixArray.pop();

                    codeMap.set(k, [arr[0], code]);
                }
            }

            OpenScript.AutoLoader.history.set(
                `${this.dir}.${fileName}`,
                codeMap
            );

            return codeMap;
        }

        async include(fileName) {
            try {
                return await this.req(fileName);
            } catch (e) {}

            return null;
        }

        /**
         * Adds a class file to the window
         * @param {Array<string>} names
         */
        async setFile(names, content) {
            OpenScript.namespace(names[0]);

            let obj = window;
            let final = names.slice(0, names.length - 1);

            for (const n of final) {
                if (!obj[n]) obj[n] = {};
                obj = obj[n];
            }

            obj[names[names.length - 1]] = content;

            // Init the component if it is a
            // component

            if (content.prototype instanceof OpenScript.Component) {
                let c = new content();

                if (h.has(c.name)) return;

                await c.mount();
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

            for (let i = 1; i < names.length; i++) {
                if (!obj) return false;
                obj = obj[names[i]];
            }

            if (!obj) return false;

            return true;
        };
    },

    /**
     * Adds a new Namespace to the window
     * @param {string} name
     */
    namespace: (name) => {
        if (!window[name]) window[name] = {};
        return window[name];
    },

    /**
     * Wraps the function to execute
     * @param {Function} callback
     * @returns
     */
    wrap: async (callback) => {
        return await callback();
    },

    /**
     * Initializes the OpenScript
     */
    Initializer: class Initializer {
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
         * The Utility Class
         */
        Utils = OpenScript.Utils;

        /**
         * Creates an anonymous component around a state
         * @param {OpenScript.State} state
         * @param {Function<OpenScript.State>} callback the function that returns
         * the value to put in the anonymous markup created
         * @param {...} args
         * @returns
         */
        v = (state, callback = (state) => state.value, ...args) =>
            h.$anonymous(state, callback, ...args);
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
         * The mediator manager
         */
        mediatorManager = new OpenScript.MediatorManager();

        /**
         * The router object
         */
        route = new OpenScript.Router();

        constructor(
            configs = {
                directories: {
                    components: "./components",
                    contexts: "./contexts",
                    mediators: "./mediators",
                },

                version: "1.0.0",
            }
        ) {
            this.loader.dir = configs.directories.components;
            this.loader.version = configs.version;

            OpenScript.ContextProvider.directory = configs.directories.contexts;

            OpenScript.ContextProvider.version = configs.version;

            this.contextProvider = this.createContextProvider();

            /**
             *
             * @param {string} name
             * @returns {OpenScript.Context}
             */
            this.context = (name) => this.contextProvider.context(name);

            OpenScript.MediatorManager.directory =
                configs.directories.mediators;
            OpenScript.MediatorManager.version = configs.version;
        }

        /**
         * @returns {OpenScript.ContextProvider}
         */
        createContextProvider() {
            return OpenScript.ProxyFactory.make(
                OpenScript.ContextProvider,
                class {
                    set(target, prop, receiver) {
                        throw new Error(
                            "You cannot Set any Property on the ContextProvider"
                        );
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
        req = async (qualifiedName) => {
            return await this.loader.req(qualifiedName);
        };

        /**
         * Loads a file into the Window Namespace
         * @param {string} qualifiedName `Namespace.SubNamespace.Name` the file to include
         * @returns {class|object|Function}
         */
        include = async (qualifiedName) => {
            return await this.loader.include(qualifiedName);
        };

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
        };

        /**
         * Fetch a context asynchronously over the network and reconciles it.
         * @param {string} referenceName
         * @param {string} qualifiedName
         * @returns
         */
        fetchContext = (referenceName, qualifiedName) => {
            return this.contextProvider.load(
                referenceName,
                qualifiedName,
                true
            );
        };

        /**
         * Gets a component
         * @returns {OpenScript.Component}
         */
        component = (name) => h.getComponent(name);

        /**
         * Loads mediators
         * @param {Array<string>} names <Qualified Names>
         */
        mediators = async (names) => {
            for (let qn of names) {
                this.mediatorManager.fetchMediators(qn);
            }
        };

        /**
         * The Broker Object
         */
        broker = new OpenScript.Broker();

        /**
         * The Mediator Manager Class
         */
        MediatorManager = OpenScript.MediatorManager;

        /**
         * The Event Data Class
         */
        EventData = OpenScript.EventData;

        /**
         * Creates an event data
         * @param {object} meta
         * @param {object} message
         * @returns {string} encoded EventData
         */
        eData = (meta = {}, message = {}) => {
            return new OpenScript.EventData()
                .meta(meta)
                .message(message)
                .encode();
        };
    },
};

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
     * The context provider for initializing contexts and putting them in the window
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
    autoload,

    /**
     * The OJS utility class
     */
    Utils: ojsUtils,

    /**
     * Gets a Component
     */
    component,

    /**
     * The Mediator Manager
     */
    mediatorManager,

    /**
     * The Mediator Manager
     */
    MediatorManager,
    /**
     * Fetch Mediators
     */
    mediators,

    /**
     * The Broker Object
     */
    broker,

    /**
     * The Event Data Class
     */
    EventData,

    /**
     * Creates an event data object
     */
    eData,
} = new OpenScript.Initializer();
