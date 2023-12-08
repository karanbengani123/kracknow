import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { KeyValue, User } from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import {
  NEW_STUDENT_INITIAL_AMOUNT,
  ONLY_ADMIN_ALLOWED,
} from "../../../../shared/constants/message";
import { INewStudentInitialAmount } from "../interfaces/INewStudentInitialAmount";

export const putNewStudentInitialAmount = async (
  params: IControllerParams<INewStudentInitialAmount>
) => {
  const transaction = params.transaction;
  const amount = params.input.amount;

  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }

  const data = await KeyValue.findByPk(NEW_STUDENT_INITIAL_AMOUNT);
  if (data) {
    data.update({ intValue: amount });
  } else {
    await KeyValue.create(
      {
        key: NEW_STUDENT_INITIAL_AMOUNT,
        intValue: amount,
      },
      { transaction }
    );
  }

  await transaction.commit();

  return {
    message: SUCCESSFUL,
  };
};
