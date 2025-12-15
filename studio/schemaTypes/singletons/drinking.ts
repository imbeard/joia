import {defineField, defineType} from 'sanity'
import {DropIcon} from '@sanity/icons'

export const drinking = defineType({
  name: 'drinking',
  title: 'Drinking',
  type: 'document',
  icon: DropIcon,
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
      name: 'heading',
      title: 'Heading',
      type: 'blockContent',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'blockContent',
    }),
    defineField({
      name: 'gallerySections',
      title: 'Gallery Sections',
      type: 'array',
      of: [{type: 'gallerySection'}],
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
      title: 'title',
      subtitle: 'language',
    },
  },
})
