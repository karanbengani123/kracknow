/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Student } from '../../../../shared/database/models'
import { IUpdateStudent } from '../interfaces/IUpdateStudent'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { sendEmail } from '../../../../shared/helpers/sendEmail'

export const updateStudent = async (params: IControllerParams<IUpdateStudent>) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMmYzNDNkLThhODUtNGRlMS1iYjI4LWVkMzdlZGM5NzNlZSIsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNzI3MjQxNzM1LCJleHAiOjE3MjczMjgxMzV9._c5NOKCEUwdwWljFLNiW9cjcuTk8hrhl0X8wyXGIzx4";
  console.log(token)
  const inputs = params.input
  const transaction = params.transaction

  const student = await Student.findByPk(inputs.id)

  if (!student) {
    throw new HttpNotFound('Student' + NOT_FOUND)
  }

  // const password = randomPassword(8)
  await student.update({
    firstName: inputs.firstName,
    lastName: inputs.lastName,
    email: inputs.email,
    profilePic: inputs.profilePic,
    idProof: inputs.idProof,
    mobileNumber: inputs.mobileNumber,
    status: inputs.status,
    // password: generateSha256Password(password),
    cityUUID: inputs.city

  }, { transaction })

  await sendEmail(inputs.email, 'STUDENT_UPDATE', {
    body: {
      email: student.email,
      // password: password,
      firstName: student.firstName,
      mobileNumber: student.mobileNumber
    },
    subject: {}
  })

  await transaction.commit()

  return {
    message: 'Student is updated and email has been sent',
    payload: {}
  }
}
