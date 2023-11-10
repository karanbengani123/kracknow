import { checkSchema } from 'express-validator'

export const updateExamSchema = checkSchema({
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
  // description: {
  //   exists: {
  //     errorMessage: 'Exam description is required'
  //   },
  //   in: ['body'],
  //   isEmpty: {
  //     errorMessage: 'Exam description is required',
  //     negated: true
  //   }
  // },
  allowPrimarySelection: {
    exists: {
      errorMessage: 'This field is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'This field is required',
      negated: true
    }

  },
  isFeatured: {
    exists: {
      errorMessage: 'This field is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'This field is required',
      negated: true
    },
    isBoolean: {
      errorMessage: 'This field is required'
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

  'ExamSchedule.*.studentLimit': {
    exists: {
      errorMessage: 'Student limit is required'
    },
    in: ['body'],
    isNumeric: {
      errorMessage: 'student limit must be number'
    },
    isEmpty: {
      errorMessage: 'student limit is required',
      negated: true
    }
  },
  'ExamSchedule.*.projectedTotalWiningPrice': {
    exists: {
      errorMessage: 'Winning price is required'
    },
    in: ['body'],
    isNumeric: {
      errorMessage: 'Winning Price is required'
    },
    isEmpty: {
      errorMessage: 'Winning price is required',
      negated: true
    }

  },

  'ExamBanner.*.url': {
    exists: {
      errorMessage: 'Exam Banner is required'
    },
    in: ['body'],
    isURL: {
      errorMessage: 'Exam Banner is required'
    },
    isEmpty: {
      errorMessage: 'Exam Banner is required',
      negated: true
    }
  },

  'ExamCity.*.uuid': {
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
