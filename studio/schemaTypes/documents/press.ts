import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {isUniqueOtherThanLanguage} from '../../utils/i18n'

import {VersionsIcon} from '@sanity/icons'

export const press = defineType({
  name: 'press',
  title: 'Press',
  type: 'document',
  icon: VersionsIcon,
  orderings: [orderRankOrdering],

  fields: [
    orderRankField({
      type: 'press',
      newItemPosition: 'before',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
    }),
    defineField({
      name: 'magazine',
      title: 'Magazine',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueOtherThanLanguage,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      magazine: 'magazine',
    },
    prepare(selection) {
      const {title, language, magazine} = selection
      return {
        title: language ? `${title} – ${language}` : title,
        subtitle: magazine,
      }
    },
  },
})
