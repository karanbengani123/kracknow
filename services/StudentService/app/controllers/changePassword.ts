import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Student } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { generateSha256Password } from '../../../../shared/helpers/generateSha256Password'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { WRONG_PASSWORD } from '../../../../shared/constants/httpErrorMessages'
import { IChangePassword } from '../interfaces/IChangePassword'

export const changePassword = async (
  params: IControllerParams<IChangePassword>
) => {
  const { input, transaction } = params
  const student: Student = await Student.findOne({
    where: {
      uuid: params.user.id,
      password: generateSha256Password(input.oldPassword)
    }
  })

  if (!student) {
    throw new HttpNotFound(WRONG_PASSWORD)
  }

  await student.update(
    {
      password: generateSha256Password(input.newPassword),
      isRegistered: true
    },
    {
      transaction
    }
  )

  await transaction.commit()

  return {
    message: SUCCESSFUL
  }
}
