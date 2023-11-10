import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Keyword } from '../../../../shared/database/models'
import { IUpdateKeyword } from '../interfaces/IUpdateKeyword'
import { NOT_FOUND } from '../../../../shared/constants/httpStatusCodes'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'

export const updateKeyword = async (params: IControllerParams<IUpdateKeyword>) => {
  const inputs = params.input
  const transaction = params.transaction

  const keyword = await Keyword.findByPk(inputs.attribute)
  console.log(keyword, inputs.newAttribute)

  if (!keyword) {
    throw new HttpNotFound('Keyword' + NOT_FOUND)
  }

  await keyword.update({
    attribute: inputs.newAttribute,
    status: inputs.status
  }, { transaction })

  await transaction.commit()

  return {
    message: 'Keyword is updated',
    payload: {}
  }
}
