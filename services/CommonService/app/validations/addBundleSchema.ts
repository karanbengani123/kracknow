import { checkSchema } from 'express-validator';

export const addBundleSchema = checkSchema({
  bundle_name: {
    exists: {
      errorMessage: 'Bundle name is required',
    },
    in: ['body'],
    isIn: {
      options: [['small_pack', 'medium_pack', 'large_pack', 'extra_large']],
      errorMessage: 'Invalid bundle name',
    },
    isEmpty: {
      errorMessage: 'Bundle name cannot be empty',
      negated: true,
    },
  },
  
  amount_coins: {
    exists: {
      errorMessage: 'Amount in coins is required',
    },
    in: ['body'],
    isInt: {
      errorMessage: 'Amount in coins must be an integer',
    },
    toInt: true, // Convert to integer
    isEmpty: {
      errorMessage: 'Amount in coins cannot be empty',
      negated: true,
    },
  },

  amount_rupees: {
    exists: {
      errorMessage: 'Amount in rupees is required',
    },
    in: ['body'],
    isFloat: {
      errorMessage: 'Amount in rupees must be a decimal number',
    },
    toFloat: true, // Convert to float
    isEmpty: {
      errorMessage: 'Amount in rupees cannot be empty',
      negated: true,
    },
  },

  status: {
    optional: true, // Make status optional
    isInt: {
      errorMessage: 'Status must be an integer (0 or 1)',
      options: { min: 0, max: 1 }, // Restrict to 0 or 1
    },
    toInt: true, // Convert to integer
  },
});
