/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Question, QuestionOption } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IUpdateQuestion } from '../interfaces/IUpdateQuestion'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'

export const updateQuestion = async (params: IControllerParams<IUpdateQuestion>) => {
  const inputs = params.input
  const transaction = params.transaction

  const question = await Question.findByPk(inputs.id)

  if (!question) {
    throw new HttpNotFound('Question ' + NOT_FOUND)
  }

  const questionEntity = {
    categoryUUID: inputs.categoryUUID,
    subCategoryUUID: inputs.subCategoryUUID,
    status: inputs.status,
    title: inputs.title,
    description: inputs.description
  }

  for (const obj of inputs.QuestionOption) {
    const options = await QuestionOption.findOne({
      where: {
        questionUUID: inputs.id,
        key: obj.key
      }
    })

    if (!options) {
      throw new HttpNotFound('QuestionOptions ' + NOT_FOUND)
    }

    const questionOption = {
      key: obj.key,
      image: obj.image,
      text: obj.text,
      isCorrect: obj.isCorrect
    }

    await options.update(questionOption, { transaction })
  }

  await question.update(questionEntity, { transaction })
  await transaction.commit()

  return {
    message: 'Question updated successfully',
    payload: {}
  }
}
