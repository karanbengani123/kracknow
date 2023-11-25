import {
  NOT_FOUND,
  NO_PENDING_WITHDRAWAL_FOUND,
} from "../../../../shared/constants/httpErrorMessages";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  ONLY_ADMIN_ALLOWED,
  PENDING,
  SUCCESS,
} from "../../../../shared/constants/message";
import {
  User,
  WalletTransaction,
  WithdrawlRequest,
} from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";

export const putStudentWithdrawRequest = async (
  params: IControllerParams<{ statusMsg: any }>
) => {
  let { input } = params;
  let { statusMsg } = input;
console.log(statusMsg)
  const transaction = params.transaction;
  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }
  const withdrawalRequests = await WithdrawlRequest.findOne({
    where: {
      uuid: params.args.params.UUID,
      status: PENDING,
    },
  });


  if (withdrawalRequests === null) {
    throw new HttpNotFound(NO_PENDING_WITHDRAWAL_FOUND);
  }
  const WalletTransactions = await WalletTransaction.findOne({
    where: {
      referenceId: withdrawalRequests.dataValues.transferId,
    },
  });
  try{
    if (statusMsg !== "") {
      WalletTransactions.statusMsg = statusMsg;
      withdrawalRequests.statusMsg = statusMsg;
    }else {
      withdrawalRequests.status = SUCCESS;
      WalletTransactions.status = SUCCESS;
    }
  }catch(error) {
    console.log(error)
  }

  await withdrawalRequests.save({ transaction });

  console.log(WalletTransactions)
  await WalletTransactions.save({ transaction });

  // console.log(transaction)

  // const headers = {
  //   "X-Client-Id": process.env.CASHFREE_CLIENT_ID,
  //   "X-Client-Secret": process.env.CASHFREE_CLIENT_SECRET,
  // };

  // const data = await KeyValue.findByPk(PUBLIC_KEY);
  // if (!data) {
  //   throw new HttpNotFound(PUBLIC_KEY_NOT_FOUND);
  // }

  // API CALLING BELOW
  // const tokenResponse = await fetch(process.env.CASHFREE_AUTHORIZE_TOKEN_URL, {
  //   method: "POST",
  //   headers: {
  //     "X-Cf-Signature": createCashfreeSignature(
  //       data.stringValue,
  //       `${process.env.CASHFREE_CLIENT_ID}.${Math.floor(Date.now() / 1000)}`
  //     ),
  //     ...headers,
  //   },
  // });
  // const tokenData = await tokenResponse.json();
  // // eslint-disable-next-line no-prototype-builtins
  // if (tokenResponse.status === 200 && tokenData.hasOwnProperty("data")) {
  //   let transferMode = withdrawalRequest.transferMode;
  //   let phone = withdrawalRequest.Student_Student.mobileNumber;

  //   if (transferMode === "bank") {
  //     transferMode = "banktransfer";
  //   } else if (transferMode === "upi") {
  //     phone = { phone, vpa: withdrawalRequest.upiID };
  //   } else if (transferMode === "paytm") {
  //     phone = { phone };
  //   }
  //   // dynamically adding object depend on transferMode
  //   const beneDetails = {
  //     email: withdrawalRequest.Student_Student.email,
  //     address1: withdrawalRequest.Student_Student.City_City.city,
  //   };
  //   if (transferMode === "banktransfer") {
  //     Object.assign(beneDetails, {
  //       bankAccount: withdrawalRequest.accountNumber,
  //       ifsc: withdrawalRequest.IFSCCode,
  //       name: withdrawalRequest.accountHolder,
  //       phone,
  //     });
  //   } else {
  //     Object.assign(beneDetails, {
  //       name: `${withdrawalRequest.Student_Student.firstName} ${withdrawalRequest.Student_Student.lastName}`,
  //       email: withdrawalRequest.Student_Student.email,
  //       ...phone,
  //     });
  //   }
  //   const directTransferResponse = await fetch(
  //     process.env.CASHFREE_DIRECT_TRANSFER_URL,
  //     {
  //       method: "POST",
  //       headers: {
  //         ...headers,
  //         Authorization: "Bearer " + tokenData.data.token,
  //       },
  //       body: JSON.stringify({
  //         amount: withdrawalRequest.amount,
  //         transferId: withdrawalRequest.transferId,
  //         transferMode,
  //         remarks: withdrawalRequest.remarks,
  //         beneDetails,
  //       }),
  //     }
  //   );
  //   if (directTransferResponse.status === 200) {
  //     result = await directTransferResponse.json();
  //     if (result.status === ERROR) {
  //       throw new HttpNotFound(result.message);
  //     }
  //     if (result.status === SUCCESS) {
  //       withdrawalRequest.Student_Student.wallet.balance =
  //         withdrawalRequest.Student_Student.wallet.balance -
  //         withdrawalRequest.amount;
  //       await withdrawalRequest.Student_Student.wallet.save({ transaction });
  //     }
  //     withdrawalRequest.status = result.status;
  //     withdrawalRequest.statusMsg = result.message;
  //     await withdrawalRequest.save({ transaction });

  //     await WalletTransaction.create(
  //       {
  //         walletUUID: withdrawalRequest.Student_Student.wallet.uuid,
  //         paymentMode: withdrawalRequest.transferMode,
  //         orderId: withdrawalRequest.transferId,
  //         referenceId: withdrawalRequest.transferId,
  //         amount: withdrawalRequest.amount,
  //         type: OUTBOUND,
  //         status: result.status,
  //         statusMsg: result.message,
  //         paymentDate: new Date(),
  //       },
  //       { transaction }
  //     );
  //   }
  // } else {
  //   throw new HttpNotFound(TOKEN_AUTH_ERROR);
  // }

  await transaction.commit();

  return {
    message: withdrawalRequests && WalletTransactions ? SUCCESSFUL : NOT_FOUND,
    payload: withdrawalRequests,
  };
};
