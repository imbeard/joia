import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {FolderIcon} from '@sanity/icons'
import {wineList} from './translations/wine-list'
import {pressList} from './translations/press-list'
import {softDrinksList} from './translations/soft-drinks-list'
import {herbalTeaList} from './translations/herbal-tea-list'

export const structure = (S, context) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.documentTypeListItem('home')
                .title('Home')
                .child(S.document().schemaType('home').title('Home').documentId('home')),
              S.documentTypeListItem('menuPage')
                .title('Menu')
                .child(S.document().schemaType('menuPage').title('Menu').documentId('menuPage')),
              S.documentTypeListItem('wines')
                .title('Wines')
                .child(S.document().schemaType('wines').title('Wines').documentId('wines')),
              S.documentTypeListItem('softDrinks')
                .title('Soft Drinks')
                .child(
                  S.document()
                    .schemaType('softDrinks')
                    .title('Soft Drinks')
                    .documentId('soft-drinks'),
                ),
              S.documentTypeListItem('herbalTeas')
                .title('Herbal Teas')
                .child(
                  S.document()
                    .schemaType('herbalTeas')
                    .title('Herbal Teas')
                    .documentId('herbal-teas'),
                ),
              S.documentTypeListItem('drinking')
                .title('Drinking')
                .child(
                  S.document().schemaType('drinking').title('Drinking').documentId('drinking'),
                ),
              S.documentTypeListItem('lunch')
                .title('Lunch')
                .child(S.document().schemaType('lunch').title('Lunch').documentId('lunch')),
              S.documentTypeListItem('about')
                .title('About')
                .child(S.document().schemaType('about').title('About').documentId('about')),

              S.documentTypeListItem('events')
                .title('Events')
                .child(S.document().schemaType('events').title('Events').documentId('events')),

              S.documentTypeListItem('academy')
                .title('Academy')
                .child(S.document().schemaType('academy').title('Academy').documentId('academy')),
            ]),
        ),

      S.divider(),

      S.documentTypeListItem('menu').title('Menu List'),

      wineList(S),

      softDrinksList(S),

      // S.documentTypeListItem('herbalTea').title('Herbal Tea List'),

      herbalTeaList(S),

      pressList(S, context),

      S.divider(),

      S.documentTypeListItem('contacts')
        .title('Contacts')
        .child(S.document().schemaType('contacts').title('Contacts').documentId('contacts')),

      S.documentTypeListItem('settings')
        .title('Settings')
        .child(S.document().schemaType('settings').title('Settings').documentId('settings')),
    ])
