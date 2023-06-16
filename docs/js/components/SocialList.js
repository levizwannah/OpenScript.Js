class SocialList extends OpenScript.Component {

    async mount() {
        await super.mount();
        await require('Icons.Social');
    }


    render(arr, ...args) {
        let listItems = [];

        for(let obj of arr) {
            listItems.push(
                h.li(
                    { class: 'list-inline-item'},
                    h.SocialIcon(obj.link, obj.icon)
                )
            )
        }

        return h.ul(
            { class: 'social-list list-inline mx-md-3 mx-lg-5 mb-0 d-none d-lg-flex'},
            listItems,
            ...args
        )
    }

}