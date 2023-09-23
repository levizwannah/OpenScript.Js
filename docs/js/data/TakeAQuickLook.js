class TakeAQuickLook {
  icon = "fa-pen";
  id = "ojs-take-a-quick-look";
  title = "Take a quick look";

  content = [
    h.section(
      { class: "docs-intro" },
      h.p(
        "Take a look at the OpenScript Markup before going deeper."
      )
    ),
  ];

  sections = [
    {
      id: "ojs-take-a-quick-look",
      title: "Markup Generator",
      heading: "Markup Generator",
      content: [
        h.p(
          "To convert your HTML to OJS markup, use this tool. ",
          h.a(
            {
              href: "https://levizwannah.github.io/html-to-ojs/",
              target: "_blank",
            },
            " Markup Generator."
          )
        ),
      ],
    },
  ];
}
