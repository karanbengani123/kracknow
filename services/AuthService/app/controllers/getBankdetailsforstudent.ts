import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { BankAccount } from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { BANK_ACCOUNT_NOT_FOUND } from "../../../../shared/constants/httpErrorMessages";

export const getBankdetailsforstudent = async () => {
  const bankAccount = await BankAccount.findAll();

  if (!bankAccount) {
    throw new HttpNotFound(BANK_ACCOUNT_NOT_FOUND);
  }
  return {
    message: SUCCESSFUL,
    payload: bankAccount,
  };
};
