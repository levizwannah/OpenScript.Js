class TakeAQuickLook{
    icon = 'fa-pen'; 
    id = 'ojs-take-a-quick-look';  
    title = 'Take a quick look';

    content=[
        h.section(
            {class: 'docs-intro'},
          h.p(
            'This is a way to just have a small glimpse of OpenScript before you get to actually gain a deeper understandin of its underlining concepts.',
          )
        )
    ]; 

    sections = [
        {
           id: 'ojs-take-a-quick-look',
           title: 'Where to take a look',
           heading: 'where to take a look',
           content: [
        h.p(

         'come...test the sweetness of openscipt',h.a({href:"https://levizwannah.github.io/html-to-openscript "}, ' here '), ' before you go enjoy !!',

        )
           ]
        }


    ];
}