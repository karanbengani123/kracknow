import { checkSchema } from 'express-validator'

export const addKeywordSchema = checkSchema({
  attribute: {
    exists: {
      errorMessage: 'keyword attribute is required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'keyword attribute is required',
      negated: true
    }

  },

  status: {
    exists: {
      errorMessage: 'keyword status is required'
    },

    in: ['body'],

    isBoolean: {
      errorMessage: 'keyword status is required'
    },

    isEmpty: {
      errorMessage: 'Category status is required',
      negated: true
    }
  }
})
