/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { User } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IForgotPassword } from '../interfaces/IForgetPassword'
import { NOT_FOUND } from '../../../../shared/constants/httpStatusCodes'
import { sendEmail } from '../../../../shared/helpers/sendEmail'
import { generateSha256Password, makeRandomString } from '../../../../shared/helpers/generateSha256Password'

export const
  forgetPassword = async (params: IControllerParams<IForgotPassword>) => {
    const inputs = params.input
    const transaction = params.transaction

    const user = await User.findOne({
      where: {
        email: inputs.email
      }
    })

    if (!user) {
      throw new HttpNotFound('Admin' + NOT_FOUND)
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
