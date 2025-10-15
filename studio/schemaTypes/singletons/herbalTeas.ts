import {defineField, defineType} from 'sanity'
import {BottleIcon} from '@sanity/icons'

export const herbalTeas = defineType({
  name: 'herbalTeas',
  title: 'Herbal Teas',
  type: 'document',
  icon: BottleIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          name: 'category',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subCategories',
              title: 'Sub Categories',
              type: 'array',
              of: [
                {
                  name: 'subCategory',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'drink',
                      title: 'Drink',
                      type: 'array',
                      of: [{type: 'reference', to: [{type: 'herbalTea'}]}],
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
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
  ],
  preview: {
    select: {
      lang: 'language', // or the path your language field uses
    },
    prepare({lang}) {
      return {
        title: 'Herbal Teas',
        subtitle: lang || '—',
      }
    },
  },
})
