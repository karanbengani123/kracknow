/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { City } from '../../../../shared/database/models'
import { FindOptions, Op } from 'sequelize'
import { queryLikeString } from '../../../../shared/helpers/string'
import { NOT_FOUND } from '../../../../shared/constants/httpStatusCodes'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'

export const getCities = async (params: IControllerParams<null>) => {
  const filterParams = params.args.queryString
  const querryParams: FindOptions = {
    attributes: ['city', 'uuid'],
    order: [['city', 'ASC']]
  }
  // console.log('====...>>>', filterParams)
  let where: any = {}

  if (filterParams.q) {
    where = {
      label: { [Op.like]: queryLikeString(filterParams.q) }
    }
  }

  console.log(querryParams)
  // console.log('============>', where)
  querryParams.where = where

  console.log(querryParams)
  const cities = await City.findAll(querryParams)

  console.log(cities)
  if (!cities) {
    throw new HttpNotFound('Cities' + NOT_FOUND)
  }

  return {
    payload: {
      cities
    }
  }
}
