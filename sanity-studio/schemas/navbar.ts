export default {
  name: 'navbar',
  title: 'Navigation Bar',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'links',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Link Text',
              type: 'string',
            },
            {
              name: 'url',
              title: 'Link URL',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'phoneIcon',
      title: 'Phone Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
