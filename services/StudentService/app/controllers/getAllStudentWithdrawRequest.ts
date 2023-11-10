import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import {
  Student,
  User,
  WithdrawlRequest,
} from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { ONLY_ADMIN_ALLOWED } from "../../../../shared/constants/message";
import {
  studentWithdrawalRequestForAdminKeywordExclude,
  withdrawalRequestStudentIncludeAttributes,
} from "../../../WalletService/app/constant/excludeAttributes";
import { parseLimitOffsetFromRequest } from "../../../../shared/helpers/parseLimitOffsetFromRequest";
import { Op } from "sequelize";

export const getAllStudentWithdrawRequest = async (
  params: IControllerParams<null>
) => {
  const queryString = params.args.queryString;
  const where: any = {};
  const search = queryString.q;

  if (search) {
    where[Op.or] = [
      { '$withdrawlRequests_Student.firstName$': { [Op.like]: `%${search}%` } },
      { '$withdrawlRequests_Student.lastName$': { [Op.like]: `%${search}%` } },
    ];
  }
  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }

  const student = await WithdrawlRequest.findAndCountAll({
    where,
    attributes: {
      exclude: studentWithdrawalRequestForAdminKeywordExclude,
    },
    include: [
      {
        model: Student,
        as: "withdrawlRequests_Student",
        attributes: withdrawalRequestStudentIncludeAttributes,
      },
    ],
    order: [["createdAt", "DESC"]],
    ...parseLimitOffsetFromRequest(
      params.args.queryString as { limit: any; page: any }
    ),
  });

  return {
    message: SUCCESSFUL,
    payload: student,
  };
};
