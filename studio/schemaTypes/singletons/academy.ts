import {defineField, defineType} from 'sanity'
import {Progress75Icon} from '@sanity/icons'

export const academy = defineType({
  name: 'academy',
  title: 'Academy',
  type: 'document',
  icon: Progress75Icon,
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
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [
        {
          name: 'course',
          title: 'Course',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'enrollmentOpen',
              title: 'Enrollment Open',
              type: 'string',
              options: {
                list: [
                  {title: 'Yes', value: 'yes'},
                  {title: 'No', value: 'no'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'blockContent',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Academy',
      }
    },
  },
})
