import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { KeyValue, User } from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import {
  RUPEE_TO_COIN_KEY,
  ONLY_ADMIN_ALLOWED,
} from "../../../../shared/constants/message";
import { INewConversionRate } from "../interfaces/INewConversionRate";

export const putNewConversionRate = async (
  params: IControllerParams<INewConversionRate>
) => {
  const transaction = params.transaction;
  const coinAmount = params.input.coin;
  const rupeeAmount = params.input.rupee;

  const admin = await User.findByPk(params.user.id);
  if (!admin) {
    throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  }

  const conversionRate = JSON.stringify({ coin: coinAmount, rupee: rupeeAmount });

  const data = await KeyValue.findOne({ where: { key: RUPEE_TO_COIN_KEY }, transaction });

  if (data) {
    await data.update({ stringValue: conversionRate }, { transaction });
  } else {
    await KeyValue.create(
      {
        key: RUPEE_TO_COIN_KEY,
        stringValue: conversionRate,
      },
      { transaction }
    );
  }

  await transaction.commit();

  return {
    message: SUCCESSFUL,
  };
};
