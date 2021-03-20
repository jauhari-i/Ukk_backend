import express from 'express'

import {
  deleteStafHandler,
  getStafDetailHandler,
  getStafListHandler,
  getAdminListHandler,
  getStafProfileHandler,
  registerStafHandler,
  updateStafDataHandler,
  updateStafPasswordHandler,
  updateStafProfileHandler,
} from '../../controllers/staf_handler'

import {
  verifyToken,
  authenticateStaf,
  authenticateAdmin,
  authenticateSuperAdmin,
} from '../../auth/jwt_auth_instance'

const router = express.Router()

router.get('/list', verifyToken, authenticateAdmin, getStafListHandler)
router.get(
  '/list-admin',
  verifyToken,
  authenticateSuperAdmin,
  getAdminListHandler
)
router.post(
  '/register/staf',
  verifyToken,
  authenticateAdmin,
  registerStafHandler
)
router.post(
  '/register/admin',
  verifyToken,
  authenticateSuperAdmin,
  registerStafHandler
)
router.get(
  '/detail/:stafId',
  verifyToken,
  authenticateAdmin,
  getStafDetailHandler
)
router.get(
  '/profile-staf',
  verifyToken,
  authenticateStaf,
  getStafProfileHandler
)
router.put(
  '/update/:stafId',
  verifyToken,
  authenticateAdmin,
  updateStafDataHandler
)
router.put(
  '/update-profile',
  verifyToken,
  authenticateStaf,
  updateStafProfileHandler
)
router.put(
  '/update-password',
  verifyToken,
  authenticateStaf,
  updateStafPasswordHandler
)
router.delete(
  '/delete-staf/:stafId',
  verifyToken,
  authenticateAdmin,
  deleteStafHandler
)

export { router }
