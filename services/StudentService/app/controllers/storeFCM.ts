import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { UserDeviceToken } from '../../../../shared/database/models'
import { FCM } from '../../../../shared/constants/message'
import { IStoreFCM } from '../interfaces/IStoreFCM'

export const storeFCM = async (params: IControllerParams<IStoreFCM>) => {
  const transaction = params.transaction
  const { token, deviceId } = params.input;
  const userId = params.user.id;
  const userToken = await UserDeviceToken.findOne({
    where: {
      deviceId,
      userId,
      type: FCM,
    }
  })
  if (userToken)
    await userToken.update({
      token
    })
  else
    await UserDeviceToken.create(
      {
        userId,
        deviceId,
        token,
        type: FCM,
      },
      { transaction }
    )

  await transaction.commit()

  return {
    message: SUCCESSFUL,
  }
}
