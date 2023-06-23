class DocsData extends OpenScript.Context {
    
    constructor() {
        super();

        this.initData();
    }

    initData() {
        let funcs = [

        ];

        for(let initiator of funcs) {
            if(!this[initiator]) continue;

            this[initiator]();
        }
    }

    
}