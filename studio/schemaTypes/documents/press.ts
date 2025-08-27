import {defineField, defineType} from 'sanity'
import {VersionsIcon} from '@sanity/icons'

export const press = defineType({
  name: 'press',
  title: 'Press',
  type: 'document',
  icon: VersionsIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
    }),
    defineField({
      name: 'magazine',
      title: 'Magazine',
      type: 'string',
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'magazine',
    },
  },
})
