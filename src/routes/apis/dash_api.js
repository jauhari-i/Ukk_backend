import express from 'express'
import { dashboardHandler } from '../../controllers/dash_handler'
import { verifyToken, authenticateStaf } from '../../auth/jwt_auth_instance'

const router = express.Router()

router.get('/statistic', verifyToken, authenticateStaf, dashboardHandler)

export { router }
