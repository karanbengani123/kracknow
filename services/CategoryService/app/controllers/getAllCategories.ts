/* eslint-disable no-undef */
import { FindOptions, Op } from 'sequelize'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { Category } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { queryLikeString } from '../../../../shared/helpers/string'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getAllCategories = async (params: IControllerParams<null>) => {
  const filterParams = params.args.queryString

  const querryParams: FindOptions = {
    attributes: ['icon', 'label', 'uuid', 'status'],
    order: ['label']
  }

  let where: any = {}

  if (filterParams.q) {
    where = {
      label: { [Op.like]: queryLikeString(filterParams.q) }
    }
  }

  querryParams.where = where

  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
    querryParams.limit = limit
    querryParams.offset = offset
  }

  const lists = await Category.findAndCountAll(querryParams)

  if (!lists) {
    throw new HttpNotFound('Category' + NOT_FOUND)
  }

  return {
    payload: {
      lists
    }
  }
}
