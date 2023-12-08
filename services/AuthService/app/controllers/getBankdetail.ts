import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { BankAccount, User } from "../../../../shared/database/models";
// import { BankAccount } from "../../../../shared/database/models";

import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { ONLY_ADMIN_ALLOWED } from "../../../../shared/constants/message";
import { BANK_ACCOUNT_NOT_FOUND } from "../../../../shared/constants/httpErrorMessages";

export const getBankdetail = async (
  params: IControllerParams<any>
) => {
console.log('--------------------=============',params)
  const { transaction } = params;

  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }

  const bankAccount = await BankAccount.findAll();

  if (!bankAccount) {
    throw new HttpNotFound(BANK_ACCOUNT_NOT_FOUND);
  }
  await transaction.commit();

  return {
    message: SUCCESSFUL,
    payload: bankAccount,
  };
};
