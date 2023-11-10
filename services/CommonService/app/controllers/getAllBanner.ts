/* eslint-disable no-undef */
import { FindOptions, Op } from 'sequelize'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { Banner } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { queryLikeString } from '../../../../shared/helpers/string'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getAllBanner = async (params: IControllerParams<null>) => {
  const filterParams = params.args.queryString

  const querryParams: FindOptions = {
    attributes: ['url', 'tag', 'uuid']
  }

  let where: any = {}

  if (filterParams.q) {
    where = {
      tag: { [Op.like]: queryLikeString(filterParams.q) }
    }
  }

  querryParams.where = where

  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
    querryParams.limit = limit
    querryParams.offset = offset
  }

  const lists = await Banner.findAndCountAll(querryParams)

  if (!lists) {
    throw new HttpNotFound('Banner' + NOT_FOUND)
  }

  return {
    payload: {
      lists
    }
  }
}
