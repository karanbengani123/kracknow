import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { generateSha256Password } from '../../../../shared/helpers/generateSha256Password'
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest'
import {
  KeyValue,
  Student,
  Wallet,
  WalletTransaction,
} from '../../../../shared/database/models'
import { IStudentRegister } from '../interfaces/IStudentRegister'
import { ACCOUNT_CREATED_CHECK_EMAIL } from '../../../../shared/constants/httpSuccessMessages'
import { sendEmail } from '../../../../shared/helpers/sendEmail'
import {
  ADMIN,
  INBOUND,
  NEW_STUDENT_INITIAL_AMOUNT,
  SUCCESS,
} from '../../../../shared/constants/message'
const uuid = require('uuid')

export const studentRegister = async (
  params: IControllerParams<IStudentRegister>
) => {
  const inputs = params.input
  const transaction = params.transaction

  const existingStudent = await Student.findOne({
    where: {
      email: inputs.email,
    },
  })

  if (existingStudent) {
    throw new HttpBadRequest('student already exists')
  }
  const password = uuid.v4().split('-')[4]
  const initialamount = await KeyValue.findByPk(NEW_STUDENT_INITIAL_AMOUNT)
  const student = await Student.create(
    {
      email: inputs.email,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      mobileNumber: inputs.mobileNumber,
      password: generateSha256Password(password),
      status: true,
      cityUUID: inputs.city,
      wallet: [
        {
          balance: initialamount ? initialamount.intValue : 0,
        },
      ],
    },
    {
      include: [
        {
          model: Wallet,
          as: 'wallet',
        },
      ],
      transaction,
    }
  )

  if (student && initialamount) {
    await WalletTransaction.create(
      {
        walletUUID: student.wallet.uuid,
        paymentMode: ADMIN,
        orderId: uuid.v4().split('-')[4],
        referenceId: uuid.v4().split('-')[4],
        amount: initialamount.intValue,
        type: INBOUND,
        status: SUCCESS,
        paymentDate: new Date(),
      },
      { transaction }
    )
  }

  await transaction.commit()
  if (student) {
    await sendEmail(inputs.email, 'STUDENT_REGISTER', {
      body: {
        firstName: student.firstName,
        email: student.email,
        mobileNumber: student.mobileNumber,
        password: password,
      },
      subject: {},
    })
  }

  return {
      message: ACCOUNT_CREATED_CHECK_EMAIL,
      payload: {},
  };
}
