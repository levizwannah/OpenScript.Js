ojs(async e => {

await contextProvider.put("RootCxt", "RootContext");
await contextProvider.put("BlogCxt", "Blog.Context");

await require("App");

const bc = context("BlogCxt");

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

let rc = context("RootCxt");

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

