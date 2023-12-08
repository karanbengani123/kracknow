
import { CREATED, SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Wallet } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const hellohandler = async (params: IControllerParams<null>) => {

  try {
    // const wallet = await Wallet.findOne({ where: { studentUUID: params.user.id },attributes: ['balance'] });
    var wallet = await Wallet.findOne({where: {studentUUID: params.user.id      },attributes: ['balance']})
    console.log("wallet",wallet);
  
    return {
      message: SUCCESSFUL,
      payload:wallet
    }
  } catch (error) {
    return {
      message: CREATED,
      payload: wallet
    }
  }
 
}
