import express from 'express'
import {
  listAllReportHandler,
  addReportHandler,
  deleteReportAdminHandler,
  deleteReportUserHandler,
  listUserReportHandler,
  responseReportHandler,
  updateReportHandler,
  validateReportHandler,
  detailReportHandler,
} from '../../controllers/laporan_handler'
import {
  verifyToken,
  authenticateStaf,
  authenticateUser,
} from '../../auth/jwt_auth_instance'

const router = express.Router()

router.get('/list/all', verifyToken, authenticateStaf, listAllReportHandler)
router.get('/list/user', verifyToken, authenticateUser, listUserReportHandler)
router.get(
  '/detail/:reportId',
  verifyToken,
  authenticateUser,
  detailReportHandler
)
router.post('/add', verifyToken, authenticateUser, addReportHandler)
router.put(
  '/verify/:reportId/valid/:status',
  verifyToken,
  authenticateStaf,
  validateReportHandler
)
router.put(
  '/response/:reportId',
  verifyToken,
  authenticateStaf,
  responseReportHandler
)
router.put(
  '/update/:reportId',
  verifyToken,
  authenticateUser,
  updateReportHandler
)
router.delete(
  '/delete-user/:reportId',
  verifyToken,
  authenticateUser,
  deleteReportUserHandler
)
router.delete(
  '/delete-staf/:reportId',
  verifyToken,
  authenticateStaf,
  deleteReportAdminHandler
)

export { router }
