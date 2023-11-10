import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  ONLY_ADMIN_ALLOWED,
  STUDENT_RELOGIN,
} from "../../../../shared/constants/message";
import {
  Student,
  Wallet,
  WalletTransaction,
  WithdrawlRequest,
  student_addmoney_request,
} from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { parseLimitOffsetFromRequest } from "../../../../shared/helpers/parseLimitOffsetFromRequest";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { studentAttributesWithoutFAndSName } from "../constant";
import { walletAllHistoryExcludeAttributes } from "../constant/excludeAttributes";
import { Op } from "sequelize";

export const wallettransactionsforWithdrawal = async (
  params: IControllerParams<null>
) => {
  const queryString = params.args.queryString;

  // const where: any = { deletedAt: null }
  const studentUUID = params.user.id;
  console.log("====================", studentUUID);

  const wallets = await Wallet.findOne({
    where: {
      studentUUID: studentUUID,
    },
  });

  if (!wallets) {
    throw new HttpNotFound(STUDENT_RELOGIN);
  }
  console.log(wallets);
  if (wallets) {
    var Wallettransactionslist = await WalletTransaction.findAndCountAll({
      where: {
        walletUUID: wallets.dataValues.uuid,
      },
      order: [["createdAt", "DESC"]],
      ...parseLimitOffsetFromRequest(queryString as { limit: any; page: any }),
    });
    // console.log(Wallettransactionslist)



    var Wallettransactionslistreq = await WithdrawlRequest.findAndCountAll({
      where: {
        studentUUID: studentUUID,
      },
      order: [["createdAt", "DESC"]],

    });
  }

  return {
    message: SUCCESSFUL,
    payload: {
      Wallettransactionslist,
      Wallettransactionslistreq,
    },
  };
};
