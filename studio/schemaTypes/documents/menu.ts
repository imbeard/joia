import {defineField, defineType} from 'sanity'
import {FilterIcon} from '@sanity/icons'

export const menu = defineType({
  name: 'menu',
  title: 'Menu',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [
        {
          name: 'course',
          title: 'Course',
          type: 'infoSection',
        },
      ],
    }),
    defineField({
      name: 'dessert',
      title: 'Dessert Choice',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'desserts',
          title: 'Desserts',
          type: 'array',
          of: [
            {
              name: 'dessert',
              title: 'Dessert',
              type: 'infoSection',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      language: 'language',
    },
    prepare(selection) {
      const {title, language, price} = selection
      return {
        title: language ? `${title} – ${language}` : title,
        subtitle: price,
      }
    },
  },
})
