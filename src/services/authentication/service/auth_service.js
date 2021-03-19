import {
  getUsersEmail,
  getUsersNik,
  getUsersPhone,
  insertUsers,
  getUserByEmail,
  getStafByEmail,
} from '../query/auth_query'
import { checkMatch } from '../../../constants/encyprtion'
import { validateRegister, validatelogin } from '../validate/auth_validation'
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from 'http-status'
import { generateToken } from '../../../auth/jwt_auth_instance'

export const registerUser = async data => {
  try {
    const emailUser = await getUsersEmail()
    const nikUser = await getUsersNik()
    const phoneuser = await getUsersPhone()
    const validateError = await validateRegister(
      emailUser.result,
      nikUser.result,
      phoneuser.result,
      data
    )

    if (validateError) {
      throw {
        code: BAD_REQUEST,
        message: validateError,
        success: false,
      }
    } else {
      const queryErr = await insertUsers(data)
      if (queryErr.error === undefined) {
        return {
          code: CREATED,
          message: 'Register user success',
          success: true,
        }
      } else {
        throw {
          code: INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          success: false,
        }
      }
    }
  } catch (error) {
    return error
  }
}

export const loginUser = async data => {
  try {
    const validateError = await validatelogin(data)
    if (validateError) {
      throw {
        code: BAD_REQUEST,
        message: validateError,
        success: false,
      }
    } else {
      const { result } = await getUserByEmail(data.email)
      if (result.email === data.email) {
        const matchPassword = await checkMatch(data.password, result.password)
        if (!matchPassword) {
          throw {
            code: BAD_REQUEST,
            message: 'Password not match',
            success: false,
          }
        } else {
          const payload = {
            roles: 0,
            email: result.email,
            sub: result.userId,
          }

          const accessToken = await generateToken(payload)

          return {
            code: OK,
            message: 'Login Success',
            success: true,
            data: {
              accessToken,
            },
          }
        }
      } else {
        throw {
          code: NOT_FOUND,
          message: 'Email not Exist',
          success: false,
        }
      }
    }
  } catch (error) {
    return error
  }
}

export const loginStaf = async data => {
  try {
    const validateError = await validatelogin(data)
    if (validateError) {
      throw {
        code: BAD_REQUEST,
        message: validateError,
        success: false,
      }
    } else {
      const { result } = await getStafByEmail(data.email)
      if (result !== undefined && result.email === data.email) {
        const matchPassword = await checkMatch(data.password, result.password)
        if (!matchPassword) {
          throw {
            code: BAD_REQUEST,
            message: 'Password not match',
            success: false,
          }
        } else {
          const payload = {
            roles: Number(result.level),
            email: result.email,
            sub: result.stafId,
          }

          const accessToken = await generateToken(payload)

          return {
            code: OK,
            message: 'Login Success',
            success: true,
            data: {
              accessToken,
            },
          }
        }
      } else {
        throw {
          code: NOT_FOUND,
          message: 'Email not Exist',
          success: false,
        }
      }
    }
  } catch (error) {
    return error
  }
}
