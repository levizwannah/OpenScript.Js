class App extends OpenScript.Component {

    async mount() {
        await super.mount();
        require('Sections.Header');
        require('Sections.Hero');
    }

    render(...args) {
        return h.wrapper(
            h.MainHeader(),

            h.HeroSection(),

            ...args
        )
    }

}