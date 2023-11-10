import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import {
  ExamParticipationQuestion,
  ExamSchedule,
  ScheduleExamParticipation,
  UserDeviceToken,
  UserMessages,
} from '../../../../shared/database/models'
import { EXAM_IS_COMPLETED } from '../../../../shared/constants/message'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { sendPushNotification } from '../../../../shared/lib/notification/sendPushNotification'
import { SCHEDULE_EXAM_PARTICIPATION_NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'

export const finalMarks = async (params: IControllerParams<null>) => { 
  const examParticipationUUID = params.args.params.examParticipationUUID
  const mark = await ScheduleExamParticipation.findOne({
    where: {
      uuid: examParticipationUUID
    },
    attributes: ['uuid', 'marks', 'examScheduleUUID']
  }
  )
  if (!mark) {
    throw new HttpNotFound(SCHEDULE_EXAM_PARTICIPATION_NOT_FOUND)
  }
  const correctCount = await ExamParticipationQuestion.count({
    where: {
      examParticipationUUID,
      isCorrect: true,
      status: 'ANSWERED',
    },
  })

  const inCorrectCount = await ExamParticipationQuestion.count({
    where: {
      examParticipationUUID,
      isCorrect: false,
      status: 'ANSWERED',
    },
  })

  const skipped = await ExamParticipationQuestion.count({
    where: {
      examParticipationUUID,
      status: 'SKIPPED',
    },
  })

  const timeOut = await ExamParticipationQuestion.count({
    where: {
      examParticipationUUID,
      status: 'TIME_OUT',
    },
  })
  const data = {
    marks: mark.marks,
    correctCount: correctCount,
    inCorrectCount: inCorrectCount,
    skipped: skipped,
    timeOut: timeOut,
  }
  const schedule = await ExamSchedule.findOne({
    where: {
      uuid: mark.examScheduleUUID,
    },
    attributes: ['uuid', 'status'],
  })
  if (schedule) {
    const studentUUID = params.user.id
    const connectionList = await UserDeviceToken.findOne({
      where: {
        userId: studentUUID,
        type: 'FCM',
      },
    })
    if (connectionList && connectionList.token) {

      try {
        await sendPushNotification([connectionList.token], EXAM_IS_COMPLETED)
      } catch (e) {
        console.log("****************token", connectionList.token, "error*****")
      }
    }
    await UserMessages.create({
      userId: studentUUID,
      meta: { userId: studentUUID },
      message: EXAM_IS_COMPLETED,
    })
  }
  return {
    message: SUCCESSFUL,
    payload: {
      response: data,
      scheduleData: schedule,
    },
  }
}