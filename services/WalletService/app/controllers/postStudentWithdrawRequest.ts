import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { IStudentWithdrawRequest } from "../interfaces";
import { Wallet, WalletTransaction, Withdrawallimit, WithdrawlRequest } from "../../../../shared/database/models";
// import { Wallet, Withdrawallimit } from "../../../../shared/database/models";

import {  NEW_WITHDRWAL_LIMIT, OUTBOUND, PENDING, WALLET } from "../../../../shared/constants/message";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import {
  INSUFFICIENT_BALANCE,
  MAXIMUM_AMOUNT,
  MINIMUM_AMOUNT,
} from "../../../../shared/constants/httpErrorMessages";
const uuid = require("uuid");

export const postStudentWithdrawRequest = async (
  params: IControllerParams<IStudentWithdrawRequest>
) => {
  const { input, transaction } = params;
  const { amount, transferMode, remarks } = input;
  const studentUUID = params.user.id;

  const wallet = await Wallet.findOne({
    where: {
      studentUUID,
    },
  });

  var withdrawal = await Withdrawallimit.findByPk(NEW_WITHDRWAL_LIMIT);
console.log(withdrawal.dataValues.minval)
console.log(withdrawal.dataValues.maxval)
  if (amount > wallet.balance) {
    throw new HttpNotFound(INSUFFICIENT_BALANCE);
  }
  else if (amount < parseInt(withdrawal.dataValues.minval)) {
    throw new HttpNotFound(`${MINIMUM_AMOUNT} ${withdrawal.dataValues.minval}`);
  }
  else if (amount > parseInt(withdrawal.dataValues.maxval)) {
    throw new HttpNotFound(`${MAXIMUM_AMOUNT} ${withdrawal.dataValues.maxval}`);
  }



  if (wallet) {
    wallet.balance = wallet.balance - amount
    await wallet.save({ transaction })
  }

  const withdrawalObject = {
    amount,
    transferId: uuid.v4().split("-")[4],
    transferMode,
    remarks,
    status: PENDING,
    studentUUID,
  };

  if (transferMode.toLowerCase() === "bank") {
    const { bankName, accountHolder, accountNumber, IFSCCode } = input;
    Object.assign(withdrawalObject, {
      bankName,
      accountHolder,
      accountNumber,
      IFSCCode,
    });
  } else {
    const { upiID } = input;
    Object.assign(withdrawalObject, { upiID });
  }

  const wallettranslateObject = {
    walletUUID: wallet.uuid,
    paymentMode: WALLET,
    orderId: uuid.v4().split('-')[4],
    referenceId: withdrawalObject.transferId,
    amount,
    type: OUTBOUND,
    status: PENDING,
    paymentDate: new Date()
  };
  await WithdrawlRequest.create(withdrawalObject, { transaction });
  await WalletTransaction.create(wallettranslateObject, { transaction });

  await transaction.commit();
  return {
    message: SUCCESSFUL,
  };
};
