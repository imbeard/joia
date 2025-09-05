import {defineField, defineType} from 'sanity'
import {InlineIcon} from '@sanity/icons'

export const menuPage = defineType({
  name: 'menuPage',
  title: 'Menu Page',
  type: 'document',
  icon: InlineIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'menus',
      title: 'Menus',
      type: 'array',
      of: [{name: 'menu', type: 'reference', to: [{type: 'menu'}]}],
    }),
    defineField({
      name: 'drink',
      title: 'Drink',
      description: 'Short summary of the drinking experience at Joia',
      type: 'infoSection',
    }),
    defineField({
      name: 'lunch',
      title: 'Lunch',
      description: 'Short summary of the lunch offer',
      type: 'infoSection',
    }),
  ],
  preview: {
    select: {
      lang: 'language', // or the path your language field uses
    },
    prepare({lang}) {
      return {
        title: 'Menu Page',
        subtitle: lang || '—',
      }
    },
  },
})
