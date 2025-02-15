export default {
  name: 'infoAbout',
  title: 'Info About',
  type: 'document',
  fields: [
    {
      name: 'items',
      title: 'Info Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      validation: (Rule: any) => Rule.length(2).error('Exactly 2 images are required'),
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
}
