export default {
  name: 'aboutHeading',
  title: 'About Heading',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'text',
      description: 'The main heading text for the about page',
      validation: (Rule: any) => Rule.required(),
    }
  ]
}
