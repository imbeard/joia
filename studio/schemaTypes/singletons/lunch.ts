import {defineField, defineType} from 'sanity'
import {LemonIcon} from '@sanity/icons'

export const lunch = defineType({
  name: 'lunch',
  title: 'Lunch',
  type: 'document',
  icon: LemonIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'choices',
      title: 'Choices',
      type: 'array',
      of: [
        {
          name: 'choice',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'text',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'blockContent',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'blockContent',
    }),
    defineField({
      name: 'twoImages',
      title: 'Hero of Two Images',
      type: 'twoImages',
    }),
    defineField({
      name: 'tastingNotes',
      title: 'Tasting Notes',
      type: 'infoSection',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Lunch',
      }
    },
  },
})
