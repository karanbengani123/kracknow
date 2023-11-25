import { DELETED } from "../../../../shared/constants/httpSuccessMessages";
import { BankAccount, User } from "../../../../shared/database/models";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { ONLY_ADMIN_ALLOWED } from "../../../../shared/constants/message";
import { BANK_ACCOUNT_NOT_FOUND } from "../../../../shared/constants/httpErrorMessages";

export const deleteBankAccountAdmin = async (
  params: IControllerParams<null>
) => {
  const transaction = params.transaction;
  const { bankAccountId }: any = params.args.params;
  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }

  const bankAccount = await BankAccount.findByPk(bankAccountId);

  if (!bankAccount) {
    throw new HttpNotFound(BANK_ACCOUNT_NOT_FOUND);
  }

  await bankAccount.destroy({ transaction });

  await transaction.commit();

  return {
    message: DELETED,
  };
};
