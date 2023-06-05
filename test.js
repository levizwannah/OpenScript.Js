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
    bc.get("counter").value++;
    h.dom.querySelector(".blog-active")?.scrollIntoView({ behavior: "smooth" });
}, 1000);

});

