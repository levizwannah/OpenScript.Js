class Counter extends OpenScript.Component {

    constructor() {
        super();

        this.name = "BlogCounter";
    }

    /**
     * 
     * @param {OpenScript.State} counter 
     * @param  {...any} args 
     * @returns 
     */
    render(counter, ...args) {
        let sec = counter.value;

        let hour = Math.floor(sec / 3600);
        sec %= 3600;
        
        let minute = Math.floor(sec / 60);
        sec %= 60;

        hour = Math.floor(hour / 10) === 0 ? `0${hour}` : hour;
        minute = Math.floor(minute / 10) === 0 ? `0${minute}` : minute;
        sec = Math.floor(sec / 10) === 0 ? `0${sec}` : sec;

        return h.div(
            {
                class: "card mb-3"
            },
            
            h.div({class: 'card-header'}, `I am ${this.name} Component & I re-render`),

            h.div(
                { class: "card-body "},
                h.h4({ class: "card-text" }, "Timer: ", hour, " : ", minute, " : ", sec)
            ),
            ...args
        )
    }

}