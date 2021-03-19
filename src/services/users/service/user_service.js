import {
  getUserById,
  getUserList,
  getUsersEmail,
  getUsersPhone,
  getUsersNik,
  updateUser,
  deleteUser,
  updatePasswordUser,
} from '../query/user_query'
import { OK, NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status'
import { validateUpdate, validatePassword } from '../validate/user_validation'

export const userList = async () => {
  try {
    const { result } = await getUserList()
    return {
      success: true,
      code: OK,
      message: 'Get users list success',
      data: result,
    }
  } catch (error) {
    return error
  }
}

export const userData = async userId => {
  try {
    const { result } = await getUserById(userId)
    if (!result) {
      throw {
        code: NOT_FOUND,
        message: 'User not found',
        success: false,
      }
    } else {
      return {
        code: OK,
        message: 'Get user detail Success',
        success: true,
        data: result,
      }
    }
  } catch (error) {
    return error
  }
}

export const userProfile = async userId => {
  try {
    const { result } = await getUserById(userId)
    if (!result) {
      throw {
        code: NOT_FOUND,
        message: 'User not found',
        success: false,
      }
    } else {
      return {
        code: OK,
        message: 'Get user profile success',
        success: true,
        data: result,
      }
    }
  } catch (error) {
    return error
  }
}

export const updateProfile = async (userId, data) => {
  try {
    const emailUser = await getUsersEmail(userId)
    const nikUser = await getUsersNik(userId)
    const phoneuser = await getUsersPhone(userId)
    const validateError = await validateUpdate(
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
      const query = await updateUser(userId, data)
      if (query.success) {
        return {
          code: OK,
          success: true,
          message: 'Update profile success',
        }
      } else {
        throw {
          code: INTERNAL_SERVER_ERROR,
          success: false,
          message: 'Internal server error',
        }
      }
    }
  } catch (error) {
    return error
  }
}

export const deleteUsers = async userId => {
  try {
    const query = await deleteUser(userId)
    if (!query) {
      throw {
        code: NOT_FOUND,
        message: 'User not found',
        success: false,
      }
    } else {
      return {
        code: OK,
        message: 'Users is deleted',
        success: true,
      }
    }
  } catch (error) {
    return error
  }
}

export const updatePassword = async (userId, data) => {
  try {
    const validateError = await validatePassword(data)
    if (validateError) {
      throw {
        code: BAD_REQUEST,
        message: validateError,
        success: false,
      }
    } else {
      const query = await updatePasswordUser(userId, data)
      if (!query) {
        throw {
          code: INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          success: false,
        }
      } else {
        if (!query.match) {
          throw {
            code: BAD_REQUEST,
            message: 'Old password is not match',
            success: false,
          }
        } else {
          return {
            code: OK,
            message: 'Update password succes',
            success: true,
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}
