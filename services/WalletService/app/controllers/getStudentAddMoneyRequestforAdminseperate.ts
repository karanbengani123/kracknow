import {
  NO_PENDING_WITHDRAWAL_FOUND,

} from "../../../../shared/constants/httpErrorMessages";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  ONLY_ADMIN_ALLOWED,
} from "../../../../shared/constants/message";
import {

  Student,
  User,
  Wallet,
  student_addmoney_request,
} from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import {
  walletAttributes,
  withdrawalRequestStudentIncludeAttributes,
} from "../constant/excludeAttributes";

export const getStudentAddMoneyRequestforAdminseperate = async (
  params: IControllerParams<null>,
) => {
  const transaction = params.transaction;
  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }

  const student = await student_addmoney_request.findOne({
    where: {
      uuid: params.args.params.UUID,
    },
    include: [
      {
        model: Student,
        as: "addmoneyRequests_Student",
        attributes: withdrawalRequestStudentIncludeAttributes,
        include: [
          {
            model: Wallet,
            as: "studentWallet",
            attributes: walletAttributes,
          },
        ],
      },
    ],
  });

  if (!student) {
    throw new HttpNotFound(NO_PENDING_WITHDRAWAL_FOUND);
  }

  student.transactionImage = student.transactionImage;
  console.log(student);

  await transaction.commit();

  return {
    message: SUCCESSFUL,
    payload: student,
  };
};
