import { checkSchema } from 'express-validator'
export const resetPasswordSchema = checkSchema({
  password: {
    exists: {
      errorMessage: 'The password is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'The password is required',
      negated: true
    },
    isLength: {
      errorMessage: 'The Password should be at least 6 characters long',
      options: { min: 6 }
    }
  }
})
