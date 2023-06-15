class Root extends OpenScript.Context {

    constructor() {
        super();

        this.put('root', h.dom.querySelector('#root'));
    }

}