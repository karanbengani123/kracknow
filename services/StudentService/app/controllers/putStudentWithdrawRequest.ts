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

  

  await transaction.commit();

  return {
    message: withdrawalRequests && WalletTransactions ? SUCCESSFUL : NOT_FOUND,
    payload: withdrawalRequests,
  };
};
