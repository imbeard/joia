import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {FolderIcon} from '@sanity/icons'

export const structure = (S, context) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('home')
        .title('Home')
        .child(S.document().schemaType('home').title('Home').documentId('home')),

      S.divider(),

      S.documentTypeListItem('menuPage')
        .title('Menu Page')
        .child(S.document().schemaType('menuPage').title('Menu Page').documentId('menuPage')),

      S.documentTypeListItem('menu').title('Menus'),

      S.divider(),

      S.documentTypeListItem('wines')
        .title('Wines Page')
        .child(S.document().schemaType('wines').title('Wines').documentId('wines')),

      S.documentTypeListItem('wine').title('Wine List'),

      S.divider(),

      S.documentTypeListItem('softDrinks')
        .title('Soft Drinks Page')
        .child(
          S.document().schemaType('softDrinks').title('Soft Drinks').documentId('soft-drinks'),
        ),

      S.documentTypeListItem('softDrink').title('Soft Drink List'),

      S.divider(),

      S.documentTypeListItem('herbalTeas')
        .title('Herbal Teas Page')
        .child(
          S.document().schemaType('herbalTeas').title('Herbal Teas').documentId('herbal-teas'),
        ),

      S.documentTypeListItem('herbalTea').title('Herbal Tea List'),

      S.divider(),

      S.documentTypeListItem('drinking')
        .title('Drinking')
        .child(S.document().schemaType('drinking').title('Drinking').documentId('drinking')),

      S.documentTypeListItem('lunch')
        .title('Lunch')
        .child(S.document().schemaType('lunch').title('Lunch').documentId('lunch')),

      S.divider(),

      S.documentTypeListItem('about')
        .title('About')
        .child(S.document().schemaType('about').title('About').documentId('about')),

      S.documentTypeListItem('events')
        .title('Events')
        .child(S.document().schemaType('events').title('Events').documentId('events')),

      S.documentTypeListItem('academy')
        .title('Academy')
        .child(S.document().schemaType('academy').title('Academy').documentId('academy')),

      orderableDocumentListDeskItem({
        type: 'press',
        title: 'Press',
        icon: FolderIcon,
        S,
        context,
      }),

      S.divider(),

      S.documentTypeListItem('contacts')
        .title('Contacts')
        .child(S.document().schemaType('contacts').title('Contacts').documentId('contacts')),

      S.documentTypeListItem('settings')
        .title('Settings')
        .child(S.document().schemaType('settings').title('Settings').documentId('settings')),
    ])
