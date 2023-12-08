import { Router } from 'express'
import { controllerHandler } from '../../../../shared/lib/system/controllerHandler'
import { addStudent } from '../controllers/addStudent'
import { changePassword } from '../controllers/changePassword'
import { deleteStudent } from '../controllers/deleteStudent'
import { getAllStudent } from '../controllers/getAllStudent'
import { getStudentById } from '../controllers/getStudentById'
import { updateStudent } from '../controllers/updateStudent'
import { addKeyword } from '../controllers/addKeyword'
import { addKeywordSchema } from '../validations/addKeywordSchema'
import { changePasswordSchema } from '../validations/changePasswordSchema'
import { StudentSchema } from '../validations/StudentSchema'
import { getKeyword } from '../controllers/getKeyword'
import { updateKeyword } from '../controllers/updateKeyword'
import { getAllStudentWithdrawRequest } from '../controllers/getAllStudentWithdrawRequest'
import { getStudentWithdrawRequest } from '../controllers/getStudentWithdrawRequest'
import { putStudentWithdrawRequest } from '../controllers/putStudentWithdrawRequest'
import { putNewStudentInitialAmount } from '../controllers/putNewStudentInitialAmount'
import { newStudentInitialAmountSchema } from '../validations/newStudentInitialAmountSchema'
import { getNewStudentInitialAmount } from '../controllers/getNewStudentInitialAmount'
import { getStudentExam } from '../controllers/getStudentExams'
import { getNotification } from '../controllers/getNotification'
import { putNotification } from '../controllers/putNotification'
import { deleteFCM } from '../controllers/deleteFCM'
import { storeFCM } from '../controllers/storeFCM'
import { storeFCMSchema } from '../validations/storeFCMSchema'
import { deleteFCMSchema } from '../validations/deleteFCMSchema'
import { AddmoneyRequest } from '../controllers/AddmoneyRequest'
import { postStudentWithdrawReuest } from '../controllers/postStudentWithdrawReuest'
import { putNewAdminWithdrawallimitAmount } from '../controllers/putNewAdminWithdrawallimitAmount'
import { getNewAdminWithdrawallimitAmount } from '../controllers/getNewAdminWithdrawallimitAmount'
import { newWithdrawalLimitAmountSchema } from '../validations/NewAdminWithdrawallimitAmountSchema'

const router = Router()

router.post(
  '/students',
  controllerHandler({
    controller: addStudent,
    schema: StudentSchema,
  })
)

router.put(
  '/students/:id',
  controllerHandler({
    controller: updateStudent,
    schema: StudentSchema,
  })
)

router.delete(
  '/students/:id',
  controllerHandler({
    controller: deleteStudent,
  })
)

router.get(
  '/students',
  controllerHandler({
    controller: getAllStudent,
    options: { transaction: false },
  })
)


// crate new request
router.post(
  '/students/addmonyrequest',
  controllerHandler({
    controller: AddmoneyRequest,
    options: { transaction: false },
  })
)

router.get(
  '/students/:id',
  controllerHandler({
    controller: getStudentById,
    options: { transaction: false },
  })
)

router.post(
  '/students/changepassword',
  controllerHandler({
    controller: changePassword,
    schema: changePasswordSchema,
  })
)

router.get(
  '/students/keywords/list',
  controllerHandler({
    controller: getKeyword,
    options: { transaction: false },
  })
)

router.put(
  '/students/keywords/list',
  controllerHandler({
    controller: updateKeyword,
    schema: addKeywordSchema,
  })
)

router.post(
  '/students/keywords/list',
  controllerHandler({
    controller: addKeyword,
    schema: addKeywordSchema,
  })
)

router.post(
  '/students/withdrawalrequest',
  controllerHandler({
    controller: postStudentWithdrawReuest,
    schema: changePasswordSchema,
  })
)



router.get(
  '/students/amount/initialamount',
  controllerHandler({
    controller: getNewStudentInitialAmount,
    options: { transaction: false },
  })
)

router.put(
  '/students/amount/initialamount',
  controllerHandler({
    controller: putNewStudentInitialAmount,
    schema: newStudentInitialAmountSchema,
  })
)


router.get(
  '/students/getstudentexams/:uuid',
  controllerHandler({
    controller: getStudentExam,
    options: { transaction: false },
  })
)

router.get(
  '/students/notification/list',
  controllerHandler({
    controller: getNotification,
    options: { transaction: false },
  })
)

router.put(
  '/students/notification/:notificationUUID',
  controllerHandler({
    controller: putNotification,
    options: { transaction: true },
  })
)

router.post(
  '/students/fcm',
  controllerHandler({
    controller: storeFCM,
    schema: storeFCMSchema,
    options: { transaction: true },
  })
)

router.delete(
  '/students/delete/fcm',
  controllerHandler({
    controller: deleteFCM,
    schema: deleteFCMSchema,
  })
)

// admin > withdrawallist
router.get(
  '/students/withdrawalrequest/list',
  controllerHandler({
    controller: getAllStudentWithdrawRequest,
    options: { transaction: false },
  })
)

// admin > withdrawal list seperate id
router.get(
  '/students/withdrawalrequest/list/:UUID',
  controllerHandler({
    controller: getStudentWithdrawRequest,
    options: { transaction: false },
  })
)

// admin > withdrawal done
router.post(
  '/students/withdrawalrequest/:UUID',
  controllerHandler({
    controller: putStudentWithdrawRequest,
  })
)

router.get(
  '/students/amount/withdrawallimit',
  controllerHandler({
    controller: getNewAdminWithdrawallimitAmount,
    options: { transaction: false },
  })
)

router.put(
  '/students/amount/withdrawallimit',
  controllerHandler({
    controller: putNewAdminWithdrawallimitAmount,
    schema: newWithdrawalLimitAmountSchema,
  })
)

export default router
