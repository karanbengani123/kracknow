import { checkSchema } from 'express-validator'

export const updateMockTestSchema = checkSchema({
  title: {
    exists: {
      errorMessage: 'Exam title is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'Exam title is required',
      negated: true
    }
  },
  categoryUUID: {
    exists: {
      errorMessage: 'Exam category is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'Exam Category is required',
      negated: true
    },
    isUUID: {
      errorMessage: 'Exam Category is required'
    }
  },
  description: {
    exists: {
      errorMessage: 'Exam description is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'Exam description is required',
      negated: true
    }
  },

  marksPerQuestion: {
    exists: {
      errorMessage: 'This field is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'This field is required',
      negated: true
    }
  },

  'ExamCity.*.cityUUID': {
    exists: {
      errorMessage: 'Exam city is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'Exam city is required',
      negated: true
    }
  },

  'ExamKeyword.*.attribute': {
    exists: {
      errorMessage: 'Exam keyword is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'Exam keyword is required',
      negated: true
    }
  },

  'ExamQuestion.*.questionUUID': {
    exists: {
      errorMessage: 'Exam keyword is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'Exam keyword is required',
      negated: true
    }
  }

})
