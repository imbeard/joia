export const menuList = (S) =>
  S.listItem()
    .title('Menu List')
    .child(
      S.list()
        .title('Menu List')
        .items([
          S.listItem()
            .title('All languages')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Menus – All languages')
                .schemaType('menu')
                .filter('_type == "menu"'),
            ),
          S.listItem()
            .title('Menus – IT')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Menus – IT')
                .schemaType('menu')
                .filter('_type == "menu" && language == "it"'),
            ),
          S.listItem()
            .title('Menus – EN')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Menus – EN')
                .schemaType('menu')
                .filter('_type == "menu" && language == "en"'),
            ),
        ]),
    )
