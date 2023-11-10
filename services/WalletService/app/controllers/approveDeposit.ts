import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { COMPLETED, ONLY_ADMIN_ALLOWED, PENDING } from "../../../../shared/constants/message";
import { User, Wallet } from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";

export const approveDeposit = async (params: IControllerParams<null>) => {
  try {
    const requestId = params.args.params.requestId;
    const admin = await User.findByPk(params.user.id);
    if (!admin) {
      throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
    }
    const walletRequest = await Wallet.findOne({
      where: {  
        uuid: requestId,
        status: PENDING,
      },
    });

    if (!walletRequest) {
      throw new HttpNotFound("Withdrawal request not found or already approved.");
    }

    walletRequest.status = COMPLETED;
    await walletRequest.save();
    return {
        message: SUCCESSFUL,
        withdrawalRequestId: walletRequest.uuid,
      };
  } catch (error) {
    return {
      error: error.message || "An error occurred during approval.",
    };
  }
};
