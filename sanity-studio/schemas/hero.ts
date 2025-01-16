export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main heading text for the hero section',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'The background image for the hero section',
      validation: (Rule: any) => Rule.required(),
      options: {
        hotspot: true
      }
    }
  ]
}
