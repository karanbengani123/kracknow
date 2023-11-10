/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Category, SubCategory } from '../../../../shared/database/models'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'

export const getSubCategoryById = async (params: IControllerParams<{id:string}>) => {
  const inputs = params.input

  const subCategory = await Category.findOne({
    attributes: ['label'],
    include: [{
      model: SubCategory,
      where: {
        uuid: inputs.id
      }
    }]
  })

  if (!subCategory) {
    throw new HttpNotFound('SubCategory' + NOT_FOUND)
  }

  return {
    payload: { subCategory }
  }
}
