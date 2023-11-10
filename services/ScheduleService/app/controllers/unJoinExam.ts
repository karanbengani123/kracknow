import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import {
  Exam,
  ExamSchedule,
  ScheduleExamParticipation,
  Wallet,
  WalletTransaction
} from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import moment from 'moment'
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest'
import { INBOUND, SUCCESS, WALLET } from '../../../../shared/constants/message'
const uuid = require('uuid')

export const unjoinExam = async (params: IControllerParams<{}>) => {
  const transaction = params.transaction

  const schedule = await ScheduleExamParticipation.findOne({
    where: {
      uuid: params.args.params.scheduleExamParticipationUUID
    }
  })
  const scheduleUUid = await ExamSchedule.findOne({
    where: {
      uuid: schedule.examScheduleUUID
    }
  })

  const time = moment().utc().format('YYYY:MM:DD, HH:mm:ss')
  if (time > moment(scheduleUUid.startTime).utc().format('YYYY:MM:DD, HH:mm:ss') && scheduleUUid.examTime === 'BASED_ON_TIME') {
    throw new HttpBadRequest('Exam has already started. You cannot unregister now')
  }
  const joinedExam = await ScheduleExamParticipation.destroy({
    where: {
      uuid: params.args.params.scheduleExamParticipationUUID
    }
  })
  if (!joinedExam) {
    throw new HttpNotFound('Exam ' + NOT_FOUND)
  }

  const wallet = await Wallet.findOne({
    where: {
      studentUUID: params.user.id
    }
  })

  if (wallet) {
    const exam = await Exam.findByPk(scheduleUUid.examUUID)
    if (exam) {
      wallet.balance = wallet.balance + exam.joinFee
      await wallet.save({ transaction })
      await WalletTransaction.create(
        {
          examType: exam.type,
          examTitle: exam.title,
          examUUID: exam.uuid,
          walletUUID: wallet.uuid,
          paymentMode: WALLET,
          orderId: uuid.v4().split('-')[4],
          referenceId: uuid.v4().split('-')[4],
          amount: exam.joinFee,
          type: INBOUND,
          status: SUCCESS,
          paymentDate: new Date()
        },
        { transaction }
      )
    }
  }

  await transaction.commit()

  return {
    message: SUCCESSFUL
  }
}
