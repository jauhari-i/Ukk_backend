import express from 'express'

import { router as auth } from './auth_api'
import { router as users } from './user_api'
import { router as staf } from './staf_api'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/staf', staf)

export { router }
