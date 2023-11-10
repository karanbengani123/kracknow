import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import {
  Student,
  Wallet,
  WithdrawlRequest,
} from "../../../../shared/database/models";
import { withdrawalRequestExcludeAttributes } from "../constant/excludeAttributes";
import { FindOptions } from "sequelize";

import { parseLimitOffsetFromRequest } from "../../../../shared/helpers/parseLimitOffsetFromRequest";

export const getStudentWithdrawRequest = async (
  params: IControllerParams<{}>
) => {
  const studentUUID: string = params.user.id;
  const perPage = params.args.queryString.perPage;
  const pageNo = params.args.queryString.pageNo;

  const withdrawalRequest = await WithdrawlRequest.findAndCountAll({
    where: {
      studentUUID: studentUUID,
    },
    attributes: {
      exclude: withdrawalRequestExcludeAttributes,
    },
    include: [
      {
        model: Student,
        as: "withdrawlRequests_Student",
        attributes: ["email", "firstName", "lastName", "mobileNumber"],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: parseInt(perPage),
    offset: parseInt(pageNo),
  });

  return {
    message: SUCCESSFUL,
    payload: withdrawalRequest,
  };
};

export const getWithdrawRequestList = async (params: IControllerParams<{}>) => {
  const queryParams: FindOptions = {
    include: [
      {
        model: Student,
        as: "withdrawlRequests_Student",
        attributes: ["email", "firstName", "lastName", "mobileNumber"],
      },
    ],
    order: [["createdAt", "DESC"]],
    attributes: {
      exclude: withdrawalRequestExcludeAttributes,
    },
  };
  const status = params.args.queryString.status;

  const filterParams = params.args.queryString;

  let where: any = {};
  if (status === "PENDING" || status === "COMPLETED") where.status = status;

  queryParams.where = where;

  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(
      filterParams as { limit: any; page: any }
    );
    queryParams.limit = limit;
    queryParams.offset = offset;
  }

  const withdrawRequestList = await WithdrawlRequest.findAndCountAll(
    queryParams
  );

  return {
    message: SUCCESSFUL,
    payload: withdrawRequestList,
  };
};

export const getWithdrawRequest = async (params: IControllerParams<null>) => {
  const withdrawRequest = await WithdrawlRequest.findOne({
    where: {
      uuid: params.args.params.uuid,
    },
    attributes: {
      exclude: withdrawalRequestExcludeAttributes,
    },
    include: [{ model: Student, as: "withdrawlRequests_Student" }],
  });

  const walletBalance = await Wallet.findOne({
    where: {
      studentUUID: withdrawRequest.studentUUID,
    },
    attributes: {
      exclude: withdrawalRequestExcludeAttributes,
    },
  });

  console.log(walletBalance, "response");

  return {
    message: SUCCESSFUL,
    payload: withdrawRequest,
  };
};
