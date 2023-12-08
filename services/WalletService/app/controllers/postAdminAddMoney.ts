import {
  NOT_FOUND,
  NO_PENDING_PAYOUT_FOUND,
  STUDENT_DETAILS_NOT_FOUND,
} from "../../../../shared/constants/httpErrorMessages";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  ONLY_ADMIN_ALLOWED,
  SUCCESS,
} from "../../../../shared/constants/message";
import {
  User,
  Wallet,
  WalletTransaction,
  student_addmoney_request,
} from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { IAdminAddMoney } from "../interfaces";

export const postAdminAddMoney = async (
  params: IControllerParams<IAdminAddMoney>
) => {

  const { transaction } = params;

  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }
  var existingRequest = await student_addmoney_request.findOne({
    where: {
      uuid: params.args.params.UUID,
    },
  });
  var wallet = await Wallet.findOne({
    where: {
      studentUUID: existingRequest.dataValues.studentUUID,
    },
  });
  var existingRequestFORwithdrawal = await WalletTransaction.findOne({
    where: {
      walletUUID: wallet.dataValues.uuid,
      referenceId: existingRequest.dataValues.referenceId,
    },
  });
  if (!existingRequest) {
    throw new HttpNotFound(STUDENT_DETAILS_NOT_FOUND);
  }

  if (existingRequest.dataValues.status === "SUCCESS") {
    throw new HttpNotFound(NO_PENDING_PAYOUT_FOUND);
  }

  wallet.balance = wallet.dataValues.balance + existingRequest.dataValues.amount;
  existingRequest.approvedby = admin.dataValues.uuid;
  existingRequest.status = SUCCESS;
  existingRequestFORwithdrawal.status = SUCCESS;

  await existingRequest.save({ transaction });
  await wallet.save({ transaction });
  await existingRequestFORwithdrawal.save({ transaction });

  await transaction.commit();

  return {
    message: wallet ? SUCCESSFUL : NOT_FOUND,
  };
};
