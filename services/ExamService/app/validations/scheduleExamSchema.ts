import { checkSchema } from 'express-validator'

export const scheduleExamSchema = checkSchema({
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
  },
  examTime: {
    exists: {
      errorMessage: 'examTime is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'examTime Cannot Be Empty',
      negated: true
    }
  },
  type: {
    exists: {
      errorMessage: 'type is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'type Cannot Be Empty',
      negated: true
    },
    isIn: {
      options: [['EXAM','MOCK_TEST','QUIZ']],
      errorMessage: 'type is required'
    }
  }
})
