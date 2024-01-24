function ProgressBar(width, ...args){

    let w = Math.floor(Math.random() * 100) % 100;    
    return h.div(
        {
            class: "progress",
            role: "progressbar",
            aria_label: "Basic example",
            aria_valuenow: "0",
            aria_valuemin: "0",
            aria_valuemax: "100"
        },
        h.div({
                class: "progress-bar",
                style: `width: ${w}%`
            }
        ),   
        ...args
    )
}

function Chart(...args){
    return h.div(
        {
            class: "card mb-3",
            onclick: h.func("sayHello", "James"),
        },
        
        h.div({class: 'card-header'}, `I am ${this.name} Component & I re-render`),

        h.div(
            { class: "card-body "},
            h.h4({ class: "card-text" }, "Bars: ", 10),
            h.call(() => {
                let bars = [];

                for(let i = 0; i < 5; i++){
                    bars.push(
                        h.ProgressBar(
                            context("blogCxt").counter, 
                            {class: "mb-3"}
                        )
                    )
                }

                return bars;
            })
        ),
        ...args
    );
}