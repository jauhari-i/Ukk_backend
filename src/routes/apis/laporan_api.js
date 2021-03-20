import express from 'express'
import { listAllReportHandler } from '../../controllers/laporan_handler'

const router = express.Router()

router.get('/list/all', listAllReportHandler)

export { router }
