import { checkSchema } from 'express-validator';

export const newWithdrawalLimitAmountSchema = checkSchema({
  minamount: {
    in: ['body'],
    toInt: true,
    exists: {
      errorMessage: 'minamount is required',
    },
    isEmpty: {
      errorMessage: 'minamount is required',
      negated: true,
    },
    isNumeric: {
      errorMessage: 'minamount is not a valid number',
    },
  },
  maxamount: {
    in: ['body'],
    toInt: true,
    exists: {
      errorMessage: 'maxamount is required',
    },
    isEmpty: {
      errorMessage: 'maxamount is required',
      negated: true,
    },
    isNumeric: {
      errorMessage: 'maxamount is not a valid number',
    },
  },
});
