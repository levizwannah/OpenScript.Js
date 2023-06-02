
jm.component("blogList", (...args) => {
    let blogArray = args[0];

    let list = [];

    for(let blog of blogArray){
        list.push(
            jm.div(
                { id: `div-blog-${blog.id}`, class: "blog-item-holder" },

                jm.h2( { id: blog.id, class: "blog-item" }, blog.text),

                jm.div(
                    { id: `div-blog-desc-${blog.id}`, class: `blog-item` },
                    jm.p(`${blog.description}`)
                )
            )
        );
    }

    return jm.div(
        { id: `div-blog-holder`, class: `blog-list` },
        ...list,
        ...args.slice(1)
    );
});

let root = jm.dom.querySelector("#root");

let blog = [];

for(let i = 0; i < 10; i++){
    blog.push({
        text: `Blog Heading ${i}`,
        description: `Blog Description for This blog with random number ${(new Date()).getTime()} and ID ${i}`,
        id: i
    })
}

jm.blogList(blog, {parent: root});
jm.blogList(blog, {parent: root});