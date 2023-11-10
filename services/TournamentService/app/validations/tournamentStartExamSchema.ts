import { checkSchema } from 'express-validator'

export const tournamentStartExamSchema = checkSchema({
  participationUUID: {
    exists: {
      errorMessage: 'tournamentUUID is required'
    },

    in: ['body'],
    isEmpty: {
      errorMessage: 'tournamentUUID cannot be Empty',
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
})
