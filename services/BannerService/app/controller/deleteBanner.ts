import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { Banner } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IdeleteBanner } from '../interfaces/IdeleteBanner'

export const deleteBanner = async (params: IControllerParams<IdeleteBanner>) => {
  const inputs = params.input
  const transaction = params.transaction

  const banner = await Banner.findByPk(inputs.uuid)

  if (!banner) {
    throw new HttpNotFound(NOT_FOUND)
  }
  await banner.destroy({ transaction })

  await transaction.commit()

  return {
    message: 'Banner deleted successfully'
  }
}
