import { checkSchema } from 'express-validator'

export const StudentSchema = checkSchema({
  firstName: {
    exists: {
      errorMessage: 'First Name is required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'First Name is required',
      negated: true
    }
  },

  lastName: {
    exists: {
      errorMessage: 'Last Name is required'
    },

    in: ['body'],

    isEmpty: {
      errorMessage: 'Last Name is required',
      negated: true
    }
  },

  email: {
    exists: {
      errorMessage: 'Email id is required'
    },

    in: ['body'],

    isEmail: {
      errorMessage: 'Email is invalid'
    },

    isEmpty: {
      errorMessage: 'Email id is required',
      negated: true
    }
  },

  mobileNumber: {
    exists: {
      errorMessage: ' Mobile Number is required'
    },
    in: ['body'],
    trim: true,
    isEmpty: {
      errorMessage: 'Mobile number is required',
      negated: true
    },
    isMobilePhone: {
      options: 'en-IN',
      errorMessage: 'Mobile Number is not valid'
    }

  },
  status: {
    exists: {
      errorMessage: 'Status is required'
    },

    in: ['body'],

    isBoolean: {
      errorMessage: 'Status is required'
    },

    isEmpty: {
      errorMessage: 'Status is required',
      negated: true
    }
  },

  city: {
    exists: {
      errorMessage: 'City is required'
    },
    in: ['body'],

    isEmpty: {
      errorMessage: 'City is required',
      negated: true
    }
  }

})
