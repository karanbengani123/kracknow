import { Op } from 'sequelize'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Exam, ExamBanner, ExamSchedule, ScheduleExamParticipation } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getScheduledExam = async (params: IControllerParams<{}>) => {
  const exam = await Exam.findAll({
    where: {
      type: params.args.queryString.type
    },
    include: [{
      model: ExamSchedule,
      as: 'schedule',
      separate: false,
      attributes: ['uuid', 'startTime'],
      where: {
        status: 'SCHEDULED'
      },
      include: [{
        model: ScheduleExamParticipation,
        as: 'studentExam',
        where: {
          studentUUID: params.user.id,
          [Op.or]: [{
            status: 'REGISTERED'
          }, {
            status: 'NOT_COMPLETED'
          }]

        }
      }]
    }, {
      model: ExamBanner,
      as: 'examBanner',
      attributes: ['uuid', 'url', 'phoneBanner']
    }]
  })

  return {
    message: SUCCESSFUL,
    payload: {
      response: exam
    }
  }
}
