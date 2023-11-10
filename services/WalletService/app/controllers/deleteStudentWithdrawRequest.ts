import {
  NO_PENDING_WITHDRAWAL_FOUND,
  ONLY_ADMIN_ALLOWED,
  OUTBOUND,
  SUCCESS,
} from "../../../../shared/constants/message";
import {
  User,
  WithdrawlRequest,
  WalletTransaction,
} from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";

export const deleteStudentWithdrawRequest = async (
  params: IControllerParams<null>
) => {
  const transaction = params.transaction;
  const studentUUID = params.user.id;

  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }

  // Find the existing request by UUID
  const withdrawalRequest = await WithdrawlRequest.findOne({
    where: {
      studentUUID,
    },
  });

  if (!withdrawalRequest) {
    throw new HttpNotFound(NO_PENDING_WITHDRAWAL_FOUND);
  }

  let result: any = {};

  // Delete the withdrawal request
  await withdrawalRequest.destroy({ transaction });

  // Create a wallet transaction entry for the cancellation if needed
  if (withdrawalRequest.status === OUTBOUND) {
    await WalletTransaction.create(
      {
        walletUUID: withdrawalRequest.Student_Student.wallet.uuid,
        paymentMode: withdrawalRequest.transferMode,
        orderId: withdrawalRequest.transferId,
        referenceId: withdrawalRequest.transferId,
        amount: withdrawalRequest.amount,
        type: OUTBOUND,
        status: SUCCESS, // Indicate that it was successful (cancelation)
        statusMsg: "Withdrawal request canceled",
        paymentDate: new Date(),
      },
      { transaction }
    );

    // Refund the amount to the student's wallet balance
    withdrawalRequest.Student_Student.wallet.balance +=
      withdrawalRequest.amount;
    await withdrawalRequest.Student_Student.wallet.save({ transaction });
  }

  // Commit the transaction
  await transaction.commit();

  return {
    message: withdrawalRequest ? SUCCESS : NO_PENDING_WITHDRAWAL_FOUND,
    payload: result,
  };
};
