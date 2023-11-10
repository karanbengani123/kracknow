import { BankAccount } from "../../../../shared/database/models";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";

export const getActiveBankInfo = async (params: IControllerParams<null>) => {
  try {
    console.log(params);
    const activeBankInfo = await BankAccount.findOne({
      where: {
        isActive: true,
      },
    });

    if (!activeBankInfo) {
      return {
        message: "No active bank account found for the current admin",
      };
    }

    return {
      activeBankInfo,
    };
  } catch (error) {
    return {
      error:
        error.message ||
        "An error occurred while fetching active bank account info.",
    };
  }
};
