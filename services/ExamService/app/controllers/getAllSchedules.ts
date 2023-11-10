import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { ExamSchedule, ScheduleExamParticipation } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const allSchedules = async (params: IControllerParams<{}>) => {
  const schedules = await ExamSchedule.findAll({
    where: {
      examUUID: params.args.params.examUUID
    },
    order: [['createdAt', 'DESC']]
  })
  const response = []

  for (const obj of schedules) {
    const count = await ScheduleExamParticipation.count({
      where: {
        examScheduleUUID: obj.uuid
      }
    })

    const data = {
      uuid: obj.uuid,
      examUUID: obj.examUUID,
      startTime: obj.startTime,
      endTime: obj.endTime,
      examTime: obj.examTime,
      joined: count
    }
    response.push(data)
  }

  return {
    message: SUCCESSFUL,
    payload: response
  }
}
