import { checkSchema } from 'express-validator'

export const studentRegisterSchema = checkSchema({
  email: {
    exists: {
      errorMessage: 'Email is required'
    },
    in: ['body'],

    isEmpty: {
      errorMessage: 'Email is required',
      negated: true
    }
  },

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

  password: {
    exists: {
      errorMessage: 'Password is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'Password is required',
      negated: true
    },
    isLength: {
      errorMessage: 'The Password should be at least 6 characters long',
      options: { min: 6 }
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
