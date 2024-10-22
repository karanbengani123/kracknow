import { checkSchema } from 'express-validator';

export const newConversionRateSchema = checkSchema({
  coin: {
    in: ['body'],
    toInt: true,
    exists: {
      errorMessage: 'Coin value is required',
    },
    isEmpty: {
      errorMessage: 'Coin value is required',
      negated: true,
    },
    isNumeric: {
      errorMessage: 'Coin value must be a valid number',
    },
  },
  rupee: {
    in: ['body'],
    toInt: true,
    exists: {
      errorMessage: 'Rupee value is required',
    },
    isEmpty: {
      errorMessage: 'Rupee value is required',
      negated: true,
    },
    isNumeric: {
      errorMessage: 'Rupee value must be a valid number',
    },
  },
});
