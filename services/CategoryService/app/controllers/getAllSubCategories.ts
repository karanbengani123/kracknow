/* eslint-disable no-unused-vars */
import { FindOptions, Op } from 'sequelize'
import { SubCategory, Category } from '../../../../shared/database/models'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { queryLikeString } from '../../../../shared/helpers/string'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getAllSubCategories = async (params: IControllerParams<null>) => {
  const filterParams = params.args.queryString

  const querryParams: FindOptions = {
    include: [{
      model: Category,
      attributes: ['uuid', 'label']
    }]
  }

  let where: any = {}

  if (filterParams.q) {
    where = {
      [Op.or]: [
        { label: { [Op.like]: queryLikeString(filterParams.q) } },
        { '$Category_Category.label$': { [Op.like]: queryLikeString(filterParams.q) } }
      ]
    }
  }

  querryParams.where = where

  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
    querryParams.limit = limit
    querryParams.offset = offset
  }

  const subCategoryResult = await SubCategory.findAndCountAll(querryParams)

  return {
    payload: { list: subCategoryResult.rows, count: subCategoryResult.count }
  }
}
