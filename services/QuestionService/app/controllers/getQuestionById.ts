import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Category, Question, QuestionOption, SubCategory } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'

export const getQuestionById = async (params: IControllerParams<{ id: string }>) => {
  const inputs = params.input

  const question = await Question.findOne({
    where: { uuid: inputs.id },
    include: [{
      model: Category,
      as: 'questionCategory',
      attributes: ['uuid', 'label']
    }, {
      model: SubCategory,
      as: 'questionSubCategory',
      attributes: ['uuid', 'label']
    },
    {
      model: QuestionOption,
      as: 'options'
    }],
    order: [['options', 'key', 'ASC']]
  })

  if (!question) {
    throw new HttpNotFound('Question ' + NOT_FOUND)
  }

  return {
    payload: { question }
  }
}
