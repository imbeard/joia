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
