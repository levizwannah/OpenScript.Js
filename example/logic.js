router.init();

fetchContext("rootCxt", "Root");
putContext("blogCxt", "Blog.Context");

req("App");
mediators(["Test"]);

const bc = context("blogCxt");
blog = state([]);

bc.put("counter", state(0));
bc.put("blogs", blog);

bc.number = state(0);

let rc = context("rootCxt");
rc.domRoot = h.dom.querySelector("#root");

h.App({ parent: rc.domRoot });

setInterval(() => {
	let blog = [];

	for (let i = 5; i < 10; i++) {
		let random = Math.floor(Math.random() * 100);

		blog.push({
			text: `Blog Heading ${i * random}`,
			subtitle: `Blog Subtitle ${i * random}`,
			description: `Blog Description for This blog with random number ${new Date().getTime()} and ID ${
				i * random
			}`,
			link: `#`,
			id: i * random,
		});
	}

	bc.blogs.value = blog;
	bc.counter.value++;
}, 1000);

// setInterval(() => {
//   bc.number.value++;
//   broker.send("numberChanged");
// }, 1000);

// Testing namespaced events

let events = {
	namespace: {
		hello: true,
		hi: true,
		sns: {
			hello: true,
			hi: true,
			sns2: {
				hello: true,
				hi: true,
				lastNs: {
					ojs: true,
					osm: true,
				},
			},
		},
	},
	testEvent: true,
};

broker.registerEvents(events);

broker.send("namespace{hello,hi,sns[hello,hi,sns2(hello,hi,lastNs{ojs,osm})]}");

broker.broadcast("testEvent|namespace:hello");

bc.counter.listener((state) => {
	if (state.value % 10 == 0) {
		console.log(`Hello ${state.value}, you are a multiple of 10`);
	}
});
bc.counter.listener((state) => {
	if (state.value % 20 == 0) {
		console.log(`Hello ${state.value}, you are a multiple of 20`);
	}
});
