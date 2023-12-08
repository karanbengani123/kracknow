import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Wallet } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getWalleBalance = async (params: IControllerParams<null>) => {

  // throw new HttpNotFound(ONLY_ADMIN_ALLOWED);


  const wallet = await Wallet.findOne({
    where: {
      studentUUID: params.user.id
    },
    attributes: ['balance']
  })

  // console.log(wallet)

  return {
    message: SUCCESSFUL,
    payload: wallet
  }
}
