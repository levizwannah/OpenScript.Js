class RootContext extends OpenScript.Context {

    constructor() {
        super();

        this.__contextName__ = "RootContext";
        this.test = state(1);
    }
}
