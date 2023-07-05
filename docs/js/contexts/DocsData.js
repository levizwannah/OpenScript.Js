class DocsData extends OpenScript.Context {
    data;
    arrangements;

    constructor() {
        super();

        this.has('arrangements').value = [
            'introduction',
            'installation',
            'gettingStarted',
            'usingOpenScript',
            'designMarkup',
            'designRoutes',
            'designComponents',
            'designStates',
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

    installation() {
        autoload.req('data.Installation').then(() => {
            this.has('data').installation = new data.Installation.Installation();
        })
    }

    gettingStarted(){
         autoload.req('data.GettingStarted').then( ()=>{
        this.has('data').GettingStarted=new data.GettingStarted.gettingStarted();
         })
    }

}