import express from 'express'

import { router as auth } from './auth_api'
import { router as users } from './user_api'
import { router as staf } from './staf_api'
import { router as laporan } from './laporan_api'
import { router as doc } from './doc_api'
import { router as dash } from './dash_api'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/staf', staf)
router.use('/report', laporan)
router.use('/documents', doc)
router.use('/dashboard', dash)

export { router }
