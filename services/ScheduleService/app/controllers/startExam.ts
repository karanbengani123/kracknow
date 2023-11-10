import * as moment from 'moment'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { UPDATED } from '../../../../shared/constants/httpSuccessMessages'
import {
  Exam,
  ExamSchedule,
  ScheduleExamParticipation,
} from '../../../../shared/database/models'
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IStartExam } from '../interfaces/IStartExam'

export const startExam = async (params: IControllerParams<IStartExam>) => {
  const inputs = params.input
  const transaction = params.transaction

  const time = moment().utc().format('YYYY:MM:DD, HH:mm:ss')

  const exam = await Exam.findOne({
    where: {
      uuid: inputs.examUUID,
    },
    attributes: ['studentLimit', 'joinDelay'],
    include: [
      {
        model: ExamSchedule,
        as: 'schedule',
        attributes: ['uuid', 'startTime', 'examTime'],
        where: {
          status: 'SCHEDULED',
          uuid: inputs.examScheduleUUID,
        },
      },
    ],
  })

  if (exam.schedule[0].examTime === 'BASED_ON_TIME') {
    console.log('inside')
    if (exam.schedule.length) {
      if (
        time <
        moment(exam.schedule[0].startTime).utc().format('YYYY:MM:DD, HH:mm:ss')
      ) {
        console.log('inside')
        throw new HttpBadRequest('Please Wait for the Exam To start')
      }
    }
  } else if (exam.schedule[0].examTime === 'FULL_DAY') {
    const fullTime = moment().utc().format('YYYY:MM:DD')
    if (exam.schedule.length) {
      if (
        fullTime < moment(exam.schedule[0].startTime).utc().format('YYYY:MM:DD')
      ) {
        throw new HttpBadRequest('Please Wait for the Exam To start')
      }
    }
  }

  if (exam.schedule[0].examTime === 'BASED_ON_TIME') {
    if (exam.schedule.length) {
      const joinDelayTime = moment().utc().format('YYYY:MM:DD, HH:mm')
      console.log(
        joinDelayTime,
        moment(exam.schedule[0].startTime).utc().format('YYYY:MM:DD, HH:mm') 
      )
      if (exam.joinDelay === 0) {
        if (
          joinDelayTime >
          moment(exam.schedule[0].startTime).utc().format('YYYY:MM:DD, HH:mm')
        ) {
          throw new HttpBadRequest('Exam has already started')
        }
      } else {
        if (
          time >
          moment(exam.schedule[0].startTime)
            .utc()
            .add(exam.joinDelay, 'seconds')
            .format('YYYY:MM:DD, HH:mm:ss')
        ) {
          throw new HttpBadRequest('Exam has already started')
        }
      }
    }
  } else if (exam.schedule[0].examTime === 'FULL_DAY') {
    const fullTime = moment().utc().format('YYYY:MM:DD')
    if (exam.schedule.length) {
      if (
        fullTime > moment(exam.schedule[0].endTime).utc().format('YYYY:MM:DD')
      ) {
        throw new HttpBadRequest('Exam has already started')
      }
    }
  }

  const scheduleExamStudent = await ScheduleExamParticipation.findOne({
    where: {
      uuid: params.args.params.scheduleExamParticipationUUID,
    },
  })

  if (!scheduleExamStudent) {
    throw new HttpNotFound('Student Schedule ' + NOT_FOUND)
  }

  const studentEntity = {
    startedTime: moment(inputs.startTime)
      .utc()
      .subtract(1, 'hour')
      .format('YYYY-MM-DD HH:mm:ss'),
    completedTime: moment()
      .utc()
      .subtract(1, 'hour')
      .format('YYYY-MM-DD HH:mm:ss'),
    status: 'APPEARED',
  }

  await scheduleExamStudent.update(studentEntity, { transaction })
  await transaction.commit()

  return {
    message: UPDATED,
  }
}
