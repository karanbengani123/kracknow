import { checkSchema } from 'express-validator'

export const changePasswordSchema = checkSchema({
  oldPassword: {
    exists: {
      errorMessage: 'oldPassword is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'oldPassword is required',
      negated: true
    },
    isLength: {
      errorMessage: 'The oldPassword should be at least 6 characters long',
      options: { min: 6 }
    }
  },
  newPassword: {
    exists: {
      errorMessage: 'newPassword is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'newPassword is required',
      negated: true
    },
    isLength: {
      errorMessage: 'The newPassword should be at least 6 characters long',
      options: { min: 6 }
    }
  }
})
