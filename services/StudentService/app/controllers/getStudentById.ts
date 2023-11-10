import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { City, Student } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'

export const getStudentById = async (
  params: IControllerParams<{ id: string }>
) => {
  const inputs = params.input

  const student = await Student.findByPk(inputs.id, {
    include: [City]
  })

  if (!student) {
    throw new HttpNotFound('Student ' + NOT_FOUND)
  }
  return {
    payload: { student }
  }
}
