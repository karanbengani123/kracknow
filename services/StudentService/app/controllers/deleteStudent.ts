/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Student } from '../../../../shared/database/models'
import { IDeleteStudent } from '../interfaces/IDeleteStudent'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { NOT_FOUND } from '../../../../shared/constants/httpStatusCodes'

export const deleteStudent = async (params: IControllerParams<IDeleteStudent>) => {
  const inputs = params.input
  const transaction = params.transaction

  const student = await Student.findByPk(inputs.id)

  if (!student) {
    throw new HttpNotFound('Student' + NOT_FOUND)
  }

  await student.destroy({
    where: {
      uuid: student.id
    }
  }, { transaction })

  await transaction.commit()

  return {
    message: 'Student deleted Successfully'
  }
}
