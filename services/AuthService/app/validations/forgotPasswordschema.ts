import { checkSchema } from 'express-validator'
export const forgotPasswordSchema = checkSchema({
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
  }
})
