class App extends OpenScript.Component {

    async mount() {
        await super.mount();
        req('Sections.Header');
        req('Sections.Hero');
    }

    render(...args) {
        return h.wrapper(
            h.MainHeader(),

            h.HeroSection(),

            ...args
        )
    }

}