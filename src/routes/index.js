import express from 'express'
import path from 'path'
import rateLimit from 'express-rate-limit'

import { router as apiRoute } from './apis'

const router = express.Router()

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
})

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.use('/api', apiLimiter, apiRoute)

export { router }
