import * as moment from 'moment'
import { NOT_ENOUGH_MONEY } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { OUTBOUND, SUCCESS, WALLET } from '../../../../shared/constants/message'
import {
  Exam,
  ExamSchedule,
  ScheduleExamParticipation,
  Wallet,
  WalletTransaction,
} from '../../../../shared/database/models'
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { isDefined } from '../../../../shared/helpers/isDefined'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IJoinExam } from '../interfaces/IJoinExam'
const uuid = require('uuid')

export const joinExam = async (params: IControllerParams<IJoinExam>) => {
  const inputs = params.input
  const transaction = params.transaction
  const studentUUID = params.user.id

  const exam = await Exam.findOne({
    where: {
      uuid: inputs.examUUID,
    },
    attributes: ['uuid', 'title', 'type', 'studentLimit', 'joinDelay', 'joinFee'],
    include: [
      {
        model: ExamSchedule,
        as: 'schedule',
        attributes: ['uuid', 'startTime', 'examTime'],
        where: {
          status: 'SCHEDULED',
          uuid: params.args.params.examScheduleUUID,
        },
      },
    ],
  })

  if (exam.schedule.length && exam.schedule[0].examTime === 'BASED_ON_TIME') {
    const time = moment().utc().format('YYYY:MM:DD, HH:mm')
    if (
      time >=
      moment(exam.schedule[0].startTime).utc().format('YYYY:MM:DD, HH:mm')
    ) {
      throw new HttpBadRequest(
        'Registration is not possible at this moment because registration time is completed'
      )
    }
  } else if (exam.schedule.length && exam.schedule[0].examTime === 'FULL_DAY') {
    const time = moment().utc().format('YYYY:MM:DD')
    if (time > moment(exam.schedule[0].endTime).utc().format('YYYY:MM:DD')) {
      throw new HttpBadRequest(
        'Registration is not possible at this moment because registration time is completed'
      )
    }
  }
  const count = await ScheduleExamParticipation.count({
    where: {
      examScheduleUUID: params.args.params.examScheduleUUID,
    },
  })

  if (count === exam.studentLimit) {
    throw new HttpBadRequest('All seats are filled Please try again later')
  } else {
    const joinExamEntity = {
      examScheduleUUID: params.args.params.examScheduleUUID,
      examUUID: inputs.examUUID,
      studentUUID,
      status: 'REGISTERED',
      marks: 0
    }

    if (isDefined(inputs.primarySubcategory)) {
      // eslint-disable-next-line dot-notation
      joinExamEntity['primarySubcategory'] = inputs.primarySubcategory
    }

    if (isDefined(inputs.secondarySubcategory)) {
      // eslint-disable-next-line dot-notation
      joinExamEntity['secondarySubcategory'] = inputs.secondarySubcategory
    }

    const wallet = await Wallet.findOne({
      where: {
        studentUUID,
      },
    })

    if (wallet) {
      if (exam.joinFee > wallet.balance) {
        throw new HttpNotFound(NOT_ENOUGH_MONEY)
      }
      wallet.balance = wallet.balance - exam.joinFee
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
          type: OUTBOUND,
          status: SUCCESS,
          paymentDate: new Date(),
        },
        { transaction }
      )
    }

    await ScheduleExamParticipation.create(joinExamEntity, { transaction })
  }
  await transaction.commit()
  return {
    message: SUCCESSFUL,
    payload: {
      response: exam,
    },
  }
}
