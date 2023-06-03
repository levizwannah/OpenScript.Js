ojs(async e => {

await contextProvider.put("RootContext", "RootContext");
await contextProvider.put("BlogContext", "Blog.Context");
await require("App");

let bc = context("BlogContext");

let blog = [];
for(let i = 5; i < 20; i++){
    blog.push({
        text: `Blog Heading ${i}`,
        description: `Blog Description for This blog with random number ${(new Date()).getTime()} and ID ${i}`,
        id: i
    })
}

bc.put("blogs", blog);

h.App();

})