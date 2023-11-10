import { checkSchema } from 'express-validator'

export const addBannerSchema = checkSchema({
  url: {
    exists: {
      errorMessage: 'Banner Image is required'
    },
    in: ['body'],
    isURL: {
      errorMessage: 'Banner Image is required'
    },
    isEmpty: {
      errorMessage: 'Banner Image is required',
      negated: true
    }

  },

  tag: {
    exists: {
      errorMessage: 'Banner tag is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'Banner tag is required',
      negated: true
    }
  }
})
