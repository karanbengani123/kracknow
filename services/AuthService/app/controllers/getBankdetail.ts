import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { BankAccount, User } from "../../../../shared/database/models";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { ONLY_ADMIN_ALLOWED } from "../../../../shared/constants/message";
import { BANK_ACCOUNT_NOT_FOUND } from "../../../../shared/constants/httpErrorMessages";

export const getBankdetail = async (params: IControllerParams<null>) => {
  let bankid = params.args.params.UUID;
  console.log("============", bankid);
  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }

  // Find the bank account by ID
  // try {
  //   console.log(bankAccount)
  // } catch (error) {
  //   console.log(error);
  // }
  const bankAccount = await BankAccount.findAll();

  if (!bankAccount) {
    throw new HttpNotFound(BANK_ACCOUNT_NOT_FOUND);
  }
  return {
    message: SUCCESSFUL,
    payload: bankAccount,
  };
};
