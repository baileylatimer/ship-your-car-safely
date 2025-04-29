export default {
  name: 'aboutVideo',
  title: 'About Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The text that appears next to the play button',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    }
  ]
}
