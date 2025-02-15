export default {
  name: 'aboutVideo',
  title: 'About Video',
  type: 'document',
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*'
      }
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}
