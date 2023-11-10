import { Router } from 'express'
import { controllerHandler } from '../../../../shared/lib/system/controllerHandler'
import { adminExamReview } from '../controllers/adminStudentExamReview'
import { addExam } from '../controllers/createExam'
import { deleteExam } from '../controllers/deleteExam'
import { deletePriceRatio } from '../controllers/deleteExamPriceRatio'
import { deleteRankingFactor } from '../controllers/deleteRankingFactor'
import { getExam } from '../controllers/getAllExam'
import { getAllScheduledExam } from '../controllers/getAllScheduledExam'
import { allSchedules } from '../controllers/getAllSchedules'
import { getAllStudentsAttendedExam } from '../controllers/getAttendedStudents'
import { getExamDetails } from '../controllers/getExamDetails'
import { scheduleExam } from '../controllers/scheduleExam'
import { updateExam } from '../controllers/updateExam'
import { updateSchedule } from '../controllers/updateSchedule'
import { addExamSchema } from '../validations/createExamSchema'
import { scheduleExamSchema } from '../validations/scheduleExamSchema'
import { updateExamSchema } from '../validations/updateExamSchema'
import { updateScheduleSchema } from '../validations/updateScheduleSchema'

const router = Router()

router.post( 
  '/exams/addexam',
  controllerHandler({
    controller: addExam,
    schema: addExamSchema,
  })
)

router.put(
  '/exams/:examUUID',
  controllerHandler({
    controller: updateExam,
    schema: updateExamSchema,
  })
)

router.get(
  '/exams',
  controllerHandler({
    controller: getExam,
    options: { transaction: false },
  })
)

router.get(
  '/exams/:examUUID',
  controllerHandler({
    controller: getExamDetails,
    options: { transaction: false },
  })
)

router.post(
  '/exams/schedule/:examUUID',
  controllerHandler({
    controller: scheduleExam,
    schema: scheduleExamSchema,
  })
)

router.get(
  '/exams/allSchedule/:examUUID',
  controllerHandler({
    controller: getAllScheduledExam,
    options: { transaction: false },
  })
)

router.put(
  '/exams/schedule/:scheduleUUID',
  controllerHandler({
    controller: updateSchedule,
    schema: updateScheduleSchema,
  })
)

router.delete(
  '/exams/priceRatio/:priceRatioUUID',
  controllerHandler({
    controller: deletePriceRatio,
  })
)

router.delete(
  '/exams/rankingFactor/:rankingFactorUUID',
  controllerHandler({
    controller: deleteRankingFactor,
  })
)

router.delete(
  '/exams/:examUUID',
  controllerHandler({
    controller: deleteExam,
  })
)

router.get(
  '/exams/attended/students/:examScheduleUUID',
  controllerHandler({
    controller: getAllStudentsAttendedExam,
    options: { transaction: false },
  })
)

router.get(
  '/exams/all/schedule/:examUUID',
  controllerHandler({
    controller: allSchedules,
    options: { transaction: false },
  })
)

router.get(
  '/exams/admin/student/review/:examScheduleUUID/:studentUUID',
  controllerHandler({
    controller: adminExamReview,
    options: { transaction: false },
  })
)

export default router
