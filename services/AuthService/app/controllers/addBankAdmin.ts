import { BankAccount } from "../../../../shared/database/models";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
// import { ONLY_ADMIN_ALLOWED } from "../../../../shared/constants/message";
// import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";

export const addBankAccount = async (params: IControllerParams<null>) => {
  try {
    const transaction = params.transaction;
    const { bankName, upi, qrCodeImage, account, ifsc }: any = params.input;

    // const admin = await User.findOne({
    //   where: {
    //     uuid: params.user.id,
    //   },
    // });
    // if (!admin) {
    //   throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
    // }
    // console.log(admin);
    try {
      let data = await BankAccount.create({
        bankName: bankName,
        qrCodeImage: qrCodeImage,
        upi: upi,
        account: account,
        ifsc: ifsc,
      });
      console.log("---------", data);
    } catch (error) {
      console.log("================", error);
    }
    await transaction.commit();

    return {
      message: SUCCESSFUL,
    };
  } catch (error) {
    return {
      error: "An error occurred while adding the bank account.",
    };
  }
};
