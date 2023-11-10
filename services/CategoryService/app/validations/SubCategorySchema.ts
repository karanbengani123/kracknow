import { checkSchema } from 'express-validator'

export const SubCategorySchema = checkSchema({
  label: {
    exists: {
      errorMessage: 'SubCategory label is required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'SubCategory label is required',
      negated: true
    }

  },

  status: {
    exists: {
      errorMessage: 'SubCategory status is required'
    },

    isBoolean: {
      errorMessage: 'SubCategory status is required'
    },

    isEmpty: {
      errorMessage: 'SubCategory status is required',
      negated: true
    }
  }

})
