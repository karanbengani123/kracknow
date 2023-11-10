import { checkSchema } from 'express-validator'

export const updateScheduleSchema = checkSchema({
  startTime: {
    exists: {
      errorMessage: 'Start time  is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'Start time Cannot be Empty',
      negated: true
    }
  },
  endTime: {
    exists: {
      errorMessage: 'EndTime is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'endTime Cannot Be Empty',
      negated: true
    }
  }
})
