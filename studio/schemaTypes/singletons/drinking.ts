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
      name: 'heading',
      title: 'Heading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'blockContent',
    }),
    defineField({
      name: 'gallerySectionOne',
      title: 'Gallery Section One',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'gallery',
          title: 'Gallery',
          type: 'gallery',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'linkInternal',
        }),
      ],
    }),
    defineField({
      name: 'gallerySectionTwo',
      title: 'Gallery Section Two',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'gallery',
          title: 'Gallery',
          type: 'gallery',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'linkInternal',
        }),
      ],
    }),
    defineField({
      name: 'gallerySectionThree',
      title: 'Gallery Section Three',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'gallery',
          title: 'Gallery',
          type: 'gallery',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'linkInternal',
        }),
      ],
    }),
    defineField({
      name: 'tastingNotes',
      title: 'Tasting Notes',
      type: 'infoSection',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Drinking',
      }
    },
  },
})
