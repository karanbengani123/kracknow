import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { UserDeviceToken } from '../../../../shared/database/models'
import { FCM } from '../../../../shared/constants/message'
import { IDeleteFCM } from '../interfaces/IDeleteFCM'

export const deleteFCM = async (params: IControllerParams<IDeleteFCM>) => {
  const transaction = params.transaction
  await UserDeviceToken.destroy({
    where: {
      userId: params.user.id,
      type: FCM,
      deviceId: params.input.deviceId,
    },
    transaction,
    force: true,
  })

  await transaction.commit()

  return {
    message: SUCCESSFUL,
  }
}
