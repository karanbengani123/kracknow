import { Router } from 'express'
import { controllerHandler } from '../../../../shared/lib/system/controllerHandler'
import { getScheduledExam } from '../controllers/getRegisteredExamStudent'
import { examTakenByStudent } from '../controllers/examTakenByStudent'
import { getExamDetailsStudent } from '../controllers/getExamDetailsStudent'
import { getAllQuestionForExam } from '../controllers/getQuestionForExam'
import { joinExam } from '../controllers/joinExam'
import { startExam } from '../controllers/startExam'
import { unjoinExam } from '../controllers/unJoinExam'
import { joinExamSchema } from '../validations/joinExamSchema'
import { startExamSchema } from '../validations/startExamSchema'
import { getAllExam } from '../controllers/getAllExam'
import { finalMarks } from '../controllers/finalMarks'
import { examTakenSchema } from '../validations/ExamTakenByStudentSchema'
import { studentLeaderBoard } from '../controllers/studentleaderboard'
import { studentAnswerPreview } from '../controllers/previewAnswer'
import { getSubcategoryStudent } from '../controllers/getSubcategoryForStudent'
import { getCompletedExam } from '../controllers/getCompletedExamStudents'
import { allQuestionReview } from '../controllers/getQuestionForReview'
import { getQuestion } from '../controllers/getIndividualQuestionReview'
import { getPiechartData } from '../controllers/getPiechartData'
import { postDistributeMoney } from '../controllers/postDistributeMoney'
import { getPreviousQuestionStatusForExam } from '../controllers/getPreviousQuestionStatusForExam'

const router = Router()

router.post(
  '/schedules/:examScheduleUUID/join',
  controllerHandler({
    controller: joinExam,
    schema: joinExamSchema,
  })
)

router.delete(
  '/schedules/:scheduleExamParticipationUUID/disjoin',
  controllerHandler({
    controller: unjoinExam,
  })
)

router.get(
  '/schedules',
  controllerHandler({
    controller: getScheduledExam,
    options: { transaction: false },
  })
)

router.get(
  '/schedules/:scheduleUUID',
  controllerHandler({
    controller: getExamDetailsStudent,
    options: { transaction: false },
  })
)

router.get(
  '/schedules/:examUUID/live/status/:examParticipationUUID',
  controllerHandler({
    controller: getAllQuestionForExam,
    options: { transaction: false },
  })
)

router.get(
  '/schedules/:examParticipationUUID/previous/question/:questionUUID/status',
  controllerHandler({
    controller: getPreviousQuestionStatusForExam,
    options: { transaction: false },
  })
)

router.put(
  '/schedules/:scheduleExamParticipationUUID/start/Exam/student',
  controllerHandler({
    controller: startExam,
    schema: startExamSchema,
  })
)

router.post(
  '/schedules/:examParticipationUUID/live/answer',
  controllerHandler({ 
    controller: examTakenByStudent,
    schema: examTakenSchema,
  })
)

router.get(
  '/schedules/marks/:examParticipationUUID',
  controllerHandler({
    controller: finalMarks,
    options: { transaction: false },
  })
)

router.get(
  '/schedules/all/exam',
  controllerHandler({
    controller: getAllExam,
    options: { transaction: false },
  })
)

router.get(
  '/schedules/leaderBoard/:examScheduleUUID',
  controllerHandler({
    controller: studentLeaderBoard,
    options: { transaction: false },
  })
)

router.get(
  '/schedules/review/answer/:examScheduleUUID',
  controllerHandler({
    controller: studentAnswerPreview,
    options: { transaction: false },
  })
)

router.get(
  '/schedules/subcategory/:examUUID',
  controllerHandler({
    controller: getSubcategoryStudent,
    options: { transaction: false },
  })
)

router.get(
  '/schedules/completed/exams',
  controllerHandler({
    controller: getCompletedExam,
    options: { transaction: false },
  })
)

router.get(
  '/schedules/exam/question/:examParticipationUUID',
  controllerHandler({
    controller: allQuestionReview,
    options: { transaction: false },
  })
)

router.get(
  '/schedules/exam/question/options/:questionUUID',
  controllerHandler({
    controller: getQuestion,
    options: { transaction: false },
  })
)

router.get(
  '/schedules/get_pie_chart_data/:examScheduleUUID',
  controllerHandler({
    controller: getPiechartData,
  })
)

router.post(
  '/schedules/leaderboard/prizedistribute/:examUUID',
  controllerHandler({
    controller: postDistributeMoney,
    options: { transaction: false },
  })
)

export default router
