import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Exam, ExamBanner, ExamPriceRatio, ExamRankingFactor, ExamSchedule, ScheduleExamParticipation } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getExamDetailsStudent = async (params: IControllerParams<{}>) => {
  let examsDetails

  const schedule = await ScheduleExamParticipation.findOne({
    where: {
      studentUUID: params.user.id,
      examScheduleUUID: params.args.params.scheduleUUID
    }
  })

  if (schedule) {
    examsDetails = await Exam.findOne({
      include: [{
        model: ExamRankingFactor,
        as: 'examRankingFactor'
      },
      {
        model: ExamBanner,
        as: 'examBanner'
      },
      {
        model: ExamPriceRatio,
        as: 'examprice'
      }, {
        model: ExamSchedule,
        as: 'schedule',
        include: [{
          model: ScheduleExamParticipation,
          as: 'studentExam',
          where: {
            examScheduleUUID: params.args.params.scheduleUUID,
            studentUUID: params.user.id
          }
        }]
      }],
      order: [['examprice', 'toValue', 'ASC']]
    })
    return {
      message: SUCCESSFUL,
      payload: {
        response: examsDetails,
        examStudent: true
      }
    }
  } else {
    examsDetails = await Exam.findOne({
      include: [{
        model: ExamRankingFactor,
        as: 'examRankingFactor'
      },
      {
        model: ExamBanner,
        as: 'examBanner'
      }, {
        model: ExamSchedule,
        as: 'schedule',
        where: {
          uuid: params.args.params.scheduleUUID
        }
      }]
    })
    return {
      message: SUCCESSFUL,
      payload: {
        response: examsDetails,
        examStudent: false
      }
    }
  }
}
