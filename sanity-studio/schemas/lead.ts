export default {
  name: 'lead',
  title: 'Leads',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string'
    },
    {
      name: 'fromLocation',
      title: 'From Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'toLocation',
      title: 'To Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'pickupDate',
      title: 'Pickup Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'vehicleYear',
      title: 'Vehicle Year',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'vehicleMake',
      title: 'Vehicle Make',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'vehicleModel',
      title: 'Vehicle Model',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'isOperable',
      title: 'Is Operable',
      type: 'boolean',
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Quote Sent', value: 'quote-sent' },
          { title: 'Converted', value: 'converted' },
          { title: 'Lost', value: 'lost' }
        ],
        layout: 'radio'
      },
      initialValue: 'new'
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'text'
            },
            {
              name: 'createdAt',
              title: 'Created At',
              type: 'datetime',
              options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                timeStep: 15,
                calendarTodayLabel: 'Today'
              }
            }
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'createdAt'
            }
          }
        }
      ]
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today'
      },
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      description: 'status'
    }
  },
  orderings: [
    {
      title: 'Created Date, New',
      name: 'createdAtDesc',
      by: [
        { field: 'createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [
        { field: 'status', direction: 'asc' }
      ]
    }
  ]
}
