import { checkSchema } from 'express-validator'

export const adminAddMoneySchema = checkSchema({
  amount: {
    in: ['body'],
    exists: {
      errorMessage: 'amount is required'
    },
    isEmpty: {
      errorMessage: 'amount is required',
      negated: true
    },
    isNumeric: {
      errorMessage: 'amount type must be a number'
    }
  },
  studentUUID: {
    in: ['body'],
    exists: {
      errorMessage: 'studentUUID is required'
    },
    isEmpty: {
      errorMessage: 'studentUUID is required',
      negated: true
    },
    isUUID: {
      errorMessage: 'UUID is not valid'
    }
  }
})
