import { FindOptions, Op } from 'sequelize'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { Banner } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { queryLikeString } from '../../../../shared/helpers/string'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getallBanner = async (params: IControllerParams<null>) => {
  const inputs = params.args.queryString

  const querryParams: FindOptions = {
    attributes: ['url', 'tag', 'uuid']
  }

  let where: any = {}

  if (inputs.q) {
    where = {
      tag: { [Op.like]: queryLikeString(inputs.q) }
    }
  }

  querryParams.where = where

  if (inputs.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(inputs as { limit: any, page: any })
    querryParams.limit = limit
    querryParams.offset = offset
  }

  const lists = await Banner.findAndCountAll(inputs)

  if (!lists) {
    throw new HttpNotFound('Banner' + NOT_FOUND)
  }

  return {
    payload: {
      lists
    }
  }
}
