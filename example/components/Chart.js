class ProgressBar extends OpenScript.Component {

    render(width, ...args){
        
        return h.div(
            {
                class: "progress",
                role: "progressbar",
                aria_label: "Basic example",
                aria_valuenow: "0",
                aria_valuemin: "0",
                aria_valuemax: "100"
            },
            h.div(        {
                    class: "progress-bar",
                    style: `width: ${width}%`
                }
            ),
            ...args
        )
    }

    async $$numberChanged(){
        this.markup().forEach(element => {
            element.querySelector(".progress-bar").style.width = `${Math.floor(Math.random() * 100) % 100}%`;
        });
    }
}

class Chart extends OpenScript.Component {

    render(number, ...args) {

        return h.div(
            {
                class: "card mb-3"
            },
            
            h.div({class: 'card-header'}, `I am ${this.name} Component & I re-render`),

            h.div(
                { class: "card-body "},
                h.h4({ class: "card-text" }, "Highest: ", 200),
                h.call(() => {
                    let bars = [];

                    for(let i = 0; i < 10; i++){
                        let width = Math.floor(Math.random() * 100) % 100;
                        bars.push(h.ProgressBar(width, {class: "mb-3"}))
                    }

                    return bars;
                })
            ),
            ...args
        )
    }
}