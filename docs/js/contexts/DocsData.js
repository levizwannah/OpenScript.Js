class DocsData extends OpenScript.Context {
    data;
    arrangements;

    constructor() {
        super();

        this.has('arrangements').value = [
            'introduction',
            'gettingStarted',
            'usingOpenScript',
            'designMarkup',
            'designRoutes',
            'designComponents',
            'designStates',
            'designContexts',
            'designAutoloading',
            'openScriptFullCode'
        ];

        this.initData();
    }

    initData() {
        for(let initiator of this.arrangements) {
            if(!this[initiator]) continue;
            this[initiator]();
        }
    }

    async introduction() {
        await autoload.req('data.Introduction');
        this.has('data').introduction = new data.Introduction.Introduction();
    }

    usingOpenScript(){
        autoload.req('data.UsingOpenScript').then(() => {
            this.has('data').usingOpenScript = new data.UsingOpenScript.UsingOpenScript();
        });
    }

    designMarkup(){
        autoload.req('data.DesignMarkup').then(() => {
            this.has('data').designMarkup = new data.DesignMarkup.DesignMarkup();
        });
    }

    designRoutes(){
        autoload.req('data.DesignRoutes').then(() => {
            this.has('data').designRoutes = new data.DesignRoutes.DesignRoutes();
        });
    }

    designComponents(){
        autoload.req('data.DesignComponents').then(() => {
            this.has('data').designComponents = new data.DesignComponents.DesignComponents();
        });
    }

    designStates(){
        autoload.req('data.DesignStates').then(() => {
            this.has('data').designStates = new data.DesignStates.DesignStates();
        });
    }

    designContexts(){
        autoload.req('data.DesignContexts').then(() => {
            this.has('data').designContexts = new data.DesignContexts.DesignContexts();
        });
    }

    designAutoloading(){
        autoload.req('data.DesignAutoloading').then(() => {
            this.has('data').designAutoloading = new data.DesignAutoloading.DesignAutoloading();
        });
    }

    openScriptFullCode(){
        autoload.req('data.OpenScriptFullCode').then(() => {
            this.has('data').openScriptFullCode = new data.OpenScriptFullCode.OpenScriptFullCode();
        });
    }

    gettingStarted(){
        autoload.req('data.GettingStarted').then( () => {
            this.has('data').gettingStarted = new data.GettingStarted.GettingStarted();
        });
    }

}