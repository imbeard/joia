import {defineField, defineType} from 'sanity'
import {FilterIcon} from '@sanity/icons'
import {isUniqueOtherThanLanguage} from '../../utils/i18n'

export const wine = defineType({
  name: 'wine',
  title: 'Wine',
  type: 'document',
  icon: FilterIcon,
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
      name: 'secondaryTitle',
      title: 'Secondary Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueOtherThanLanguage,
      },
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
    }),
    defineField({
      name: 'winery',
      title: 'Winery',
      type: 'string',
    }),
    defineField({
      name: 'bottles',
      title: 'Bottles',
      type: 'array',
      of: [
        defineField({
          name: 'bottle',
          title: 'Bottle',
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'number',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'year',
              subtitle: 'price',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const {title, language} = selection
      return {
        title: language ? `${title} – ${language}` : title,
      }
    },
  },
})
