import express from 'express'
import path from 'path'
import rateLimit from 'express-rate-limit'

import { router as auth } from './apis/auth_api'
import { router as users } from './apis/user_api'
const router = express.Router()

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
})

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.use('/api/auth', apiLimiter, auth)
router.use('/api/users', apiLimiter, users)

export { router }
