import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Student, StudentKeyword } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { STUDENT_DETAILS_NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { IAddKeyword } from '../interfaces/IAddKeyword'

export const updateKeyword = async (params: IControllerParams<IAddKeyword>) => {
  const transaction = params.transaction
  const studentUUID = params.user.id
  const student: Student = await Student.findByPk(studentUUID)

  if (!student) {
    throw new HttpNotFound(STUDENT_DETAILS_NOT_FOUND)
  }
  await StudentKeyword.destroy({
    where: {
      studentUUID
    }
  })

  await StudentKeyword.bulkCreate(
    params.input.keyword.map((attribute) => ({ studentUUID, attribute })),
    { transaction }
  )

  await transaction.commit()

  return {
    message: SUCCESSFUL
  }
}
