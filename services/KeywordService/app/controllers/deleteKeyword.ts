import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Keyword } from '../../../../shared/database/models'
import { IDeleteKeyword } from '../interfaces/IDeleteKeyword'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { NOT_FOUND } from '../../../../shared/constants/httpStatusCodes'
import { DELETED } from '../../../../shared/constants/httpSuccessMessages'

export const deleteKeyword = async (params: IControllerParams<IDeleteKeyword>) => {
  const inputs = params.input
  const transaction = params.transaction

  const keyword = await Keyword.findByPk(inputs.attribute)

  if (!keyword) {
    throw new HttpNotFound('Keyword' + NOT_FOUND)
  }

  await keyword.destroy({
    where: {
      attribute: inputs.attribute
    },
    force: true
  }, { transaction })

  await transaction.commit()

  return {
    message: 'Keyword' + DELETED,
    payload: {}
  }
}
