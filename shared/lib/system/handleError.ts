import { Response } from 'express'
import { BadRequest, Forbidden, InternalServerError, NotFound, UnprocessedEntity } from './response'

export const handleError = (error: any, res: Response) => {
  if (error.name === 'HttpNotFound') {
    return NotFound(res, error.message)
  }

  if (error.name === 'HttpBadRequest') {
    return BadRequest(res, error.message)
  }

  if (error.name === 'HttpForbidden') {
    return Forbidden(res, error.message)
  }

  if (error.name === 'ValidationError') {
    return UnprocessedEntity(res, 'Unprocessed entity', error.errors)
  }
  return InternalServerError(res, 'Internal Server Error')
}
