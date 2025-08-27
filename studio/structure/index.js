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

      S.documentTypeListItem('menu').title('Menus'),

      S.documentTypeListItem('wines')
        .title('Wines')
        .child(S.document().schemaType('wines').title('Wines').documentId('wines')),

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

      S.documentTypeListItem('press').title('Press'),

      S.divider(),

      S.documentTypeListItem('contacts')
        .title('Contacts')
        .child(S.document().schemaType('contacts').title('Contacts').documentId('contacts')),

      S.documentTypeListItem('settings')
        .title('Settings')
        .child(S.document().schemaType('settings').title('Settings').documentId('settings')),
    ])
