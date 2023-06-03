class RootContext extends OpenScript.Context {

    constructor() {
        super();

        this.__contextName__ = "RootContext";
        this.put("domRoot", h.dom.querySelector("#root"));
    }
}
