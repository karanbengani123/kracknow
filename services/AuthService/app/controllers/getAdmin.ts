import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Role, User } from '../../../../shared/database/models'
import { FindOptions, Op } from 'sequelize'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { queryLikeString } from '../../../../shared/helpers/string'

export const getAdmin = async (params: IControllerParams<null>) => {
  const filterParams = params.args.queryString

  const querryParams: FindOptions = {
    attributes: ['uuid', 'name', 'email', 'profilepic', 'status']
  }

  let where: any = {}

  if (filterParams.q) {
    where = {
      [Op.or]: [
        { name: { [Op.like]: queryLikeString(filterParams.q) } },
        { email: { [Op.like]: queryLikeString(filterParams.q) } }
      ]
    }
  }
  querryParams.where = where

  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
    querryParams.limit = limit
    querryParams.offset = offset
  }

  const admin = await User.findAll({
    ...querryParams,
    include: [{ model: Role, as: "role" ,attributes:['roleName']}]
  })

  return {
    message: 'Successful',
    payload: {
      admin
    }
  }
}