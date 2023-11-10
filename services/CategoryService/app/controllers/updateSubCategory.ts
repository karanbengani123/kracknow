import { NOT_FOUND } from '../../../../shared/constants/httpStatusCodes'
import { SubCategory } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IUpdateSubCategory } from '../interfaces/IUpdateSubCategory'

export const updateSubCategory = async (params:IControllerParams<IUpdateSubCategory>) => {
  const inputs = params.input
  const transaction = params.transaction

  const subcategory = await SubCategory.findByPk(inputs.id)

  if (!subcategory) {
    throw new HttpNotFound('SubCategory' + NOT_FOUND)
  }

  await subcategory.update({
    label: inputs.label,
    icon: inputs.icon,
    status: inputs.status,
    categoryUUID: inputs.categoryUUID
  }, { transaction })

  await transaction.commit()

  return {
    message: 'SubCategory updated'
  }
}
