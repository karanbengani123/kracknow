// import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
// import { BankAccount, User } from "../../../../shared/database/models";
// import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
// import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
// import { ONLY_ADMIN_ALLOWED } from "../../../../shared/constants/message";

// export const updateBankAccount = async (params: IControllerParams<null>) => {
//   try {
//     const { upi, qrCodeImage, ifsc, account, bankName }: any =
//       params.input;
//       let bankid = params.args.params.UUID
//     const admin = await User.findByPk(params.user.id);
//     if (!admin) {
//       throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
//     }

//     // Find the bank account by ID
//     const bankAccount = await BankAccount.findByPk(bankid);

//     if (!bankAccount) {
//       throw new HttpNotFound("Bank account not found.");
//     }

//     // Update the bank account information
//     bankAccount.upi = upi;
//     bankAccount.qrCodeImage = qrCodeImage;
//     bankAccount.bankName = bankName;
//     bankAccount.account = account;
//     bankAccount.ifsc = ifsc;
//     // Save the updated bank account
//     console.log(bankAccount)
//     await bankAccount.save();

//     return {
//       message: SUCCESSFUL,
//     };
//   } catch (error) {
//     return {
//       error:
//         error.message || "An error occurred while updating the bank account.",
//     };
//   }
// };

import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { BankAccount } from "../../../../shared/database/models";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";

export const updateBankAccount = async (params: IControllerParams<null>) => {
  try {
    const { upi, qrCodeImage, ifsc, account, bankName }: any =
      params.input;
      let bankid = params.args.params.UUID
    // const admin = await User.findByPk(params.user.id);
    // if (!admin) {
    //   throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
    // }

    // Find the bank account by ID
    const bankAccount = await BankAccount.findByPk(bankid);

    if (!bankAccount) {
      throw new HttpNotFound("Bank account not found.");
    }

    // Update the bank account information
    bankAccount.upi = upi;
    bankAccount.qrCodeImage = qrCodeImage;
    bankAccount.bankName = bankName;
    bankAccount.account = account;
    bankAccount.ifsc = ifsc;
    // Save the updated bank account
    await bankAccount.save();

    return {
      message: SUCCESSFUL,
    };
  } catch (error) {
    return {
      error:
        error.message || "An error occurred while updating the bank account.",
    };
  }
};
