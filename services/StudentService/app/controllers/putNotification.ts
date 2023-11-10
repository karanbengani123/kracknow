import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { UserMessages } from '../../../../shared/database/models'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'

export const putNotification = async (params: IControllerParams<null>) => {
  const transaction = params.transaction
  const notification = await UserMessages.update(
    { read: true },
    {
      where: {
        uuid: params.args.params.notificationUUID,
      },
      transaction,
    }
  )

  await transaction.commit()

  return {
    message: notification ? SUCCESSFUL : NOT_FOUND,
  }
}
