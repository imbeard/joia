import {defineField, defineType} from 'sanity'
import {FeedbackIcon} from '@sanity/icons'

export const events = defineType({
  name: 'events',
  title: 'Events',
  type: 'document',
  icon: FeedbackIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'blockContent',
    }),
    defineField({
      name: 'gallery',
      type: 'gallery',
    }),
    defineField({
      name: 'eventsBlock',
      title: 'Events Block',
      type: 'infoSection',
    }),
    defineField({
      name: 'gallerySection',
      type: 'gallerySection',
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
        title: 'Events',
        subtitle: lang || '—',
      }
    },
  },
})
