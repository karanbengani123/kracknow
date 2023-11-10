import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SubCategory } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getSubCategoryInCategory = async (params: IControllerParams<{id:string}>) => {
  const inputs = params.input

  const subCategory = await SubCategory.findAll({
    where: {
      categoryUUID: inputs.id
    }
  })

  if (!subCategory) {
    throw new HttpNotFound('SubCategory ' + NOT_FOUND)
  }

  return {
    payload: { subCategory }
  }
}
