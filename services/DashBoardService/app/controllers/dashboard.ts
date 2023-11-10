import { Exam, ScheduleExamParticipation, TournamentParticipation } from '../../../../shared/database/models'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { COMPLETED } from '../../../../shared/constants/message'

export const dashboard = async (params: IControllerParams<null>) => {
  const studentUUID: string = params.user.id;
  const examCount = await Exam.count({
    where: {
      type: 'EXAM'
    },
    include: [{
      model: ScheduleExamParticipation,
      as: 'studentExam',
      separate: false,
      where: {
        studentUUID,
        status: COMPLETED
      }
    }]
  })

  const quizCount = await Exam.count({
    where: {
      type: 'QUIZ'
    },
    include: [{
      model: ScheduleExamParticipation,
      as: 'studentExam',
      separate: false,
      where: {
        studentUUID,
        status: COMPLETED
      }
    }]
  })

  const mockTestCount = await Exam.count({
    where: {
      type: 'MOCK_TEST'
    },
    include: [{
      model: ScheduleExamParticipation,
      as: 'studentExam',
      separate: false,
      where: {
        studentUUID,
        status: COMPLETED
      }
    }]
  })

  const tournamentCount = await TournamentParticipation.count({
    where: {
      studentUUID,
      status: COMPLETED
    }
  })

  return {
    message: SUCCESSFUL,
    payload: {
      examCount,
      tournamentCount,
      quizCount,
      mockTestCount
    }
  }
}
