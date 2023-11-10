/* eslint-disable dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Student } from '../../../../shared/database/models'
import { FindOptions, Op } from 'sequelize'
import { queryLikeString } from '../../../../shared/helpers/string'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'

export const getAllStudent = async (params: IControllerParams<null>) => {
  const filterParams = params.args.queryString
  const querryParams: FindOptions = {
    attributes: ['uuid', 'profilePic', 'firstName', 'lastName', 'email', 'mobileNumber', 'status'],
    order: ['firstName']
  }

  let where: any = {}

  if (filterParams.fromDate && filterParams.toDate) {
    where['createdAt'] = { [Op.between]: [filterParams.fromDate, filterParams.toDate] }
  }

  if (filterParams.q) {
    where = {
      [Op.or]: [
        { firstName: { [Op.like]: queryLikeString(filterParams.q) } },
        { lastName: { [Op.like]: queryLikeString(filterParams.q) } },
        { email: { [Op.like]: queryLikeString(filterParams.q) } },
        { mobileNumber: { [Op.like]: queryLikeString(filterParams.q) } }
      ]
    }
  }

  querryParams.where = where

  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
    querryParams.limit = limit
    querryParams.offset = offset
  }

  const students = await Student.findAndCountAll(querryParams)

  if (!students) {
    throw new HttpNotFound('Student ' + NOT_FOUND)
  }

  return {
    message: SUCCESSFUL,
    payload: {
      students,
      count: students.count
    }
  }
}
