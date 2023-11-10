import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Banner } from '../../../../shared/database/models'
import { IAddBanner } from '../interfaces/IAddBanner'
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest'

export const addBanner = async (params: IControllerParams<IAddBanner>) => {
  const inputs = params.input
  const transaction = params.transaction

  const existingBanner = await Banner.findOne({
    where: {
      tag: inputs.tag
    }
  })

  if (existingBanner) {
    throw new HttpBadRequest('Banner tag already created')
  }

  await Banner.create({
    url: inputs.url,
    tag: inputs.tag
  }, { transaction })

  await transaction.commit()

  return {
    message: 'Banner successfully uploaded',
    payload: {}
  }
}
