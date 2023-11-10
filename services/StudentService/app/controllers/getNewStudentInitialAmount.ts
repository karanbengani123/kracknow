import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { KeyValue, User } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import {
  NEW_STUDENT_INITIAL_AMOUNT,
  ONLY_ADMIN_ALLOWED,
} from '../../../../shared/constants/message'

export const getNewStudentInitialAmount = async (
  params: IControllerParams<null>
) => {
  const admin = await User.findByPk(params.user.id)
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED)
  }

  const amount = await KeyValue.findByPk(NEW_STUDENT_INITIAL_AMOUNT)

  return {
    message: SUCCESSFUL,
    payload: amount,
  }
}
