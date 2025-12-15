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
              rows: 3,
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
      name: 'twoGalleries',
      title: 'Two Galleries',
      type: 'twoGalleries',
    }),
    defineField({
      name: 'tastingNotes',
      title: 'Tasting Notes',
      type: 'object',
      fields: [
        defineField({
          name: 'infoSection',
          title: 'Info Section',
          type: 'infoSection',
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'linkInternal',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      lang: 'language', // or the path your language field uses
    },
    prepare({lang}) {
      return {
        title: 'Lunch',
        subtitle: lang || '—',
      }
    },
  },
})
