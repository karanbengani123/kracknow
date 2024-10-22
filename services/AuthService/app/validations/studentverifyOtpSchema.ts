import { checkSchema } from 'express-validator';

export const studentverifyOtpSchema = checkSchema({
  email: {
    exists: {
      errorMessage: 'The email is required',
    },
    in: ['body'],
    isEmail: {
      errorMessage: 'The email is invalid',
    },
    isEmpty: {
      errorMessage: 'The email cannot be empty',
      negated: true,
    },
  },
  otp: {
    exists: {
      errorMessage: 'The OTP is required',
    },
    in: ['body'],
    isString: {
      errorMessage: 'The OTP must be a string',
    },
    isLength: {
      options: { min: 6, max: 6 },
      errorMessage: 'The OTP must be exactly 6 digits long',
    },
    isEmpty: {
      errorMessage: 'The OTP cannot be empty',
      negated: true,
    },
  },
});
