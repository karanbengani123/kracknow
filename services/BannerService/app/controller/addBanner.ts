import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Banner } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IAddBanner } from '../interfaces/IAddBanner'

export const addBanner = async (params: IControllerParams<IAddBanner>) => {
  const inputs = params.input
  const transaction = params.transaction
  const bannerEntity = []

  inputs.banner.map((each) => {
    const data = {
      url: each.url,
      tag: each.tag
    }
    bannerEntity.push(data)
    return null
  })

  await Banner.bulkCreate(bannerEntity, { transaction })

  await transaction.commit()

  return {
    message: SUCCESSFUL,
    payload: {}
  }
}
