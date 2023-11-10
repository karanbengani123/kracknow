import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { SubCategory } from '../../../../shared/database/models'
import { IAddSubCategory } from '../interfaces/IAddSubCategory'

export const addSubCategory = async (params: IControllerParams<IAddSubCategory>) => {
  const inputs = params.input
  const transaction = params.transaction

  const entity:any = {
    label: inputs.label,
    icon: inputs.icon,
    status: inputs.status,
    categoryUUID: inputs.id

  }

  await SubCategory.create(entity, { transaction })

  await transaction.commit()

  return {
    message: 'SubCategory Created successfully'
  }
}
