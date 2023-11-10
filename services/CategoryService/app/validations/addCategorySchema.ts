import { checkSchema } from 'express-validator'

export const addCategorySchema = checkSchema({
  label: {
    exists: {
      errorMessage: 'Category label is required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'Category label is required',
      negated: true
    }
  },

  status: {
    exists: {
      errorMessage: 'Category status is required'
    },

    isBoolean: {
      errorMessage: 'Category status is required'
    },

    isEmpty: {
      errorMessage: 'Category status is required',
      negated: true
    }
  }

})
