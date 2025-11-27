export const wineList = (S) =>
  S.listItem()
    .title('Wine List')
    .child(
      S.list()
        .title('Wine List')
        .items([
          S.listItem()
            .title('All languages')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Wines – All languages')
                .schemaType('wine')
                .filter('_type == "wine"'),
            ),
          S.listItem()
            .title('Wines – IT')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Wines – IT')
                .schemaType('wine')
                .filter('_type == "wine" && language == "it"'),
            ),
          S.listItem()
            .title('Wines – EN')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Wines – EN')
                .schemaType('wine')
                .filter('_type == "wine" && language == "en"'),
            ),
        ]),
    )
