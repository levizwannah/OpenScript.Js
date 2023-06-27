class Social extends OpenScript.Component {
    
    constructor() {
        super();

        this.name = 'SocialIcon';
    }

    render(link, icon, ...args) {
        return h.a(
            { href: link },
            h.i(
                { class: `fab ${icon} fa-fw`}
            ),
            ...args
        )
    }
}