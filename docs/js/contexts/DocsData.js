class DocsData extends OpenScript.Context {
    data;

    constructor() {
        super();
        this.data = state({});
        this.initData();
    }

    initData() {
        let funcs = [
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

        for(let initiator of funcs) {
            if(!this[initiator]) continue;

            this[initiator]();
        }
    }

    introduction() {
        this.has('data').introduction = {
            title: 'Introduction',
            
            sections: [
                {
                    name: 'section 1.1',
                    content: [
                        h.h1(
                            'Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio.'
                        )
                    ]
                }
            ]
        }
    }

}