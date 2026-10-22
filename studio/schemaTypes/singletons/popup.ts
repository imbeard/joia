import {defineField, defineType} from 'sanity'
import {ExpandIcon} from '@sanity/icons'

export const popup = defineType({
  name: 'popup',
  title: 'Popup',
  type: 'document',
  icon: ExpandIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
    }),
    defineField({
      name: 'display',
      title: 'Display',
      type: 'string',
      options: {
        list: [
          {title: 'Once per browser session', value: 'session'},
          {title: 'Every visit to the homepage', value: 'always'},
        ],
        layout: 'radio',
      },
      initialValue: 'session',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Popup',
      }
    },
  },
})
