import { Router } from 'express'
import { controllerHandler } from '../../../../shared/lib/system/controllerHandler'
import { addKeyword } from '../controllers/addKeyword'
import { deleteKeyword } from '../controllers/deleteKeyword'
import { getKeyword } from '../controllers/getKeyword'
import { updateKeyword } from '../controllers/updateKeyword'
import { addKeywordSchema } from '../validations/addKeywordSchema'
import { updateKeywordSchema } from '../validations/updateKeywordSchema'

const router = Router()

router.post('/keywords', controllerHandler({
  controller: addKeyword,
  schema: addKeywordSchema
}))

router.get('/keywords', controllerHandler({
  controller: getKeyword,
  options: { transaction: false }
}))

router.put('/keywords/:attribute', controllerHandler({
  controller: updateKeyword,
  schema: updateKeywordSchema
}))

router.delete('/keywords/:attribute', controllerHandler({
  controller: deleteKeyword
}))

export default router
