import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { ExamParticipationQuestion, Question, QuestionOption, ScheduleExamParticipation } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const studentAnswerPreview = async (params: IControllerParams<{}>) => {
  const schedule = await ScheduleExamParticipation.findOne({
    where: {
      examScheduleUUID: params.args.params.examScheduleUUID,
      studentUUID: params.user.id
    }
  })

  const question = await ExamParticipationQuestion.findAll({
    where: {
      examParticipationUUID: schedule.uuid
    },
    include: [{
      model: Question,
      as: 'questionsDetails',
      include: [{
        model: QuestionOption,
        as: 'options',
        where: {
          iscorrect: true
        }
      }]
    }],
    order: [['createdAt', 'ASC']]
  })

  const response = []
  for (const obj of question) {
    const data = {
      givenAnswer: obj.givenAnswer,
      isCorrect: obj.isCorrect,
      title: obj.questionsDetails.title,
      correctAnswer: obj.questionsDetails.options[0].text,
      mark: obj.mark
    }
    response.push(data)
  }
  return {
    message: SUCCESSFUL,
    payload: {
      respose: response
    }
  }
}
