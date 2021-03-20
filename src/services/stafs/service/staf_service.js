import {
  deleteStaf,
  getListStaf,
  getStafData,
  getStafEmails,
  getStafUpdateEmails,
  insertStaf,
  updatePasswordStaf,
  updateStaf,
} from '../query/staf_query'
import {
  validatePassword,
  validateRegister,
  validateUpdate,
} from '../validate/staf_validation'
import {
  OK,
  CREATED,
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from 'http-status'

export const registerStaf = async data => {
  try {
    const emails = await getStafEmails()
    const validate = await validateRegister(emails, data)
    if (validate) {
      throw {
        code: BAD_REQUEST,
        message: validate,
        success: false,
      }
    } else {
      const query = await insertStaf(data)
      if (query.error) {
        throw {
          code: INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          success: false,
        }
      } else {
        throw {
          code: CREATED,
          message: 'Staf created',
          success: true,
        }
      }
    }
  } catch (error) {
    return error
  }
}

export const getStafDatas = async stafId => {
  try {
    const query = await getStafData(stafId)
    if (!query) {
      throw {
        code: NOT_FOUND,
        message: 'Staf not found',
        success: false,
      }
    } else {
      return {
        code: OK,
        message: 'Get staf data success',
        data: query.result,
        success: true,
      }
    }
  } catch (error) {
    return error
  }
}

export const getStafProfile = async stafId => {
  try {
    const query = await getStafData(stafId)
    if (!query) {
      throw {
        code: NOT_FOUND,
        message: 'Staf not found',
        success: false,
      }
    } else {
      return {
        code: OK,
        message: 'Get staf profile success',
        data: query.result,
        success: true,
      }
    }
  } catch (error) {
    return error
  }
}

export const getStafList = async level => {
  try {
    const { result } = await getListStaf(level)
    return {
      code: OK,
      message: 'Get list success',
      data: result,
      success: true,
    }
  } catch (error) {
    return error
  }
}

export const updateStafPassword = async (stafId, data) => {
  try {
    const validate = await validatePassword(data)
    if (validate) {
      throw {
        code: BAD_REQUEST,
        message: validate,
        success: false,
      }
    } else {
      const query = await updatePasswordStaf(stafId, data)
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
            message: 'Old passsword not match',
            success: false,
          }
        } else {
          if (query.error) {
            throw {
              code: INTERNAL_SERVER_ERROR,
              message: 'Internal server error',
              success: false,
            }
          } else {
            return {
              code: OK,
              message: 'Update password success',
              success: true,
            }
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}

export const updateStafData = async (stafId, data) => {
  try {
    const emails = await getStafUpdateEmails(stafId)
    const validate = await validateUpdate(emails, data)
    if (validate) {
      throw {
        code: BAD_REQUEST,
        message: validate,
        success: false,
      }
    } else {
      const query = await updateStaf(stafId, data)
      if (query.success) {
        return {
          code: OK,
          message: 'Update staf success',
          success: true,
        }
      } else {
        if (!query.found) {
          throw {
            code: NOT_FOUND,
            message: 'Staf not found',
            success: false,
          }
        } else {
          throw {
            code: INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            success: false,
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}

export const deleteStafs = async stafId => {
  try {
    const query = await deleteStaf(stafId)
    if (!query) {
      throw {
        code: NOT_FOUND,
        message: 'Staf not found',
        success: false,
      }
    } else {
      if (query.success) {
        return {
          code: OK,
          message: 'Delete staf success',
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
