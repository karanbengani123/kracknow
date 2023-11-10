import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { ExamParticipationQuestion } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const allQuestionReview = async (params: IControllerParams<{}>) => {
  const question = await ExamParticipationQuestion.findAll({
    where: {
      examParticipationUUID: params.args.params.examParticipationUUID
    },
    attributes: ['uuid', 'questionUUID', 'isCorrect'],
    order: [['CreatedAt', 'ASC']]
  })

  return {
    message: SUCCESSFUL,
    payload: {
      response: question
    }
  }
}
