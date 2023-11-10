import { checkSchema } from 'express-validator'

export const adminLoginSchema = checkSchema({
  email: {
    exists: {
      errorMessage: 'Email is required'
    },
    in: ['body'],

    isEmpty: {
      errorMessage: 'Email is required',
      negated: true
    }
  },

  password: {
    exists: {
      errorMessage: 'Password is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'Password is required',
      negated: true
    },
    isLength: {
      errorMessage: 'The Password should be at least 6 characters long',
      options: { min: 6 }
    }

  }
})
