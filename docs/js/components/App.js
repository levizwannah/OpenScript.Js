class App extends OpenScript.Component {

    async mount() {
        await super.mount();
        await require('Header');
    }

    render(...args) {
        return h.wrapper(
            h.MainHeader(),

            ...args
        )
    }

}