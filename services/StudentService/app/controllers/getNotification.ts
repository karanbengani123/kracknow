import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { UserMessages } from "../../../../shared/database/models";
import { NOT_FOUND } from "../../../../shared/constants/httpErrorMessages";

export const getNotification = async (params: IControllerParams<null>) => {
  const notification = await UserMessages.findAndCountAll({
    where: {
      userId: params.user.id,
    },
    attributes: ["uuid","message", "read", "createdAt"],
    order: [["createdAt", "DESC"]],
  });

  return {
    message: notification ? SUCCESSFUL : NOT_FOUND,
    payload: notification,
  };
};
