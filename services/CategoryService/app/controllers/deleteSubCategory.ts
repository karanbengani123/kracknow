import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { SubCategory } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { IDeleteSubCategory } from '../interfaces/IDeleteSubCategory'

export const deleteSubCategory = async (params: IControllerParams<IDeleteSubCategory>) => {
  const inputs = params.input
  const transaction = params.transaction

  const subcategory = await SubCategory.findByPk(inputs.id)

  if (!subcategory) {
    throw new HttpNotFound('SubCategory' + NOT_FOUND)
  }

  await subcategory.destroy({
    where: {
      uuid: inputs.id
    }
  })

  transaction.commit()

  return {
    message: 'SubCategory deleted successfully'
  }
}
