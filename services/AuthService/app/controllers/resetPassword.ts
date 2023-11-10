import { NOT_FOUND, INVALID_TOKEN } from '../../../../shared/constants/httpErrorMessages'
import { ResetPasswordToken, User } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IResetPassword } from '../interfaces/IResetPassword'
import { generateSha256Password } from '../../../../shared/helpers/generateSha256Password'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'

export const resetPassword = async (params: IControllerParams<IResetPassword>) => {
  const inputs = params.input
  const transaction = params.transaction

  const forgetPassword: ResetPasswordToken = await ResetPasswordToken.findOne({
    where: {
      token: params.args.params.token
    }
  })

  if (!forgetPassword) {
    throw new HttpNotFound(INVALID_TOKEN)
  }

  const user = await User.findOne({
    where: {
      uuid: forgetPassword.user
    }
  })

  if (!user) {
    throw new HttpNotFound('User' + NOT_FOUND)
  }
  await forgetPassword.destroy({
    force: true,
    transaction
  })

  await user.update({
    password: generateSha256Password(inputs.password)
  }, { transaction })

  await transaction.commit()

  return {
    message: SUCCESSFUL
  }
}
