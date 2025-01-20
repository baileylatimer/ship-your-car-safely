export default {
  name: 'videoSection',
  title: 'Video Section',
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
      title: 'Video File',
      type: 'file',
      description: 'Upload an MP4 video file',
      validation: (Rule: any) => Rule.required(),
      options: {
        accept: 'video/mp4'
      }
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'The thumbnail image shown before the video plays',
      validation: (Rule: any) => Rule.required(),
      options: {
        hotspot: true
      }
    }
  ]
}
