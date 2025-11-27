export const softDrinksList = (S) =>
  S.listItem()
    .title('Soft Drinks List')
    .child(
      S.list()
        .title('Soft Drinks List')
        .items([
          S.listItem()
            .title('All languages')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Soft Drinks – All languages')
                .schemaType('softDrink')
                .filter('_type == "softDrink"'),
            ),
          S.listItem()
            .title('Soft Drinks – IT')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Soft Drinks – IT')
                .schemaType('softDrink')
                .filter('_type == "softDrink" && language == "it"'),
            ),
          S.listItem()
            .title('Soft Drinks – EN')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Soft Drinks – EN')
                .schemaType('softDrink')
                .filter('_type == "softDrink" && language == "en"'),
            ),
        ]),
    )
