import { checkSchema } from 'express-validator'

export const updateQuestionSchema = checkSchema({

  categoryUUID: {
    exists: {
      errorMessage: 'Category is required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'Category is required',
      negated: true
    }

  },

  subCategoryUUID: {
    exists: {
      errorMessage: 'SubCategory is required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'SubCategory is required',
      negated: true
    }

  },

  status: {
    exists: {
      errorMessage: 'status is required'
    },
    in: ['body'],
    isBoolean: {
      errorMessage: 'status is required'
    },
    isEmpty: {
      errorMessage: 'Status is required',
      negated: true
    }

  },

  title: {
    exists: {
      errorMessage: 'Question is required'
    },
    in: ['body'],

    isEmpty: {
      errorMessage: 'Question is required',
      negated: true
    }
  },

  'QuestionOption.*.key': {
    exists: {
      errorMessage: 'option fields are required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'option fields are required',
      negated: true
    }

  },
  'QuestionOption.*.text': {
    in: ['body'],
    custom: {
      options: (_value, { req, location, path }) => {
        console.log(location)
        const pos: number = path.indexOf('[')
        if (
          req.body.QuestionOption[
            +path.substring(pos + 1, pos + 2)
          ].text === '' && req.body.QuestionOption[
            +path.substring(pos + 1, pos + 2)
          ].image === ''
        ) {
          throw new Error(
            'Image Or text is Required'
          )
        }

        return true
      }
    }

  },

  'QuestionOption.*.image': {
    in: ['body'],
    custom: {
      options: (_value, { req, location, path }) => {
        console.log(location)
        const pos: number = path.indexOf('[')
        if (
          req.body.QuestionOption[
            +path.substring(pos + 1, pos + 2)
          ].text === '' && req.body.QuestionOption[
            +path.substring(pos + 1, pos + 2)
          ].image === ''
        ) {
          throw new Error(
            'Image Or text is Required'
          )
        }

        return true
      }
    }
  },

  'QuestionOption.*.isCorrect': {
    exists: {
      errorMessage: ' correct answer is required'
    },

    in: ['body'],
    isBoolean: {
      errorMessage: 'correct answer should be boolean'
    },
    isEmpty: {
      errorMessage: 'correct answer cannot be empty',
      negated: true
    }

  }

})
