export default {
  name: 'imagesAbout',
  title: 'Images About',
  type: 'document',
  fields: [
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
