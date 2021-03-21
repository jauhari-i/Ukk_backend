import express from 'express'
import {
  excelUserHandler,
  excelStafHandler,
  excelReportHandler,
  pdfUserHandler,
} from '../../controllers/doc_hander'

const router = express.Router()

router.get('/generate/excel/users', excelUserHandler)
router.get('/generate/excel/staf', excelStafHandler)
router.get('/generate/excel/report', excelReportHandler)
router.get('/generate/pdf/users', pdfUserHandler)

export { router }
