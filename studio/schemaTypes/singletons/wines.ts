import {defineField, defineType} from 'sanity'
import {BottleIcon} from '@sanity/icons'

export const wines = defineType({
  name: 'wines',
  title: 'Wines',
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
              name: 'content',
              title: 'Content',
              type: 'blockContent',
            })
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Wines',
      }
    },
  },
})
