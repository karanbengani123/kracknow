import { BankAccount, User } from "../../../../shared/database/models";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { ONLY_ADMIN_ALLOWED } from "../../../../shared/constants/message";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";

export const addBankAccount = async (params: IControllerParams<null>) => {
  try {
    const { bankName, upi, qrCodeImage, receiverName }: any = params.input;
    const admin = await User.findOne({
      where: {
        uuid: params.user.id,
      },
    });
    if (!admin) {
      throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
    }
    // Create a new bank account record
    // const bankAccount = await BankAccount.create({
    //   bankName,
    //   qrCodeImage,
    //   upi,
    //   receiverName,
    // });
    // console.log('bankAccount',bankAccount);
    await BankAccount.create({
      bankName,
      qrCodeImage,
      upi,
      receiverName,
    });
    return {
      message: SUCCESSFUL,
      // payload: bankAccount,
    };
  } catch (error) {
    return {
      error:
        error.message || "An error occurred while adding the bank account.",
    };
  }
};
