import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { ScheduleExamParticipation, Student, ExamParticipationQuestion } from '../../../../shared/database/models'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'

export const getAllStudentsAttendedExam = async (params: IControllerParams<{}>) => {
  const students = await ScheduleExamParticipation.findAll({
    where: {
      examScheduleUUID: params.args.params.examScheduleUUID
    },
    attributes: ['uuid', 'marks'],
    include: [{
      model: Student,
      as: 'participatedStudents',
      attributes: ['uuid', 'firstName', 'lastName']
    }],
    order: [['marks', 'DESC']]
  })

  const response = []
  let rank = 1
  for (const obj of students) {
    const correctCount = await ExamParticipationQuestion.count({
      where: {
        examParticipationUUID: obj.uuid,
        isCorrect: true,
        status: 'ANSWERED',
      }
    })

    const inCorrectCount = await ExamParticipationQuestion.count({
      where: {
        examParticipationUUID: obj.uuid,
        isCorrect: false,
        status: 'ANSWERED',
      }
    })

    const notAttempted = await ExamParticipationQuestion.count({
      where: {
        examParticipationUUID: obj.uuid,
        givenAnswer: null
      }
    })
    const skipped = await ExamParticipationQuestion.count({
      where: {
        examParticipationUUID: obj.uuid,
        status: 'SKIPPED',
      },
    })

    const timeOut = await ExamParticipationQuestion.count({
      where: {
        examParticipationUUID: obj.uuid,
        status: 'TIME_OUT',
      },
    })
    const data = {
      uuid: obj.uuid,
      marks: obj.marks,
      rank: rank,
      firstName: obj.participatedStudents.firstName,
      lastName: obj.participatedStudents.lastName,
      studentUUID: obj.participatedStudents.uuid,
      correctAnswerCount: correctCount,
      inCorrectAnswerCount: inCorrectCount,
      notAttemptedCount: notAttempted,
      scheduleUUID: params.args.params.examScheduleUUID,
      skipped,
      timeOut
    }
    response.push(data)
    rank = rank + 1
  }

  return {
    messsage: SUCCESSFUL,
    payload: {
      response: response
    }
  }
}
