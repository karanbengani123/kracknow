import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { ExamParticipationQuestion, ExamParticipationQuestionOption } from '../../../../shared/database/models'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'

export const getQuestion = async (params: IControllerParams<{}>) => {
  const question = await ExamParticipationQuestion.findOne({
    where: {
      questionUUID: params.args.params.questionUUID
    },
    attributes: ['title', 'givenAnswer', 'isCorrect'],
    include: [{
      model: ExamParticipationQuestionOption,
      as: 'examParticipation'
    }],
    order: [['examParticipation', 'key', 'ASC']]
  })

  return {
    message: SUCCESSFUL,
    payload: {
      response: question
    }
  }
}
