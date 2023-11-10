import { checkSchema } from 'express-validator'

export const startExamSchema = checkSchema({
  currentTime: {
    exists: {
      errorMessage: 'currentTime is required'
    },

    in: ['body'],
    isEmpty: {
      errorMessage: 'currentTime cannot be Empty',
      negated: true
    }
  },
  examUUID: {
    exists: {
      errorMessage: 'examUUID is required'
    },

    in: ['body'],
    isEmpty: {
      errorMessage: 'examUUID cannot be Empty',
      negated: true
    }
  },

  examScheduleUUID: {
    exists: {
      errorMessage: 'examScheduleUUID is required'
    },

    in: ['body'],
    isEmpty: {
      errorMessage: 'examScheduleUUID cannot be Empty',
      negated: true
    }
  }
})
