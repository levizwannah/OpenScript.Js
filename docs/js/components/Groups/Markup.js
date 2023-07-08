class CodeBlock extends OpenScript.Component {

    render(src, ...args){
        return h.div(
            { class: 'docs-code-block' },

            h.script({src}),

            ...args
        );
    }

}

class ThemeLink extends OpenScript.Component {
    
    render(href, ...args){

        return h.a(
            {
                href,
                class: 'theme-link',
                target: '_blank'
            },

            ...args
        );

    }
}

class ExternalLink extends ThemeLink {
    render(href, ...args) {
        return [
            h.i({class: 'fas fa-external-link-alt'}),
            super.render(href, ...args)
        ];
    }
}

class List extends OpenScript.Component {

    /**
     * 
     * @param {string} name - ul, ol 
     * @param {*[]} data 
     * @param  {...any} args 
     */
    render(name, data, ...args) {

        return h[name](
            data.map(v => h.li(v)),
            ...args
        );

    }
}

class Callout extends OpenScript.Component {
    
    icons = {
        info: 'fa-info-circle',
        warning: 'fa-bullhorn',
        success: 'fa-thumbs-up',
        danger: 'fa-exclamation-triangle'
    };

    /**
     * 
     * @param {string} type - info, warning, success, danger 
     * @param {object} body - {title: '', content: ''}
     * @param  {...any} args 
     * @returns 
     */
    render(type, body, ...args){

        if(!body) body = {title: 'Callout', content: 'This is a callout'};

        return this[type](body, ...args);
    }

    builder(icon, title, body){
        return h.div(
            {class: 'content'},
            h.h4(
                h.span(
                    {class: 'callout-icon-holder me-1'},
                    h.i({class: `fas ${icon}`})
                ),
                title
            ),
            h.p(body)
        );
    }

    info(body, ...args){

        return h.div(
            {class: 'callout-block callout-block-info'},
            this.builder(
                this.icons.info, 
                body.title, 
                body.content, 
                ...args
            )
        )
    }

    warning(body, ...args){

        return h.div(
            {class: 'callout-block callout-block-warning'},
            this.builder(
                this.icons.warning, 
                body.title, 
                body.content, 
                ...args
            )
        )
    }

    success(body, ...args){

        return h.div(
            {class: 'callout-block callout-block-success'},
            this.builder(
                this.icons.success, 
                body.title, 
                body.content, 
                ...args
            )
        )
    }

    danger(body, ...args){

        return h.div(
            {class: 'callout-block callout-block-danger'},
            this.builder(
                this.icons.danger, 
                body.title, 
                body.content, 
                ...args
            )
        )
    }
}

class Alert extends OpenScript.Component {
    
    /**
     * @param {string} type - info, danger, success, warning, light, dark 
     * @param {string} content 
     * @param  {...any} args 
     */
    render(type, content, ...args){
        
        return h.div(
            {
                class: `alert alert-${type}`,
                role: 'alert'
            },
            content,
            ...args
        );

    }
}

class RowTable extends OpenScript.Component {
    
    /**
     * Creates a custom table
     * @param {object<Array>} data {}
     * @param  {...any} args 
     */
    render(data, ...args){
        let rows = [];

        for(let r in data){
            rows.push(
                h.tr(
                    h.call(() => {
                        let tds = [];
                        for(let i in data[r]){
                            if(i == 0){
                                tds.push(
                                    h.th(
                                        {class: 'theme-bg-light'},
                                        h.ThemeLink('#', data[r][i])
                                    )
                                );

                                continue;
                            }

                            tds.push(
                                h.td(
                                    data[r][i]
                                )
                            );
                        }

                        return tds;
                    })
                )
            );
        }

        return h.div(
            {class: 'table-responsive my-4'},
            h.table(
                {class: 'table table-bordered'},

                h.tbody(rows)
            )
        );
    }
}
