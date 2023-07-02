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
        this.has('data').installation = {
            icon: 'fa-tools',
            id: 'ojs-installation',
            title: 'Installation',
            content: [
                h.p(
                    `OpenScript.Js Installation`
                ),
                h.p(
                    'Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio.'
                )
            ],

            sections: [
                {
                    id: 'ojs-installation-2',
                    title: 'Installation 1.1',
                    heading: 'Section Installation',
                    content: [
                        h.p(
                            'Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio.'
                        )
                    ]
                },
                {
                    id: 'ojs-installation-2',
                    title: 'Installation 1.1',
                    heading: 'Section Installation',
                    content: [
                        h.p(
                            'Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio.'
                        )
                    ]
                },
                {
                    id: 'ojs-installation-2',
                    title: 'Installation 1.1',
                    heading: 'Section Installation',
                    content: [
                        h.p(
                            'Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio.'
                        )
                    ]
                },

            ]
        }
    }

}