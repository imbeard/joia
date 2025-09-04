import {defineType, defineField} from 'sanity'

export const twoGalleries = defineType({
  name: 'twoGalleries',
  title: 'Two Galleries',
  description: 'Two galleries next to eachother',
  type: 'object',
  fields: [
    defineField({
      name: 'firstGallery',
      title: 'First Gallery',
      type: 'array',
      of: [{type: 'elementImage'}],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'secondGallery',
      title: 'Second Gallery',
      type: 'array',
      of: [{type: 'elementImage'}],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Two-image gallery',
      }
    },
  },
})
