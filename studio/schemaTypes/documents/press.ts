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
      description: 'Use only if no precise date is given',
      type: 'string',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      description: 'If a precise date is given, use this field instead of the "Date" field',
      type: 'date',
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
