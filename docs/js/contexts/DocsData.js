class DocsData extends OpenScript.Context {
    
    constructor() {
        super();

        this.initData();
    }

    initData() {
        let funcs = [
            'introduction',
            'installation',
            'gettingStarted',
            'usingOpenScript',
            'designMarkup',
            'designComponents',
            'designStates',
            'designStates',
            'designContexts',
            'designAutoloading',
            'openScriptFullCode'
        ];

        for(let initiator of funcs) {
            if(!this[initiator]) continue;

            this[initiator]();
        }
    }

}