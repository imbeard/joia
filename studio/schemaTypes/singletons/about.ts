import {defineField, defineType} from 'sanity'
import {CropIcon} from '@sanity/icons'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: CropIcon,
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'kitchen',
      title: 'Kitchen',
      type: 'infoSection',
    }),
    defineField({
      name: 'philosophy',
      title: 'Philosophy',
      type: 'infoSection',
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'array',
      of: [{name: 'member', title: 'Member', type: 'infoSection'}],
    }),
    defineField({
      name: 'founder',
      title: 'Founder',
      type: 'infoSection',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'elementImage',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'blockContent',
        }),
      ]
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About',
      }
    },
  },
})
