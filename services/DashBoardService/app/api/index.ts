import { Router } from 'express'
import { controllerHandler } from '../../../../shared/lib/system/controllerHandler'
import { adminDashboard } from '../controllers/adminDashboard'

import { dashboard } from '../controllers/dashboard'

const router = Router()

router.get(
  '/dashboard',
  controllerHandler({
    controller: dashboard,
    options: { transaction: false },
  })
)

router.get(
  '/dashboard/admin',
  controllerHandler({
    controller: adminDashboard,
    options: { transaction: false },
  })
)

export default router
