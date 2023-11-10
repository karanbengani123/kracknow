import { Router } from 'express'
import { controllerHandler } from '../../../../shared/lib/system/controllerHandler'
import { addBanner } from '../controller/addBanner'
import { deleteBanner } from '../controller/deleteBanner'
import { getallBanner } from '../controller/getallBanner'
// import { addBannerschema } from '../validations/addBannerschema'
const router = Router()

router.post('/Banner/addbanner', controllerHandler({
  controller: addBanner
  // schema: addBannerschema
}))

router.delete('/Banner/:uuid', controllerHandler({
  controller: deleteBanner
}))

router.get('/Banner/All', controllerHandler({
  controller: getallBanner,
  options: { transaction: false }
}))

export default router
