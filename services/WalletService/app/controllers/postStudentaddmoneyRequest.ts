import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import {
  Wallet,
  WalletTransaction,
  student_addmoney_request,
} from "../../../../shared/database/models";
import { IStudentaddmoneyRequest } from "../interfaces";
import { ADMIN, INBOUND, PENDING } from "../../../../shared/constants/message";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { Request } from "express";
const uuid = require("uuid");

// import {
//   INSUFFICIENT_BALANCE,
//   MINIMUM_AMOUNT,
// } from "../../../../shared/constants/httpErrorMessages";
// const uuid = require("uuid");

export const postStudentaddmoneyRequest = async (
  params: IControllerParams<IStudentaddmoneyRequest>
) => {
  const { input, transaction } = params;
  let { transactionId, amount, transactionImage } = input;
  const studentUUID = params.user.id;
  console.log(input);
  //   const { transactionid } = input;

  const wallet = await Wallet.findOne({
    where: {
      studentUUID,
    },
  });
  console.log(wallet);

  const addmoneyObject = {
    transactionImage:transactionImage,
    amount,
    transactionId,
    referenceId: uuid.v4().split("-")[4],
    status: PENDING,
    studentUUID,
  };

  try {
    var addmoney = await student_addmoney_request.create(addmoneyObject);
  } catch (error) {
    console.log(error);
  }
  console.log(addmoney);
  if (addmoney) {
    console.log("enterr");
    let walletdata = await WalletTransaction.create(
      {
        walletUUID: wallet.dataValues.uuid,
        paymentMode: ADMIN,
        orderId: uuid.v4().split("-")[4],
        referenceId: addmoneyObject.referenceId,
        amount: amount,
        type: INBOUND,
        status: PENDING,
        paymentDate: new Date(),
      },
      { transaction }
    );
    console.log(walletdata);
  }

  await transaction.commit();

  // console.log(wallet)
  return {
    message: SUCCESSFUL,
    // payload:addmoney
  };
};
