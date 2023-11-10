import { checkSchema } from 'express-validator'

export const getSignedUrlSchema = checkSchema({
  for: {
    exists: {
      errorMessage: 'The email is required for value should be from the defined list'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'for value should be from the defined list',
      negated: true
    }
  }
})
