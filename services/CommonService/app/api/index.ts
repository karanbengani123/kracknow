
import { Router } from 'express'
import { controllerHandler } from '../../../../shared/lib/system/controllerHandler'
import { addBanner } from '../controllers/addBanner'
import { deleteBanner } from '../controllers/deleteBanner'
import { getAllBanner } from '../controllers/getAllBanner'
import { getCities } from '../controllers/getCities'
import { getSignedUrl } from '../controllers/getSignedUrl'
import { addBannerSchema } from '../validations/addBannerSchema'
import { getSignedUrlSchema } from '../validations/getSignedUrlSchema'

const router = Router()

router.get('/common/cities', controllerHandler({
  controller: getCities,
  options: { transaction: false }
}))

router.post('/common/filesupload', controllerHandler({
  controller: getSignedUrl,
  schema: getSignedUrlSchema
}))

router.post('/common/banner', controllerHandler({
  controller: addBanner,
  schema: addBannerSchema
}))

router.get('/common/banner', controllerHandler({
  controller: getAllBanner,
  options: { transaction: false }
}))

router.delete('/common/banner', controllerHandler({
  controller: deleteBanner
}))

export default router
