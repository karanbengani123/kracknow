import { User, WithdrawlRequest } from "../../../../shared/database/models";
import {  COMPLETED, ONLY_ADMIN_ALLOWED } from "../../../../shared/constants/message";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";

export const approveWithdrawal = async (params: IControllerParams<null>) => {
  try {
    const admin = await User.findByPk(params.user.id);
    if (!admin) {
      throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
    }
    const withdrawalRequest = await WithdrawlRequest.findOne({
      where: {
        uuid: params.args.params.uuid,
      },
    });
    
    if (!withdrawalRequest) {
      throw new HttpNotFound("Withdrawal request not found or already approved.");
    }

    withdrawalRequest.status = COMPLETED;
    await withdrawalRequest.save();

    return {
        message: 'Withdrawal Approved',
      };
  } catch (error) {
    return {
      error: error.message || "An error occurred during approval.",
    };
  }
};
