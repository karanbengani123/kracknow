import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Banner } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'

export const deleteBanner = async (params: IControllerParams<{id:string}>) => {
  const inputs = params.input
  const transaction = params.transaction

  const banner = await Banner.findByPk(inputs.id)

  if (!banner) {
    throw new HttpNotFound(NOT_FOUND)
  }

  await banner.destroy({ transaction })

  await transaction.commit()

  return {
    message: 'Banner deleted successfully'
  }
}
