import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { User } from '../../../../shared/database/models'

export const getAdminByUUID = async (params: IControllerParams<null>) => {

  const admin = await User.findByPk(params.args.params.adminUUID, {
    attributes: ['name', 'email', 'profilepic', 'status', 'createdAt']

  })

  return {
    message: 'Successful',
    payload: {
      admin
    }
  }
}