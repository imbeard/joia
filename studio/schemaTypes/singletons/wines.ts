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
              name: 'groups',
              title: 'Groups',
              type: 'array',
              of: [
                {
                  name: 'origin',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'wines',
                      title: 'Wines',
                      type: 'blockContent',
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
      type: 'infoSection',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'linkInternal',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Wines',
      }
    },
    select: {
      subtitle: 'language',
    },
  },
})
