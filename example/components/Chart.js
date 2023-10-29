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
            h.MainProgressBar(width.value),
            ...args
        )
    }

    // async $$numberChanged(){
    //     this.markup().forEach(element => {
    //         element.querySelector(".progress-bar").style.width = `${Math.floor(Math.random() * 100) % 100}%`;
    //     });
    // }
}

class MainProgressBar extends OpenScript.Component 
{
    render(width) {
        let w = Math.floor(Math.random() * 100) % 100;
        return h.fragment(
            h.div({
                    class: "progress-bar",
                    style: `width: ${w}%`
                }
            )
        )
    }
}


class Chart extends OpenScript.Component {

    render(...args) {

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
                        bars.push(h.ProgressBar(context("blogCxt").counter, {class: "mb-3"}))
                    }

                    return bars;
                })
            ),
            ...args
        )
    }
}