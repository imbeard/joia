import {defineField} from 'sanity'
import {BlockquoteIcon} from '@sanity/icons'

export const blockquote = defineField({
  name: 'blockquote',
  title: 'Blockquote',
  icon: BlockquoteIcon,
  type: 'object',
  fields: [
    defineField({
        name: 'text',
        type: 'blockContent'
    })
  ],
  preview: {
    select: {
      title: 'text',
    },
  },
})
