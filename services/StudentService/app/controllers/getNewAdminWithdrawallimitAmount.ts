import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { User, Withdrawallimit } from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import {
  NEW_WITHDRWAL_LIMIT,
  ONLY_ADMIN_ALLOWED,
} from "../../../../shared/constants/message";

export const getNewAdminWithdrawallimitAmount = async (
  params: IControllerParams<null>
) => {
  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }
  var amount = await Withdrawallimit.findByPk(NEW_WITHDRWAL_LIMIT);

  return {
    message: SUCCESSFUL,
    payload: amount,
  };
};
