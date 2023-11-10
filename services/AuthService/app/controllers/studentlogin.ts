import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IStudentLogin } from '../interfaces/IStudentLogin'
import { Student } from '../../../../shared/database/models'
import { sign } from 'jsonwebtoken'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { generateSha256Password } from '../../../../shared/helpers/generateSha256Password'

export const studentLogin = async (
  params: IControllerParams<IStudentLogin>
) => {
  const inputs = params.input

  const student: Student = await Student.findOne({
    where: {
      email: inputs.email,
      password: generateSha256Password(inputs.password)
    }
  })

  if (!student) {
    throw new HttpNotFound('The Student email or Password is wrong')
  }

  const token = sign(
    {
      id: student.uuid,
      type: 'student'
    },
    process.env.SHA256_PASSWORD_SALT,
    { expiresIn: process.env.TOKEN_LIFE }
  )
  return {
    message: 'successfully logged in',
    payload: {
      token,
      isRegistered: student.isRegistered
    }
  }
}
