import { Response } from 'express'
import {
  BAD_REQUEST, CREATED, FORBIDDEN,
  INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNPROCESSED_ENTITY
} from '../../constants/httpStatusCodes'
import { isArrayNotEmpty, isObject } from '../../helpers/validChecker'
import { IResponsePayload } from '../../interfaces/IResponsePayload'

export const Created = (res: Response, message: string, payload: IResponsePayload) => {
  return respond(res, CREATED, message, payload)
}

export const Ok = (res: Response, message: string, payload: IResponsePayload | IResponsePayload[]) => {
  return respond(res, OK, message, payload)
}

export const NotFound = (res: Response, message: string) => {
  return respond(res, NOT_FOUND, message)
}

export const Forbidden = (res: Response, message: string) => {
  return respond(res, FORBIDDEN, message)
}

export const UnprocessedEntity = (res: Response, message: string, payload: IResponsePayload) => {
  return respond(res, UNPROCESSED_ENTITY, message, payload)
}

export const BadRequest = (res: Response, message: string) => {
  return respond(res, BAD_REQUEST, message)
}

export const download = (res: Response, meta: { 'Content-Type': string, 'Content-disposition': string, generate: any }) => {
  res.setHeader('Content-Type', meta['Content-Type'])
  res.setHeader('Content-Disposition', meta['Content-disposition'])
  // res.status(200);

  meta.generate(res)
}

export const InternalServerError = (res: Response, message: string) => {
  return respond(res, INTERNAL_SERVER_ERROR, message)
}

const respond = (res: Response, code: number, message: string, payload?: IResponsePayload | IResponsePayload[]) => {
  const responseInfo: { message: string, payload?: IResponsePayload } = { message }

  if (isNonEmptyObject(payload) || Array.isArray(payload)) {
    responseInfo.payload = payload
  }
  return res.status(code).send(responseInfo)
}

const isNonEmptyObject = (value: any) => {
  return value && isObject(value) && isArrayNotEmpty(Object.keys(value))
}
