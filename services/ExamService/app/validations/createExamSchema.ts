import { checkSchema } from 'express-validator'

export const addExamSchema = checkSchema({
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
  //   in: ['body'],
  //   isEmpty: {
  //     errorMessage: 'Exam description is required'
  //   }
  // },
  // allowPrimarySelection: {
  //   exists: {
  //     errorMessage: 'This field is required'
  //   },
  //   in: ['body'],
  //   isEmpty: {
  //     errorMessage: 'This field is required',
  //     negated: true
  //   }

  // },
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

  ExamBanner: {
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
  },
  'ExamPrice.*.toValue': {
    exists: {
      errorMessage: 'Rank value is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: ' Rank is required',
      negated: true
    }
  },
  'ExamPrice.*.fromValue': {
    exists: {
      errorMessage: 'Rank value is required'
    },
    in: ['body']
  },
  'ExamPrice.*.price': {
    exists: {
      errorMessage: 'price  is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: ' price is required',
      negated: true
    }
  },
  'examRankingFactor.*.type': {
    exists: {
      errorMessage: 'type  is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: ' type Cannot be empty',
      negated: true
    }
  },
  'examRankingFactor.*.point': {
    exists: {
      errorMessage: 'point  is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'point Cannot be empty',
      negated: true
    }
  },
  'examRankingFactor.*.coins': {
    in: ['body'],
    isEmpty: {
      errorMessage: 'coins Cannot be empty',
      negated: true
    },
    isNumeric: {
      errorMessage: 'coins is not valid number'
    }
  }
})
