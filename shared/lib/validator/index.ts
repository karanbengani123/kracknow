/* eslint-disable no-prototype-builtins */
import { validationResult } from 'express-validator'
import * as qs from 'qs'
import { ValidationError } from '../../exceptions/ValidationError'

/**
 * An express middleware which validates the request body based on the schema passed into it.
 * @param schema
 */
export async function validator (schema: any, data) {
  const req = data
  await Promise.all(schema.map(validation => validation.run(req)))
  const errors = validationResult(req) // Collects the validation results from the lib
  if (!errors.isEmpty()) {
    const processedErrors = await parseErrors(errors.array({
      onlyFirstError: true // Tells the lib to return only the first error for every field
    }))

    throw new ValidationError('Validation Error', processedErrors)
  }
}

/**
 * The method parsed the express validation error to a more structured format
 * @param errors
 */
function parseErrors (errors: any[]) {
  // Maps through the array of errors and convert to query string format for easy conversion to array
  const queryString: string = errors.map((error) => {
    let param = error.param // Error key string

    if (error.param.split('.').length > 1) {
      param = error.param.split('').map((char: string, index: number) => { // Walk through the string
        if (char === '.') { // Find the "." operator
          if (error.param[index - 1] === ']') { // Check if the previous character is "]"
            return '[' // Replace it with closing squire bracket "]"
          } else {
            return '][' // close the previous one and open another one
          }
        }
        if (error.param.length - 1 === index) { // Check if this is the last character
          if (char !== ']') { // check if the character is not a closing bracket
            return char + ']' // Put a closing bracket at the end
          }
        }
        return char
      }).join('')
    }
    return [param, error.msg].join('=')
  }).join('&')

  const parsedErrors: any = qs.parse(queryString) // Pass the generated query string to the query string parser "qs"
  const result = {}

  validateObject(result, parsedErrors) // Converts the result to a more readable format

  return result
}

/**
 * A recursive method to validate object in the errors
 * @param parent
 * @param errors
 */
function validateObject (parent: any, errors: object) {
  for (const err of Object.keys(errors)) { // loops through the objects keys
    if (typeof errors[err] === 'string') { // check if the key's value is string
      parent[err] = { message: errors[err] } // Put the message into the result object and continue the loop.
      continue
    }
    if (Array.isArray(errors[err])) { // Check if the key's value is an array
      parent[err] = {} // Put an object with the name as the key to the object for further adding the errors
      // Check if the first element of the array is a string
      if (errors[err].length && typeof errors[err][0] === 'string') {
        parent[err].message = errors[err][0]
        continue
      }
      validateArray(parent[err], errors[err]) // Validate every object in the array
      continue
    }

    parent[err] = []
    validateObject(parent[err], errors[err])
  }
}

/**
 * A recursive method to loop through every elements in the array and validate it.
 * @param parent
 * @param errors
 */
function validateArray (parent: any, errors: any[]) {
  for (const err of errors) {
    if (typeof err === 'object' && !Array.isArray(err)) {
      if (!parent.hasOwnProperty('children')) {
        parent.children = []
      }
      parent.children.push({})
      validateObject(parent.children[parent.children.length - 1], err)
    }
  }
}
