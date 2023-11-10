import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { BankNameList } from "../../../../shared/database/models";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";

export const bankNameList = async (_params: IControllerParams<null>) => {
  const bankNameList = await BankNameList.findAll({
    attributes: ["bankName"],
  });
  return {
    message: SUCCESSFUL,
    payload: bankNameList,
  };
};
