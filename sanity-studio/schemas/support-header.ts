export default {
  name: 'supportHeader',
  title: 'Support Header',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'text',
      description: 'The main heading text for the support page',
      validation: (Rule: any) => Rule.required(),
    }
  ]
}
