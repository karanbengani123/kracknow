import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import fetch from 'node-fetch'
import { IWallet } from '../interfaces/IWallet'
import {
  Student,
  Wallet,
  WalletTransaction,
} from '../../../../shared/database/models'
import {
  INBOUND,
  INITIALIZED,
  WALLET,
} from '../../../../shared/constants/message'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { MINIMUM_AMOUNT_10 } from '../../../../shared/constants/httpErrorMessages'
const uuid = require('uuid')

export const postGetToken = async (params: IControllerParams<IWallet>) => {
  const transaction = params.transaction
  const orderId = uuid.v4().split('-')[4]
  const orderAmount: number = params.input.orderAmount
  if (orderAmount < 10) {
    throw new HttpNotFound(MINIMUM_AMOUNT_10)
  }
  const response = await fetch(process.env.CASHFREE_URL, {
    method: 'POST',
    headers: {
      'x-client-id': process.env.CASHFREE_CLIENT_PG_ID,
      'x-client-secret': process.env.CASHFREE_CLIENT_PG_SECRET,
    },
    body: JSON.stringify({
      orderId,
      orderAmount,
      orderCurrency: process.env.CASHFREE_CURRENCY_TYPE,
    }),
  })
  let result = {}
  if (response.statusCode !== 200) {
    const tokenResponse = await response.json()
    const student = await Student.findByPk(params.user.id, {
      include: [
        {
          model: Wallet,
          as: 'wallet',
          attributes: ['uuid', 'studentUUID'],
        },
      ],
      attributes: ['firstName', 'lastName', 'email', 'mobileNumber'],
    })
    if (student) {
      // eslint-disable-next-line no-prototype-builtins
      if (tokenResponse.hasOwnProperty('cftoken')) {
        result = {
          orderId,
          orderAmount,
          appId: process.env.CASHFREE_CLIENT_PG_ID,
          tokenData: tokenResponse.cftoken,
          orderCurrency: process.env.CASHFREE_CURRENCY_TYPE,
          customerName: `${student.firstName} ${student.lastName}`,
          customerPhone: student.mobileNumber,
          customerEmail: student.email,
        }
        await WalletTransaction.create(
          {
            walletUUID: student.wallet.uuid,
            type: INBOUND,
            amount: orderAmount,
            status: INITIALIZED,
            orderId,
            paymentMode: WALLET,
          },
          { transaction }
        );
      } else {
        result = tokenResponse
      }
    }
  }

  await transaction.commit()

  return {
    message: SUCCESSFUL,
    payload: result,
  }
}
