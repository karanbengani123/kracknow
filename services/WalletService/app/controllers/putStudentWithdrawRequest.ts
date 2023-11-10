import {
  NOT_FOUND,
  NO_PENDING_WITHDRAWAL_FOUND,
} from "../../../../shared/constants/httpErrorMessages";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  ONLY_ADMIN_ALLOWED,
  PENDING,
} from "../../../../shared/constants/message";
import {
  City,
  Student,
  User,
  Wallet,
  WithdrawlRequest,
} from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";

export const putStudentWithdrawRequest = async (
  params: IControllerParams<null>
) => {
  const transaction = params.transaction;
  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }
  const withdrawalRequest = await WithdrawlRequest.findOne({
    where: {
      uuid: params.args.params.UUID,
      status: PENDING,
    },
    include: [
      {
        model: Student,
        attributes: ["email", "firstName", "lastName", "mobileNumber"],
        include: [
          {
            model: City,
            attributes: ["city"],
          },
          {
            model: Wallet,
            as: "wallet",
          },
        ],
      },
    ],
  });
  if (!withdrawalRequest) {
    throw new HttpNotFound(NO_PENDING_WITHDRAWAL_FOUND);
  }

  let result: any = {};

  const updatedData:any = params.input;
  if (updatedData) {
    if (updatedData.amount) {
      withdrawalRequest.amount = updatedData.amount;
    }
    if (updatedData.transferMode) {
      withdrawalRequest.transferMode = updatedData.transferMode;
    }
    if (updatedData.remarks) {
      withdrawalRequest.remarks = updatedData.remarks;
    }

    await withdrawalRequest.save({ transaction });
  }

  await transaction.commit();

  return {
    message: withdrawalRequest ? SUCCESSFUL : NOT_FOUND,
    payload: result,
  };
};
