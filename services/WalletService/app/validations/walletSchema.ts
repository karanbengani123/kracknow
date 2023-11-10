import { checkSchema } from 'express-validator'

export const walletSchema = checkSchema({
  orderAmount: {
    exists: {
      errorMessage: 'orderAmount is required'
    },
    in: ['body'],

    isEmpty: {
      errorMessage: 'orderAmount is required',
      negated: true
    },
    isNumeric: {
      errorMessage: 'orderAmount type must be a number'
    }
  }
})
