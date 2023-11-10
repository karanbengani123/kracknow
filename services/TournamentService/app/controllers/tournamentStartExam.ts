import * as moment from 'moment'
import { EXAM_ALREADY_FINISHED, EXAM_NOT_FOUND, EXAM_NOT_STARTED } from '../../../../shared/constants/httpErrorMessages'
import { UPDATED } from '../../../../shared/constants/httpSuccessMessages'
import {
  Tournament,
  TournamentExamSchedule,
  TournamentParticipation,
  TournamentSchedule,
  TournamentScheduledExam,
} from '../../../../shared/database/models'
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IStartExam } from '../interfaces/IStartExam'

export const tournamentStartExam = async (params: IControllerParams<IStartExam>) => {
  const transaction = params.transaction
  const time = moment().utc()
  const tournamentParticipation = await TournamentParticipation.findOne({
    where: {
      uuid: params.input.participationUUID,
      studentUUID: params.user.id
    },
  })

  if (!tournamentParticipation) {
    throw new HttpNotFound('You are not participated')
  }

  const tournament = await Tournament.findByPk(tournamentParticipation.tournamentUUID, {
    include: [
      {
        model: TournamentExamSchedule,
        as: "tournamentExamSchedule"
      },
      {
        model: TournamentSchedule,
        as: "tournamentSchedule",
        where: {
          uuid: tournamentParticipation.tournamentScheduleUUID
        },
        order: ['createdAt', 'DESC']
      }
    ],
    order: [[{
      model: TournamentExamSchedule,
      as: "tournamentExamSchedule"
    }, 'serialNo', 'ASC']]
  })
  const schedule = tournament.tournamentSchedule[0]

  if (!schedule) {
    throw new HttpBadRequest('No tournament schedule found')
  }

  if (
    time <
    moment(schedule.startTime).utc()
  ) {
    throw new HttpBadRequest('Please Wait for the Exam To start')
  }

  if (tournament.tournamentExamSchedule.joinDelay === 0) {
    if (
      time >
      moment(schedule.startTime).utc()
    ) {
      throw new HttpBadRequest('Exam has already started')
    }
  }
  else if (
    time > moment(schedule.endTime).utc().add(tournament.joinDelay, 'seconds')
  ) {
    throw new HttpBadRequest('Exam has already started')
  }

  const exam = await TournamentScheduledExam.findOne({
    where: {
      tournamentScheduleUUID: schedule.uuid,
      examUUID: params.input.examUUID
    }
  })
  if (!exam)
    throw new HttpBadRequest(EXAM_NOT_FOUND)


  if (
    time >
    moment(exam.endTime).utc()
  ) {
    throw new HttpBadRequest(EXAM_ALREADY_FINISHED)
  }
  if (
    time <
    moment(exam.startTime).utc()
  ) {
    throw new HttpBadRequest(EXAM_NOT_STARTED)
  }

  await tournamentParticipation.update({
    startedTime: moment(new Date())
      .utc()
      .subtract(1, 'hour')
      .format('YYYY-MM-DD HH:mm:ss'),
    completedTime: moment()
      .utc()
      .subtract(1, 'hour')
      .format('YYYY-MM-DD HH:mm:ss'),
    status: 'APPEARED',
  }, { transaction })
  await transaction.commit()

  return {
    message: UPDATED
  }
}
