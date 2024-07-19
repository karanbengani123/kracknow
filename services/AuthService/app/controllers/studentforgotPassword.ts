/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Student } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IForgotPassword } from '../interfaces/IForgetPassword'
import { NOT_FOUND } from '../../../../shared/constants/httpStatusCodes'
import { sendEmail } from '../../../../shared/helpers/sendEmail'
import { generateSha256Password, makeRandomString } from '../../../../shared/helpers/generateSha256Password'

export const
studentforgetPassword = async (params: IControllerParams<IForgotPassword>) => {
    const inputs = params.input
    const transaction = params.transaction

    const user = await Student.findOne({
      where: {
        email: inputs.email
      }
    })

    if (!user) {
      throw new HttpNotFound('Student' + NOT_FOUND)
    }

    const password = makeRandomString(8)

    await user.update({
      password: generateSha256Password(password)
    }, { transaction })

    await sendEmail(inputs.email, 'FORGET_USER_PASSWORD', {
      body: {
        name: user.name,
        password: password
      },
      subject: {}
    })

    await transaction.commit()

    return {
      message: 'Email has been sent'
    }
  }
