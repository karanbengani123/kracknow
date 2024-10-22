import { checkSchema } from 'express-validator'
export const studentresetPasswordSchema = checkSchema({
  email: {
    exists: {
        errorMessage: 'The email is required'
    },
    in: ['body'],
    isEmail: {
        errorMessage: 'The email is invalid'
    },
    isEmpty: {
        errorMessage: 'The email is required',
        negated: true
    }
  },
  newPassword: {
      exists: {
          errorMessage: 'The new password is required'
      },
      in: ['body'],
      isLength: {
          options: { min: 6 },
          errorMessage: 'The new password must be at least 6 characters long'
      }
  },
  confirmPassword: {
      exists: {
          errorMessage: 'The confirmation password is required'
      },
      in: ['body'],
      custom: {
          options: (value, { req }) => {
              if (value !== req.body.newPassword) {
                  throw new Error('The confirmation password does not match the new password');
              }
              return true;
          }
      }
  }
})
