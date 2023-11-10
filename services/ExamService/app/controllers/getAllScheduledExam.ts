import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Exam, ExamSchedule } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getAllScheduledExam = async (params: IControllerParams<null>) => {
  const schedules = await Exam.findAll({
    where: {
      uuid: params.args.params.examUUID
    },
    attributes: ['identifier', 'status'],
    include: [{
      model: ExamSchedule,
      as: 'schedule',
      attributes: ['uuid', 'startTime', 'endTime', 'joined', 'examTime', 'createdAt']
    }],
    order: [[{ model: ExamSchedule, as: 'schedule' }, 'createdAt', 'DESC']]
  })
  if (!schedules) {
    throw new HttpNotFound('Exam ' + NOT_FOUND)
  }

  return {
    message: SUCCESSFUL,
    payload: schedules
  }
}
