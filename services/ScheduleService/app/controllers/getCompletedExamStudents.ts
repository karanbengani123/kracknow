import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Exam, ExamBanner, ExamSchedule, ScheduleExamParticipation } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { markSchedulesAsCompleted } from '../../../../shared/lib/system/markSchedulesAsCompleted'

export const getCompletedExam = async (params: IControllerParams<{}>) => {
  await markSchedulesAsCompleted(params.transaction)
  const exam = await Exam.findAll({
    where: {
      type: params.args.queryString.type
    },
    include: [{
      model: ExamSchedule,
      as: 'schedule',
      separate: false,
      attributes: ['uuid', 'startTime', 'status'],
      include: [{
        model: ScheduleExamParticipation,
        as: 'studentExam',
        where: {
          studentUUID: params.user.id,
          status: 'COMPLETED'
        },
        order: [['updatedAt', 'DESC']]
      }]
    }, {
      model: ExamBanner,
      as: 'examBanner',
      attributes: ['uuid', 'url', 'phoneBanner']
    }],
    order: [[{
      model: ExamSchedule,
      as: 'schedule'
    }, 'startTime', 'DESC']]
  })
  const response = []
  for (const obj of exam) {
    if (obj.schedule.length) {
      response.push(obj)
    }
  }

  return {
    message: SUCCESSFUL,
    payload: {
      response: response
    }
  }
}
