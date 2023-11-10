import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import {
  Category,
  ExamParticipationQuestion,
  Question,
  ScheduleExamParticipation,
  SubCategory,
} from '../../../../shared/database/models'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'

export const getPiechartData = async (params: IControllerParams<null>) => {
  const studentParticipation = await ScheduleExamParticipation.findOne({
    where: {
      studentUUID: params.user.id,
      examScheduleUUID: params.args.params.examScheduleUUID,
    },
  })

  const questions = await ExamParticipationQuestion.findAll({
    where: {
      examParticipationUUID: studentParticipation.uuid,
    },
    include: [
      {
        model: Question,
        as: 'questionsDetails',
        attributes: ['title'],
        include: [
          {
            model: SubCategory,
            as: 'questionSubCategory',
            attributes: ['label'],
            include: [
              {
                model: Category,
                attributes: ['label'],
              },
            ],
          },
        ],
      },
    ],
  })

  const response = []

  for (const obj of questions) {
    const data = {
      subCategoryName: obj.questionsDetails.questionSubCategory.label,
      correctAnswer: obj.isCorrect === true ? 1 : 0,
      incorrectAnswer: obj.isCorrect === false ? 1 : 0,
    }

    const temp = response.find(
      (each) =>
        each.subCategoryName === obj.questionsDetails.questionSubCategory.label
    )

    if (temp) {
      response.map((item) => {
        if (
          item.subCategoryName ===
          obj.questionsDetails.questionSubCategory.label
        ) {
          // eslint-disable-next-line no-unused-expressions
          item.correctAnswer = item.correctAnswer + data.correctAnswer
          item.incorrectAnswer = item.incorrectAnswer + data.incorrectAnswer
        }
        return null
      })
    } else {
      response.push(data)
    }
  }

  return {
    message: SUCCESSFUL,
    payload: {
      response,
    },
  }
}
