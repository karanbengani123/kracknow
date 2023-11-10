/* eslint-disable no-undef */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Keyword } from '../../../../shared/database/models'
import { FindOptions, Op } from 'sequelize'
import { queryLikeString } from '../../../../shared/helpers/string'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { NOT_FOUND } from '../../../../shared/constants/httpStatusCodes'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'

export const getKeyword = async (params: IControllerParams<null>) => {
  const filterParams = params.args.queryString

  const querryParams: FindOptions = {
    attributes: ['attribute', 'status'],
    order: ['attribute']
  }

  let where: any = {}

  if (filterParams.q) {
    where = {
      attribute: { [Op.like]: queryLikeString(filterParams.q) }
    }
  }

  querryParams.where = where

  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
    querryParams.limit = limit
    querryParams.offset = offset
  }

  const lists = await Keyword.findAndCountAll(querryParams)

  if (!lists) {
    throw new HttpNotFound('Keyword' + NOT_FOUND)
  }

  return {
    payload: {
      lists
    }
  }
}
