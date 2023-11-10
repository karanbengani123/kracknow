import * as moment from 'moment'
import { FindOptions } from 'sequelize/types'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Exam, ExamQuestion, ExamSchedule, Question, QuestionOption, ScheduleExamParticipation } from '../../../../shared/database/models'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getAllQuestionForExam = async (params: IControllerParams<{}>) => {
  const filterParams = params.args.queryString
  const queryParams: FindOptions = {
    where: {
      examUUID: params.args.params.examUUID
    },
    attributes: ['uuid', 'examUUID'],
    include: [{
      model: Question,
      as: 'examQuestions',
      attributes: ['uuid', 'title', 'description', 'subCategoryUUID'],
      include: [{
        model: QuestionOption,
        as: 'options',
        attributes: ['text', 'key', 'image']
      }]
    }],
  }

  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
    queryParams.limit = limit
    queryParams.offset = offset
  }

  const categoryType = await ScheduleExamParticipation.findOne({
    where: {
      uuid: params.args.params.examParticipationUUID
    },
    attributes: ['primarySubcategory', 'secondarySubcategory', 'examScheduleUUID']
  })
  const examSchedule = await ExamSchedule.findByPk(categoryType.examScheduleUUID)
  const questionTime = await Exam.findOne({
    where: {
      uuid: params.args.params.examUUID
    },
    attributes: ['timePerQuestion']
  })
  const question = await ExamQuestion.findAll(queryParams)
  const count = await ExamQuestion.count({
    where: {
      examUUID: params.args.params.examUUID
    }
  })
  const date = moment().utcOffset('+05:30').format('LTS')

  return {
    message: SUCCESSFUL,
    payload: {
      response: question,
      timePerQuestion: questionTime,
      isLastRecord: count === (parseInt(filterParams.page, 10)),
      time: date, 
      examSchedule,
      categoryType: categoryType.primarySubcategory === question[0].examQuestions.subCategoryUUID ? 'PRIMARY' : categoryType.secondarySubcategory === question[0].examQuestions.subCategoryUUID ? 'SECONDARY' : null
    }
  }
}
