import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { ONLY_ADMIN_ALLOWED } from '../../../../shared/constants/message';
import { Wallet } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound';
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getWalleBalance = async (params: IControllerParams<null>) => {

  // throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
  const wallet = await Wallet.findOne({
    where: {
      studentUUID: params.user.id
    },
    attributes: ['balance']
  })
  return {
    message: SUCCESSFUL,
    payload: wallet
  }
}
