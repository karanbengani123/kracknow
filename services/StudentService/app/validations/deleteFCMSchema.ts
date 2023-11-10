import { checkSchema } from 'express-validator'

export const deleteFCMSchema = checkSchema({
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
