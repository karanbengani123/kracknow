import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { ExamQuestion, Question, SubCategory } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getSubcategoryStudent = async (params: IControllerParams<{}>) => {
  const question = await ExamQuestion.findAll({
    where: {
      examUUID: params.args.params.examUUID
    },
    attributes: ['uuid'],
    include: [{
      model: Question,
      as: 'examQuestions',
      attributes: ['uuid'],
      include: [{
        model: SubCategory,
        as: 'questionSubCategory',
        attributes: ['uuid', 'label']
      }]
    }]
  })
  const response = []
  for (const obj of question) {
    if (!response.find((each) => each.uuid === obj.examQuestions.questionSubCategory.uuid)) {
      const data = {
        uuid: obj.examQuestions.questionSubCategory.uuid,
        label: obj.examQuestions.questionSubCategory.label
      }
      response.push(data)
    }
  }
  return {
    message: SUCCESSFUL,
    payload: {
      response: response
    }
  }
}
