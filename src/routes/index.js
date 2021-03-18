import express from 'express'
import path from 'path'
import { router as auth } from './apis/auth_api'
import rateLimit from 'express-rate-limit'

const router = express.Router()

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
})

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.use('/api/auth', apiLimiter, auth)

export { router }
