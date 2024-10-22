import { checkSchema } from 'express-validator'

export const registerBattleSchema = checkSchema({
  battleUUID: {
    exists: {
      errorMessage: 'battleUUID is required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'battleUUID is required',
      negated: true
    }
  }
})
