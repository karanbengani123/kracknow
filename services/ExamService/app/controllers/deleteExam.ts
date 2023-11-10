import { DELETED } from '../../../../shared/constants/httpSuccessMessages'
import { Exam, ExamBanner, ExamCity, ExamKeyword, ExamPriceRatio, ExamQuestion, ExamRankingFactor, ExamSchedule } from '../../../../shared/database/models'
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const deleteExam = async (params: IControllerParams<{}>) => {
  const transaction = params.transaction
  const schedule = await ExamSchedule.findAll({
    where: {
      examUUID: params.args.params.examUUID,
      status: 'SCHEDULED'
    }
  })

  if (schedule.length) {
    throw new HttpBadRequest('Exam is scheduled , please try later')
  }
  if (!schedule.length) {
    await ExamBanner.destroy({
      where: {
        examUUID: params.args.params.examUUID
      }
    })

    await ExamCity.destroy({
      where: {
        examUUID: params.args.params.examUUID
      }
    })

    await ExamKeyword.destroy({
      where: {
        examUUID: params.args.params.examUUID
      }
    })

    await ExamPriceRatio.destroy({
      where: {
        examUUID: params.args.params.examUUID
      }
    })

    await ExamQuestion.destroy({
      where: {
        examUUID: params.args.params.examUUID
      }
    })

    await ExamRankingFactor.destroy({
      where: {
        examUUID: params.args.params.examUUID
      }
    })

    await ExamSchedule.destroy({
      where: {
        examUUID: params.args.params.examUUID
      }
    })

    await Exam.destroy({
      where: {
        uuid: params.args.params.examUUID
      }
    })
    await transaction.commit()
  }
  return {
    message: DELETED
  }
}
