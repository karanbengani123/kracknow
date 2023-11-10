import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IAdminLogin } from '../interfaces/IAdminLogin'
import { Role, User } from '../../../../shared/database/models'
import { sign } from 'jsonwebtoken'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { generateSha256Password } from '../../../../shared/helpers/generateSha256Password'

export const adminLogin = async (params: IControllerParams<IAdminLogin>) => {
  const inputs = params.input

  const user: any = await User.findOne({
    where: {
      email: inputs.email,
      password: generateSha256Password(inputs.password)
    },
    include: [{ model: Role, as: "role", attributes: ['roleName'] }]
  })

  if (!user) {
    throw new HttpNotFound('The Username or Password is wrong')
  }

  const token = sign({
    id: user.uuid,
    type: 'admin',
    role: user.roleUUID
  }, process.env.SHA256_PASSWORD_SALT, { expiresIn: process.env.TOKEN_LIFE })

  return {
    message: 'successfully logged in',
    payload: {
      token,
      role: user?.role?.roleName
    }
  }
}
