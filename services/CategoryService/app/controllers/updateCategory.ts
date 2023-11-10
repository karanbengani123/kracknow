import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Category } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IUpdateCategory } from '../interfaces/IUpdateCategory'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'

export const updateCategory = async (params: IControllerParams<IUpdateCategory>) => {
  const inputs = params.input
  const transaction = params.transaction

  const category: any = await Category.findByPk(inputs.id)

  if (!category) {
    throw new HttpNotFound('Category' + NOT_FOUND)
  }

  await category.update({
    icon: inputs.icon,
    label: inputs.label,
    status: inputs.status
  }, { transaction })

  await transaction.commit()

  return {
    message: 'Category is updated'

  }
}
