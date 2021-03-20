import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import { getConfig } from '../config/global_config'
import { handleError } from '../helpers/error'
import { UNAUTHORIZED, FORBIDDEN } from 'http-status'

const jwt = jsonwebtoken
const getKey = keyPath => fs.readFileSync(keyPath, 'utf-8')

export const generateToken = async payload => {
  let privateKey = getKey(getConfig('/privateKey'))
  const verifyOptions = {
    algorithm: 'RS256',
    expiresIn: '24h',
  }
  const token = await jwt.sign(payload, privateKey, verifyOptions)
  return token
}

export const getToken = headers => {
  if (
    headers &&
    headers.authorization &&
    headers.authorization.includes('Bearer')
  ) {
    const parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    }
  }
  return undefined
}

export const verifyToken = async (req, res, next) => {
  const publicKey = fs.readFileSync(getConfig('/publicKey'), 'utf8')

  const verifyOptions = {
    algorithm: 'RS256',
  }

  const token = getToken(req.headers)
  if (!token) {
    return handleError(
      { code: UNAUTHORIZED, success: false, message: 'Token is not valid!' },
      res
    )
  }
  let decodedToken
  try {
    decodedToken = await jwt.verify(token, publicKey, verifyOptions)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return handleError(
        {
          code: UNAUTHORIZED,
          success: false,
          message: 'Access token expired!',
        },
        res
      )
    }
    return handleError(
      { code: UNAUTHORIZED, success: false, message: 'Token is not valid!' },
      res
    )
  }

  const roles = decodedToken.roles
  if (roles === 0) {
    const userId = decodedToken.sub
    req.roles = roles
    req.userId = userId
    next()
  } else {
    const stafId = decodedToken.sub
    req.roles = roles
    req.stafId = stafId
    next()
  }
}

export const authenticateUser = async (req, res, next) => {
  const roles = req.roles
  if (roles === 0) {
    next()
  } else {
    return handleError(
      { code: UNAUTHORIZED, success: false, message: 'Please Login First' },
      res
    )
  }
}

export const authenticateStaf = async (req, res, next) => {
  const roles = req.roles

  if (roles === 1 || roles === 2) {
    next()
  } else {
    return handleError(
      { code: FORBIDDEN, success: false, message: 'Access Forbidden!' },
      res
    )
  }
}

export const authenticateAdmin = async (req, res, next) => {
  const roles = req.roles
  if (roles === 2 || roles === 3) {
    next()
  } else {
    return handleError(
      { code: FORBIDDEN, success: false, message: 'Access Forbidden!' },
      res
    )
  }
}

export const authenticateSuperAdmin = async (req, res, next) => {
  const roles = req.roles
  if (roles === 3) {
    next()
  } else {
    return handleError(
      { code: FORBIDDEN, success: false, message: 'Access Forbidden!' },
      res
    )
  }
}
