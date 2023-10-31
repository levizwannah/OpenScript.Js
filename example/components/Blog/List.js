function BlogList(blogsArray, counter, headerText = "Blog List", ...args) {
  let domList = [];
  let index = 0;

  for (let blog of blogsArray) {
    let active =
      index === counter.value % blogsArray.length
        ? "bg-success blog-active"
        : "";

    domList.push(
      h.div(
        { class: "col" },

        h.div(
          { id: `div-blog-${blog.id}`, class: `card p-4 ${active}` },

          h.img({
            src: "https://picsum.photos/300/100",
            class: "card-img-top",
            alt: `${blog.id}-image`,
          }),

          h.div(
            { class: "card-body" },

            h.h5({ id: blog.id, class: "card-title" }, blog.text),
            h.h6({ class: "card-subtitle mb-2 text-muted" }, blog.subtitle),

            h.p(
              { id: `div-blog-desc-${blog.id}`, class: `card-text` },
              blog.description
            ),
            h.a({ href: `${blog.link}`, class: "card-link" }, "Card Link")
          )
        )
      )
    );

    index++;
  }

  return h.div(
    { class: "card mb-3" },

    h.div({ class: "card-header" }, headerText),

    h.div(
      { class: "card-body" },
      h.div(
        {
          class: "row row-cols-2 g-3 mb-3",
        },

        domList
      )
    ),
    ...args
  );
}


