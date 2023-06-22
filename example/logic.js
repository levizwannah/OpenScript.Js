ojs(async e => {

    fetchContext("rootCxt", "RootContext");
    putContext("blogCxt", "Blog.Context");

    req("App");

    const bc = context("blogCxt");

    let blog = [];


    for(let i = 5; i < 20; i++){
        blog.push({
            text: `Blog Heading ${i}`,
            subtitle: `Blog Subtitle ${i}`,
            description: `Blog Description for This blog with random number ${(new Date()).getTime()} and ID ${i}`,
            link: `#`,
            id: i
        })
    }

    blog = state(blog);

    bc.put("counter", state(0));
    bc.put("blogs", blog);

    let rc = context("rootCxt");
    rc.domRoot = h.dom.querySelector("#root");

    h.App( { parent: rc.domRoot })

    setInterval(() => {
        let blog = [];


        for(let i = 5; i < 20; i++){
            let random = Math.floor(Math.random() * 100) ;

            blog.push({
                text: `Blog Heading ${i * random}`,
                subtitle: `Blog Subtitle ${i * random}`,
                description: `Blog Description for This blog with random number ${(new Date()).getTime()} and ID ${i * random}`,
                link: `#`,
                id: i * random
            })
        }

        // bc.blogs.value = blog;
        bc.counter.value++;

    }, 1000);

});

