/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Question, QuestionOption } from '../../../../shared/database/models'
import { IAddQuestion } from '../interfaces/IAddQuestion'

export const addQuestion = async (params: IControllerParams<IAddQuestion>) => {
  const inputs = params.input
  const transaction = params.transaction

  const question = {
    categoryUUID: inputs.categoryUUID,
    subCategoryUUID: inputs.subCategoryUUID,
    status: inputs.status,
    title: inputs.title,
    description: inputs.description,
    options: inputs.QuestionOption.map(item => ({
      key: item.key,
      image: item.image,
      text: item.text,
      isCorrect: item.isCorrect
    }))
  }

  await Question.create(question, {
    include: [{ model: QuestionOption, as: 'options' }],
    transaction
  })

  await transaction.commit()

  return {
    message: 'Question created succesfully',
    payload: {}
  }
}
