export const mailerInputSchema = {
  additionalProperties: false,
  properties: {
    data: {
      type: 'object'
    },
    identifier: {
      maxLength: 250,
      minLength: 1,
      type: 'string'
    },
    locale: {
      type: 'string'
    },
    recipient: {
      anyOf: [{
        maxLength: 250,
        minLength: 1,
        type: 'string'
      }, {
        items: [{
          maxLength: 250,
          minLength: 1,
          type: 'string'
        }],
        type: 'array'
      }]
    }
  },
  required: ['identifier', 'data', 'recipient'],
  type: 'object'
}
