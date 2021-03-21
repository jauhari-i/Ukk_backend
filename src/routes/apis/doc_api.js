import express from 'express'
import {
  excelUserHandler,
  excelStafHandler,
  excelReportHandler,
} from '../../controllers/doc_hander'
import {
  verifyToken,
  authenticateStaf,
  authenticateAdmin,
} from '../../auth/jwt_auth_instance'

const router = express.Router()

router.get(
  '/generate/excel/users',
  verifyToken,
  authenticateStaf,
  excelUserHandler
)
router.get(
  '/generate/excel/staf',
  verifyToken,
  authenticateAdmin,
  excelStafHandler
)
router.get(
  '/generate/excel/report',
  verifyToken,
  authenticateStaf,
  excelReportHandler
)

export { router }
