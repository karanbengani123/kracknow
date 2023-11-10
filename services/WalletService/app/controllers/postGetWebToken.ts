import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import fetch from "node-fetch";
import { IWallet } from "../interfaces/IWallet";
import {
  Student,
  Wallet,
  WalletTransaction,
} from "../../../../shared/database/models";
import {
  INBOUND,
  INITIALIZED,
  WALLET,
} from "../../../../shared/constants/message";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { MINIMUM_AMOUNT_10 } from "../../../../shared/constants/httpErrorMessages";

export const postGetWebToken = async (params: IControllerParams<IWallet>) => {
  const transaction = params.transaction;
  let result: any = {};
  const order_amount: number = params.input.orderAmount;
  if (order_amount < 10) {
    throw new HttpNotFound(MINIMUM_AMOUNT_10);
  }

  const student = await Student.findByPk(params.user.id, {
    attributes: ["uuid", "email", "mobileNumber"],
    include: [
      {
        model: Wallet,
        as: "wallet",
      },
    ],
  });

  if (student) {
    const response = await fetch(process.env.CASHFREE_WEB_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_CLIENT_PG_ID,
        "x-client-secret": process.env.CASHFREE_CLIENT_PG_SECRET,
        "x-api-version": "2022-01-01",
      },
      body: JSON.stringify({
        customer_details: {
          customer_id: student.uuid,
          customer_email: student.email,
          customer_phone: student.mobileNumber,
        },
        order_amount,
        order_currency: "INR",
        
          order_meta: {
            "return_url": null,
            // "notify_url": "https://o7z8zek6f5.execute-api.ap-south-1.amazonaws.com/dev/webhook/cashfree",
            "notify_url": "https://api.kracknow.com/webhook/cashfree",
            "payment_methods": null
          }
      }),

    });
    result = await response.json();

    if (response.status === 200) {
      await WalletTransaction.create(
        {
          walletUUID: student.wallet.uuid,
          type: INBOUND,
          amount: order_amount,
          status: INITIALIZED,
          orderId: result.order_id,
          paymentMode: WALLET,
        },
        { transaction }
      );
    }
  }

  await transaction.commit();

  return {
    message: SUCCESSFUL,
    payload: result,
  };
};
