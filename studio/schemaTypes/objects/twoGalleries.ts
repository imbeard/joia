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
    }),
    defineField({
      name: 'secondGallery',
      title: 'Second Gallery',
      type: 'array',
      of: [{type: 'elementImage'}],
      options: {
        layout: 'grid',
      },
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
