/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Category } from '../../../../shared/database/models'
import { IAddCategory } from '../interfaces/IAddCategory'
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest'

export const addCategory = async (params:IControllerParams<IAddCategory>) => {
  const inputs = params.input
  const transaction = params.transaction

  const existingCategory = await Category.findOne({
    where: {
      label: inputs.label
    }
  })

  if (existingCategory) {
    throw new HttpBadRequest('Category already exists')
  }

  const entity:any = {
    label: inputs.label,
    icon: inputs.icon,
    status: inputs.status
  }

  await Category.create(entity, { transaction })

  await transaction.commit()

  return {
    message: 'Category created sucessfully'
  }
}
