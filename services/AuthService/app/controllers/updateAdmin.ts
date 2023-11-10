import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { User } from '../../../../shared/database/models'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IUpdateAdmin } from '../interfaces/IUpdateAdmin'

export const adminUpdate = async (params: IControllerParams<IUpdateAdmin>) => {
  const inputs = params.input
  const transaction = params.transaction

  const admin = await User.findOne({
    where: {
      email: inputs.email,
    },
  })
  if (!admin) {
    throw new HttpNotFound('Admin ' + NOT_FOUND)
  }
  const entity = {
    name: inputs.name,
    email: inputs.email,
    profilepic: inputs.profilepic,
  }
  await admin.update(entity, { transaction })

  await transaction.commit()

  return {
    message: 'updated Successful',
  }
}
