import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Student, StudentKeyword } from '../../../../shared/database/models'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { studentKeywordExclude } from '../../../WalletService/app/constant/excludeAttributes'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { STUDENT_DETAILS_NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'

export const getKeyword = async (params: IControllerParams<null>) => {
  const studentUUID = params.user.id
  const student: Student = await Student.findByPk(studentUUID)

  if (!student) {
    throw new HttpNotFound(STUDENT_DETAILS_NOT_FOUND)
  }

  const keywords = await StudentKeyword.findAll({
    where: {
      studentUUID
    },
    attributes: {
      exclude: studentKeywordExclude
    }
  })

  return {
    message: SUCCESSFUL,
    payload: keywords
  }
}
