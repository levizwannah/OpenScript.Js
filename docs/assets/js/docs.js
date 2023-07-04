"use strict";



function responsiveSidebar() {
  
  let sidebar = document.getElementById("docs-sidebar");

  let w = window.innerWidth;
  if (w >= 1200) {
    // if larger
    console.log("larger");
    sidebar.classList.remove("sidebar-hidden");
    sidebar.classList.add("sidebar-visible");
  } else {
    // if smaller
    console.log("smaller");
    sidebar.classList.remove("sidebar-visible");
    sidebar.classList.add("sidebar-hidden");
  }
}


h?.on('Docs.bound', responsiveSidebar);

h?.on('Docs.bound', () => {
  window.onresize = function () {
    responsiveSidebar();
  };
});

h?.on('MainHeader.bound', () => {
  /* ====== Define JS Constants ====== */
  const sidebarToggler = document.getElementById("docs-sidebar-toggler");
  const sidebar = document.getElementById("docs-sidebar");

  sidebarToggler.addEventListener("click", () => {
    if(!sidebar) return;

    if (sidebar.classList.contains("sidebar-visible")) {
      console.log("visible");
      sidebar.classList.remove("sidebar-visible");
      sidebar.classList.add("sidebar-hidden");
    } else {
      console.log("hidden");
      sidebar.classList.remove("sidebar-hidden");
      sidebar.classList.add("sidebar-visible");
    }
  });

});

h?.on('DocsNav.rerendered', (elem, event) => {
  const sidebarLinks = document.querySelectorAll("#docs-sidebar .scrollto");
  const sidebar = document.getElementById("docs-sidebar");

  sidebarLinks.forEach((sidebarLink) => {

    sidebarLink.addEventListener("click", (e) => {
      let target = sidebarLink.getAttribute("link");

      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });

      //Collapse sidebar after clicking
      if (
        sidebar.classList.contains("sidebar-visible") &&
        window.innerWidth < 1200
      ) {
        sidebar.classList.remove("sidebar-visible");
        sidebar.classList.add("sidebar-hidden");
      }
    });

  });

  /* ===== Gumshoe SrollSpy ===== */
  /* Ref: https://github.com/cferdinandi/gumshoe  */
  // Initialize Gumshoe
  window.spy = new Gumshoe("#docs-nav a", {
    offset: 69, //sticky header height
  });

});

/* ====== SimpleLightbox Plugin ======= */
/*  Ref: https://github.com/andreknieriem/simplelightbox */

var lightbox = new SimpleLightbox(".simplelightbox-gallery a", {
  /* options */
});
