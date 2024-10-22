
import { Router } from 'express'
import { controllerHandler } from '../../../../shared/lib/system/controllerHandler'
import { addBanner } from '../controllers/addBanner'
import { deleteBanner } from '../controllers/deleteBanner'
import { getAllBanner } from '../controllers/getAllBanner'
import { getCities } from '../controllers/getCities'
import { getSignedUrl } from '../controllers/getSignedUrl'
import { addBannerSchema } from '../validations/addBannerSchema'
import { getSignedUrlSchema } from '../validations/getSignedUrlSchema'
import { addBundle } from '../controllers/addBundle'
import { addBundleSchema } from '../validations/addBundleSchema'
import { getAllBundle } from '../controllers/getAllBundle'
import { deleteBundle } from '../controllers/deleteBundle'
import { getBundle } from '../controllers/getBundle'
import { putBundle } from '../controllers/putBundle'

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

router.post('/common/bundle', controllerHandler({
  controller: addBundle,
  schema: addBundleSchema
}))

router.get('/common/bundle', controllerHandler({
  controller: getAllBundle,
  options: { transaction: false }
}))

router.delete('/common/bundle', controllerHandler({
  controller: deleteBundle,
}))

router.get('/common/bundle/:id', controllerHandler({
  controller: getBundle,
  options: { transaction: false }
}))

router.put('/common/bundle/:id', controllerHandler({
  controller: putBundle,
}))

export default router
