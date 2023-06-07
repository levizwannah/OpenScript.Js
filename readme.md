# OpenScript.Js
A frontend framework for developing and Managing UIs in the most elegant and easy way. It is called opened script because you don't need to work with javascript modules. If you want to export, then use a `Context`. Welcome to `OJS`.

```js
const rc = context("RootCxt");

h.div(
    { 
        class: "div-class", 
        aria_labelledby: "blah blah",
        parent: rc.domRoot 
    }

    h.p("Hello Paragraph")
)
```

# Core
1. Components
2. Markup
3. State
4. Context
5. Auto Loading
