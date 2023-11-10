/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { QuestionOption, Question } from '../../../../shared/database/models'
import { IDeleteQuestion } from '../interfaces/IDeleteQuestion'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'

export const deleteQuestion = async (params: IControllerParams<IDeleteQuestion>) => {
  const inputs = params.input
  const transaction = params.transaction

  const question = await Question.findByPk(inputs.id)

  if (!question) {
    throw new HttpNotFound('Question ' + NOT_FOUND)
  }

  await question.destroy({ transaction })

  await QuestionOption.destroy({
    where: {
      questionUUID: inputs.id
    }
  })

  await transaction.commit()

  return {
    message: 'Question deleted successfully'
  }
}
