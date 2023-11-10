import { Router } from 'express'
import { controllerHandler } from '../../../../shared/lib/system/controllerHandler'
import { addMockTest } from '../controllers/createMockTest'
import { getAllMockTest } from '../controllers/getAllMockTest'
import { getMockTestDetails } from '../controllers/getMockTestDetails'
import { updateMockTest } from '../controllers/updateMockTest'
import { addMockTestSchema } from '../validations/createMockTestSchema'
import { updateMockTestSchema } from '../validations/updateMockTestSchema'

const router = Router()

router.post('/mockTest/addMockTest', controllerHandler({
  controller: addMockTest,
  schema: addMockTestSchema
}))

router.put('/mockTest/updateMockTest', controllerHandler({
  controller: updateMockTest,
  schema: updateMockTestSchema
}))

router.get('/mockTest', controllerHandler({
  controller: getAllMockTest,
  options: { transaction: false }
}))

router.get('/mockTest/:mockTestUUID', controllerHandler({
  controller: getMockTestDetails,
  options: { transaction: false }
}))

export default router
