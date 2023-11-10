import { checkSchema } from 'express-validator'

export const newStudentInitialAmountSchema = checkSchema({
  amount: {
    in: ['body'],
    toInt: true,
    exists: {
      errorMessage: 'amount is required',
    },

    isEmpty: {
      errorMessage: 'amount is required',
      negated: true,
    },
    isNumeric: {
      errorMessage: 'amount is not valid number',
    },
  },
})
