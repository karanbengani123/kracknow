import { checkSchema } from 'express-validator'

export const storeFCMSchema = checkSchema({
  token: {
    in: ['body'],
    exists: {
      errorMessage: 'token is required',
    },
    isEmpty: {
      errorMessage: 'token is required',
      negated: true,
    },
  },
  deviceId: {
    in: ['body'],
    exists: {
      errorMessage: 'deviceId is required',
    },
    isEmpty: {
      errorMessage: 'deviceId is required',
      negated: true,
    },
  },
})
