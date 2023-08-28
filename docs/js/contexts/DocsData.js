class DocsData extends OpenScript.Context {
    data;
    arrangements;

    constructor() {
        super();

        this.has('arrangements').value = [
            'introduction',
            'takeAQuickLook',
            'gettingStarted',
            'usingOpenScript',
            'designMarkup',
            'designRoutes',
            'designComponents',
            'designStates',
            'designContexts',
            'designAutoloading',
            'designMediators',
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
        this.has('data').introduction = new docs.js.data.Introduction.Introduction();
    }

    usingOpenScript(){
        autoload.req('data.UsingOpenScript').then(() => {
            this.has('data').usingOpenScript = new docs.js.data.UsingOpenScript.UsingOpenScript();
        });
    }

    designMarkup(){
        autoload.req('data.DesignMarkup').then(() => {
            this.has('data').designMarkup = new docs.js.data.DesignMarkup.DesignMarkup();
        });
    }

    designRoutes(){
        autoload.req('data.DesignRoutes').then(() => {
            this.has('data').designRoutes = new docs.js.data.DesignRoutes.DesignRoutes();
        });
    }

    designComponents(){
        autoload.req('data.DesignComponents').then(() => {
            this.has('data').designComponents = new docs.js.data.DesignComponents.DesignComponents();
        });
    }

    designStates(){
        autoload.req('data.DesignStates').then(() => {
            this.has('data').designStates = new docs.js.data.DesignStates.DesignStates();
        });
    }

    designContexts(){
        autoload.req('data.DesignContexts').then(() => {
            this.has('data').designContexts = new docs.js.data.DesignContexts.DesignContexts();
        });
    }

    designAutoloading(){
        autoload.req('data.DesignAutoloading').then(() => {
            this.has('data').designAutoloading = new docs.js.data.DesignAutoloading.DesignAutoloading();
        });
    }

    designAutoloading(){
        autoload.req('data.DesignMediation').then(() => {
            this.has('data').designMediation = new docs.js.data.DesignMediation.DesignMediation();
        });
    }

    openScriptFullCode(){
        autoload.req('data.OpenScriptFullCode').then(() => {
            this.has('data').openScriptFullCode = new docs.js.data.OpenScriptFullCode.OpenScriptFullCode();
        });
    }

    gettingStarted(){
        autoload.req('data.GettingStarted').then( () => {
            this.has('data').gettingStarted = new docs.js.data.GettingStarted.GettingStarted();
        });
    }

    takeAQuickLook(){
        autoload.req('data.TakeAQuickLook').then( () => {
            this.has('data').takeAQuickLook = new docs.js.data.TakeAQuickLook.TakeAQuickLook();
        });
    }

}