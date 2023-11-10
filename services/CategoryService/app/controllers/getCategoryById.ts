/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Category } from '../../../../shared/database/models'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'

export const getCategoryById = async (params: IControllerParams<{id:string}>) => {
  const inputs = params.input

  const category = await Category.findByPk(inputs.id)

  if (!category) {
    throw new HttpNotFound('category' + NOT_FOUND)
  }

  return {
    payload: { category }
  }
}
