import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Category, Question, SubCategory } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IDeleteCategory } from '../interfaces/IDeleteCategory'
import { DELETED } from '../../../../shared/constants/httpSuccessMessages'

export const deleteCategory = async (params: IControllerParams<IDeleteCategory>) => {
  const inputs = params.input

  const category = await Category.findOne({
    where: {
      uuid: inputs.id
    }
  })

  const question = await Question.findAll({
    where: {
      categoryUUID: inputs.id
    }
  })

  if (question.length) {
    throw new HttpNotFound('This Category is being used in the question , Which Cannot be Deleted')
  } else {
    await category.destroy({
      where: {
        uuid: inputs.id
      }
    })
    await SubCategory.destroy({
      where: {
        categoryUUID: inputs.id
      }
    })
  }
  // eslint-disable-next-line no-unreachable
  return {
    message: DELETED
  }
}
