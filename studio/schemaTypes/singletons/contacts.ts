import {defineField, defineType} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons'

export const contacts = defineType({
  name: 'contacts',
  title: 'Contacts',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'infoSection',
    }),
    defineField({
      name: 'generalInformations',
      title: 'General Informations',
      type: 'infoSection',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contacts',
      }
    },
  },
})
