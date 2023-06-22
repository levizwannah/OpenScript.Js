class IndexData extends OpenScript.Context {
    constructor() {
        super();

        this.setOverview();
    }

    setOverview(){
        this.has('overview').value = [
            {
                icon: 'fa-map-signs',
                title: 'Introduction',
                body: 'This is OpenScript.JS',
                link: 'docs-page.html#section-1'
            }
        ]
    }
}