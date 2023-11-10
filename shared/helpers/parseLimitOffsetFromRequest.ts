import { DEFAULT_PAGINATION_LIMIT } from '../constants/generic'
import { isDefined } from './isDefined'

/**
 * Retrieves the limit and offset from the request
 * @param req
 */
export function parseLimitOffsetFromRequest (queryStringOptions: { limit: any, page: any }) {
  let limit = DEFAULT_PAGINATION_LIMIT
  let offset = 0

  if (isDefined(queryStringOptions.limit)) {
    // Check if this is an integer and not zero.
    if (!isNaN(queryStringOptions.limit) && queryStringOptions.limit !== '0') {
      limit = parseInt(queryStringOptions.limit, 10)
    }
  }
  if (isDefined(queryStringOptions.page)) {
    // Check if this is an integer
    if (!isNaN(queryStringOptions.page)) {
      offset = (parseInt(queryStringOptions.page, 10) - 1) * limit
    }
  }
  return { limit, offset }
}
