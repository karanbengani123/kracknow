/* eslint-disable no-prototype-builtins */
import { IControllerParams } from '../../interfaces/IControllerParams'

/**
 * Check if an attribute defined in an object. does truth test if truthy is passed as true
 * @param object
 * @param key
 * @param truthy
 */
export const isDefined = (object: object, key: string, truthy: boolean = true) => {
  const isPresent = object.hasOwnProperty(key)

  if (!isPresent || !truthy) {
    return isPresent
  }

  return [null, undefined, ''].indexOf(object[key]) === -1
}

/**
 * Checks for an attribute present in the query string
 * @param params
 * @param key
 */
export const queryStringProperty = (params: IControllerParams<any>, key: string) => {
  return isDefined(params.args.queryString, key)
}
