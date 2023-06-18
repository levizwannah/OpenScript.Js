class App extends OpenScript.Component {

    async mount() {
        await super.mount();
        // await require('Sections.Header');
        // await require('Sections.Hero');
    }

    render(...args) {
        return h.wrapper(
            h.MainHeader(),

            h.HeroSection(),

            ...args
        )
    }

}