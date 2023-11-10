import { FindOptions } from 'sequelize'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Category, Exam, ExamParticipationQuestion, ScheduleExamParticipation } from '../../../../shared/database/models'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getStudentExam = async (params: IControllerParams<null>) => {
  const filterParams = params.args.queryString
  const queryParams: FindOptions = {
    where: {
      studentUUID: params.args.params.uuid
    },
    include: [{
      model: Exam,
      as: 'scheduleExam',
      include: [{
        model: Category,
        as: 'examCategory'
      }]
    }]
  }  
  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
    queryParams.limit = limit
    queryParams.offset = offset
  }
  const response = []
  const schedule = await ScheduleExamParticipation.findAll(queryParams)
  for (const obj of schedule) {
    const question = await ExamParticipationQuestion.count({
      where: {
        examParticipationUUID: obj.uuid
      }
    })

    const data = {
      title: obj.scheduleExam?.title,
      category: obj.scheduleExam?.examCategory?.label,
      startTime: obj.startedTime,
      endTime: obj.completedTime,
      status: obj.status,
      joiningfee: obj.scheduleExam?.joinFee,
      marksperquestion: obj.scheduleExam?.marksPerQuestion,
      totalquestion: question,
      examResults: obj.marks ? obj.marks : 0
    }
    response.push(data)
  }
  return {
    message: SUCCESSFUL,
    payload: response
  }
}
