import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Keyword } from '../../../../shared/database/models'
import { IAddKeyword } from '../interfaces/IAddKeyword'
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest'

export const addKeyword = async (params: IControllerParams<IAddKeyword>) => {
  const inputs = params.input
  const transaction = params.transaction

  const existingKeyword = await Keyword.findByPk(inputs.attribute, {
    transaction
  })

  if (existingKeyword) {
    throw new HttpBadRequest('The keyword already exists')
  }


  await Keyword.create({
    attribute: inputs.attribute,
    status: inputs.status
  }, { transaction })

  await transaction.commit()

  return {
    message: 'Keyword is successfully created',
    payload: {}
  }
}
