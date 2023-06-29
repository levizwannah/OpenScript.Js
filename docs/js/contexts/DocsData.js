class DocsData extends OpenScript.Context {
    data;

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
            console.log(initiator, 'found');
            this[initiator]();
        }
    }

    introduction() {
        this.has('data').introduction = {
            icon: 'fa-map-signs',
            id: 'ojs-introduction',
            title: 'Introduction',

            content: [
                h.p(
                    `OpenScript.Js`
                ),
                h.p(
                    'Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio.'
                )
            ],

            sections: [
                {
                    id: 'ojs-introduction-1',
                    title: 'Intro 1.1',
                    heading: 'Section one point one',
                    content: [
                        h.p(
                            'Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio.'
                        )
                    ]
                },
                {
                    id: 'ojs-introduction-2',
                    title: 'Keyboard 1.1',
                    heading: 'Section one point one',
                    content: [
                        h.p(
                            'Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio.'
                        )
                    ]
                },
                {
                    id: 'ojs-introduction-3',
                    title: 'Keyboard 1.1',
                    heading: 'Section one point one',
                    content: [
                        h.p(
                            'Section intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus condimentum nisl id vulputate. Praesent aliquet varius eros interdum suscipit. Donec eu purus sed nibh convallis bibendum quis vitae turpis. Duis vestibulum diam lorem, vitae dapibus nibh facilisis a. Fusce in malesuada odio.'
                        )
                    ]
                }
            ]
        }
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