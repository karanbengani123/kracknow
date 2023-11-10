import { checkSchema } from 'express-validator'

export const addKeywordSchema = checkSchema({
  keyword: {
    in: ['body'],
    exists: {
      errorMessage: 'keyword is required'
    },
    isEmpty: {
      errorMessage: 'keyword is required',
      negated: true
    },
    isArray: {
      errorMessage: 'keyword must be an array'
    }
  }
})
