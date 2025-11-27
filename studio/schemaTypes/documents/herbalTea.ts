import {defineField, defineType} from 'sanity'
import {FilterIcon} from '@sanity/icons'
import {isUniqueOtherThanLanguage} from '../../utils/i18n'

export const herbalTea = defineType({
  name: 'herbalTea',
  title: 'Herbal Tea',
  type: 'document',
  icon: FilterIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
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
      name: 'price',
      title: 'Price',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      price: 'price',
    },
    prepare(selection) {
      const {title, language, price} = selection
      return {
        title: language ? `${title} – ${language}` : title,
        subtitle: price,
      }
    },
  },
})
