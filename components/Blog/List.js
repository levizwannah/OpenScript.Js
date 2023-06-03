class Create extends OpenScript.Component {
  
  constructor() {
    super();
    
    this.name = "BlogList";
  }

  /**
   * Renders BlogList
   * @param {Array<object>|OpenScript.State} list 
   * @param  {...any} args 
   */
  render(blogsArray, ...args) {

    let domList = [];

    for(let blog of blogsArray){
        domList.push(
            h.div(
                { id: `div-blog-${blog.id}`, class: "blog-item-holder" },

                h.h2( { id: blog.id, class: "blog-item" }, blog.text),

                h.div(
                    { id: `div-blog-desc-${blog.id}`, class: `blog-item` },
                    h.p(`${blog.description}`)
                )
            )
        );
    }

    return h.div(
        { id: `div-blog-holder`, class: `blog-list` },
        domList,
        ...args
    );
  }

}