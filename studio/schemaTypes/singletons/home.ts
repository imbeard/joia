import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
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
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'infoSection',
    }),
    defineField({
      name: 'lunch',
      title: 'Lunch',
      type: 'infoSection',
    }),
    defineField({
      name: 'menus',
      title: 'Our Menus',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'menu',
          title: 'Menus',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'menu'}]}],
        }),
      ],
    }),
    defineField({
      name: 'philosophy',
      title: 'Philosophy',
      type: 'infoSection',
    }),
    defineField({
      name: 'chefs',
      title: 'Chefs',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'blockContent',
        }),
        defineField({
          name: 'cta',
          title: 'Cta',
          type: 'linkInternal',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      lang: 'language', // or the path your language field uses
    },
    prepare({lang}) {
      return {
        title: 'Home',
        subtitle: lang || '—',
      }
    },
  },
})
