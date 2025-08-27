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
      name: 'image',
      title: 'Image',
      type: 'elementImage',
    }),
    defineField({
      name: 'eventsBlock',
      title: 'Events Block',
      type: 'infoSection',
    }),
    defineField({
      name: 'detailBlock',
      title: 'Detail Block',
      type: 'infoSection',
    }),
    defineField({
      name: 'detailImage',
      title: 'Detail Image',
      type: 'elementImage',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Events',
      }
    },
  },
})
