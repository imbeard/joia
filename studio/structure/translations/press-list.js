import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const pressList = (S, context) =>
  S.listItem()
    .title('Press List')
    .child(
      S.list()
        .title('Press List')
        .items([
          S.listItem()
            .title('All languages')
            .child(
              S.documentList()
                .apiVersion('2024-06-01')
                .title('Press – All languages')
                .schemaType('press')
                .filter('_type == "press"'),
            ),
          orderableDocumentListDeskItem({
            type: 'press',
            id: 'orderable-it-press', // required when multiple lists of same type
            title: 'Press – IT',
            filter: '_type == "press" && language == $lang',
            params: {lang: 'it'},
            S,
            context,
          }),

          // EN-only list
          orderableDocumentListDeskItem({
            type: 'press',
            id: 'orderable-en-press',
            title: 'Press – EN',
            filter: '_type == "press" && language == $lang',
            params: {lang: 'en'},
            S,
            context,
          }),
        ]),
    )
