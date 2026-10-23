import {defineField, defineType} from 'sanity'
import {BottleIcon} from '@sanity/icons'

export const softDrinks = defineType({
  name: 'softDrinks',
  title: 'Soft Drinks',
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'sectionsHeading',
      title: 'Sections Heading',
      type: 'string',
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
      lang: 'language', // or the path your language field uses
    },
    prepare({lang}) {
      return {
        title: 'Soft Drinks',
        subtitle: lang || '—',
      }
    },
  },
})
