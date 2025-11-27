export const herbalTeaList = (S) =>
  S.listItem()
    .title('Herbal Tea List')
    .child(
      S.list()
        .title('Herbal Tea List')
        .items([
          S.listItem()
            .title('All languages')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Herbal Teas – All languages')
                .schemaType('herbalTea')
                .filter('_type == "herbalTea"'),
            ),
          S.listItem()
            .title('Herbal Teas – IT')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Herbal Teas – IT')
                .schemaType('herbalTea')
                .filter('_type == "herbalTea" && language == "it"'),
            ),
          S.listItem()
            .title('Herbal Teas – EN')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Herbal Teas – EN')
                .schemaType('herbalTea')
                .filter('_type == "herbalTea" && language == "en"'),
            ),
        ]),
    )
