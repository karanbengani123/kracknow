import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { User, Withdrawallimit } from "../../../../shared/database/models";
// import { User } from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import {
  NEW_WITHDRWAL_LIMIT,
  ONLY_ADMIN_ALLOWED,
} from "../../../../shared/constants/message";
import { INewWithdrawallimitAmount } from "../interfaces/INewWithdrawallimitAmount";

export const putNewAdminWithdrawallimitAmount = async (
  params: IControllerParams<INewWithdrawallimitAmount>
) => {
  const transaction = params.transaction;
  const minamount = params.input.minamount;
  const maxamount = params.input.maxamount;
  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }

  const data = await Withdrawallimit.findByPk(NEW_WITHDRWAL_LIMIT);
  if (data) {
    data.update({ minval: minamount, maxval: maxamount });
  } else {
    await Withdrawallimit.create(
      {
        key: NEW_WITHDRWAL_LIMIT,
        minval: minamount,
        maxval: maxamount,
      },
      { transaction }
    );
  }

  await transaction.commit();

  return {
    message: SUCCESSFUL,
  };
};
