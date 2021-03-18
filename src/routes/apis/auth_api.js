import express from 'express'
import {
  registerHandler,
  loginHandler,
  loginStafHandler,
} from '../../controllers/auth_handler'
import { app as basicAuthMiddleware } from '../../auth/basic_auth_instance'

const router = express.Router()

router.post('/users/register', basicAuthMiddleware, registerHandler)
router.post('/users/login', basicAuthMiddleware, loginHandler)
router.post('/staf/login', basicAuthMiddleware, loginStafHandler)

export { router }
