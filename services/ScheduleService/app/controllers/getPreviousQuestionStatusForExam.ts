
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { ExamParticipationQuestion, ExamQuestion, Question, QuestionOption } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getPreviousQuestionStatusForExam = async (params: IControllerParams<null>) => {

  const questionUUID = params.args.params.questionUUID
  const question = await ExamQuestion.findOne({
    where: {
      questionUUID
    },
    attributes: ['uuid', 'examUUID'],
    include: [{
      model: Question,
      as: 'examQuestions',
      attributes: ['uuid', 'title', 'description', 'subCategoryUUID'],
      include: [
        {
          model: QuestionOption,
          as: 'options',
          attributes: ['text', 'key', 'image']
        }]
    }],
  })


  const givenAnswer = await ExamParticipationQuestion.findOne({
    where: {
      examParticipationUUID: params.args.params.examParticipationUUID,
      questionUUID
    },
    attributes: ['examParticipationUUID', 'questionUUID', 'givenAnswer']
  })
  

  return {
    message: SUCCESSFUL,
    payload: { question, givenAnswer }
  }
}
