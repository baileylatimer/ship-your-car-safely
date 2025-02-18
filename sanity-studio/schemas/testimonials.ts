export default {
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'The title shown above the testimonials (e.g. "What people are saying")',
    },
    {
      name: 'testimonialsList',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'testimonialText',
              title: 'Testimonial Text',
              type: 'text',
              description: 'The main testimonial content',
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              description: 'Name of the person giving the testimonial',
            },
            {
              name: 'image',
              title: 'Author Image',
              type: 'image',
              description: 'Profile image of the person giving the testimonial',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ]
    }
  ]
}
