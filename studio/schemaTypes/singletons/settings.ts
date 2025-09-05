import {defineField, defineType} from 'sanity'
import {EarthGlobeIcon, MenuIcon, AsteriskIcon, SearchIcon, SunIcon} from '@sanity/icons'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: EarthGlobeIcon,
  fieldsets: [
    {
      name: 'company',
      options: {
        columns: 2,
      },
    },
    {
      name: 'contacts',
      options: {
        columns: 2,
      },
    },
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      fieldset: 'company',
    }),
    defineField({
      name: 'companyAddress',
      title: 'Company Address',
      type: 'string',
      fieldset: 'company',
    }),
    defineField({
      name: 'email',
      type: 'email',
      fieldset: 'contacts',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      fieldset: 'contacts',
    }),
    defineField({
      name: 'social',
      type: 'array',
      of: [{type: 'linkExternal'}],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      lang: 'language', // or the path your language field uses
    },
    prepare({lang}) {
      return {
        title: 'Settings',
        subtitle: lang || '—',
      }
    },
  },
})
