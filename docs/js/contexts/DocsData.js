class DocsData extends OpenScript.Context {
    data;
    arrangements;
    baseObject;

    constructor() {
        super();

        this.has('arrangements').value = [
            'introduction',
            // 'takeAQuickLook',
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

        if(route.url().hostname == '127.0.0.1') {
            this.baseObject = window.docs.js;
        }
        else{
            this.baseObject = window.OpenScript.Js.docs.js; 
        }
    }

    initData() {
        for(let initiator of this.arrangements) {
            if(!this[initiator]) continue;
            this[initiator]();
        }
    }

    async introduction() {
        await autoload.req('data.Introduction');
        this.has('data').introduction = new this.baseObject.data.Introduction.Introduction();
    }

    usingOpenScript(){
        autoload.req('data.UsingOpenScript').then(() => {
            this.has('data').usingOpenScript = new this.baseObject.data.UsingOpenScript.UsingOpenScript();
        });
    }

    designMarkup(){
        autoload.req('data.DesignMarkup').then(() => {
            this.has('data').designMarkup = new this.baseObject.data.DesignMarkup.DesignMarkup();
        });
    }

    designRoutes(){
        autoload.req('data.DesignRoutes').then(() => {
            this.has('data').designRoutes = new this.baseObject.data.DesignRoutes.DesignRoutes();
        });
    }

    designComponents(){
        autoload.req('data.DesignComponents').then(() => {
            this.has('data').designComponents = new this.baseObject.data.DesignComponents.DesignComponents();
        });
    }

    designStates(){
        autoload.req('data.DesignStates').then(() => {
            this.has('data').designStates = new this.baseObject.data.DesignStates.DesignStates();
        });
    }

    designContexts(){
        autoload.req('data.DesignContexts').then(() => {
            this.has('data').designContexts = new this.baseObject.data.DesignContexts.DesignContexts();
        });
    }

    designAutoloading(){
        autoload.req('data.DesignAutoloading').then(() => {
            this.has('data').designAutoloading = new this.baseObject.data.DesignAutoloading.DesignAutoloading();
        });
    }

    designMediators(){
        autoload.req('data.DesignMediation').then(() => {
            this.has('data').designMediation = new this.baseObject.data.DesignMediation.DesignMediation();
        });
    }

    openScriptFullCode(){
        autoload.req('data.OpenScriptFullCode').then(() => {
            this.has('data').openScriptFullCode = new this.baseObject.data.OpenScriptFullCode.OpenScriptFullCode();
        });
    }

    gettingStarted(){
        autoload.req('data.GettingStarted').then( () => {
            this.has('data').gettingStarted = new this.baseObject.data.GettingStarted.GettingStarted();
        });
    }

    takeAQuickLook(){
        autoload.req('data.TakeAQuickLook').then( () => {
            this.has('data').takeAQuickLook = new this.baseObject.data.TakeAQuickLook.TakeAQuickLook();
        });
    }

}