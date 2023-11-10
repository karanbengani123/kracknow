import { checkSchema } from 'express-validator'

export const examTakenSchema = checkSchema({
  examUUID: {
    exists: {
      errorMessage: 'examUUID is required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'examUUID cannot be empty',
      negated: true
    }
  },
  questionUUID: {
    exists: {
      errorMessage: 'questionUUID is required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'questionUUID cannot be empty',
      negated: true
    }
  },
  categoryType: {
    in: ['body'],
    exists: {
      errorMessage: 'categoryType is required'
    },
  },
  description: {
    in: ['body'],
    exists: {
      errorMessage: 'description is required'
    },
  },
  givenAnswer: {
    in: ['body'], 
    exists: {
      errorMessage: 'givenAnswer is required'
    }
  },
  isLastRecord: {
    in: ['body'],
    exists: {
      errorMessage: 'isLastRecord is required'
    },
    isEmpty: {
      errorMessage: 'isLastRecord cannot be empty',
      negated: true
    },
    isBoolean: {
      errorMessage: 'isLastRecord must be a boolean'
    }
  },
  status: {
    in: ['body'],
    exists: {
      errorMessage: 'status is required'
    },
    isEmpty: {
      errorMessage: 'status cannot be empty',
      negated: true
    },
    isIn: {
      options: [["ANSWERED", "SKIPPED", "TIME_OUT"]],
      errorMessage: 'status must be one of ["ANSWERED", "SKIPPED","TIME_OUT"]'
    }
  },
  options: {
    in: ['body'],
    exists: {
      errorMessage: 'options is required'
    },
    isEmpty: {
      errorMessage: 'options cannot be empty',
      negated: true
    },
    isArray: {
      options: { min: 1 },
      errorMessage: 'options must be an array atleast once',
    }
  },
  time: {
    in: ['body'],
    exists: {
      errorMessage: 'time is required'
    },
    isEmpty: {
      errorMessage: 'time cannot be empty',
      negated: true
    }
  },
})
