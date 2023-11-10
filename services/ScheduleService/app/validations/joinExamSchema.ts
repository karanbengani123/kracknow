import { checkSchema } from 'express-validator'

export const joinExamSchema = checkSchema({
  examUUID: {
    exists: {
      errorMessage: 'examUUIDis required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'examUUID is required',
      negated: true
    }
  }
})
