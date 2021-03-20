import {
  listAllQuery,
  deleteQueryAdmin,
  deleteQuery,
  listUserQuery,
  insertQuery,
  responseQuery,
  validateQuery,
  updateQuery,
  detailQuery,
} from '../query/laporan_query'
import {
  validateLaporan,
  validateResponse,
} from '../validate/laporan_validation'
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from 'http-status'

export const listAllReport = async () => {
  try {
    const query = await listAllQuery()
    return {
      code: OK,
      message: 'Get report success',
      data: query.result,
      success: true,
    }
  } catch (error) {
    return error
  }
}

export const listUserReport = async userId => {
  try {
    const query = await listUserQuery(userId)

    return {
      code: OK,
      message: 'Get user report success',
      data: query.result,
      success: true,
    }
  } catch (error) {
    return error
  }
}

export const detailReport = async reportId => {
  try {
    const query = await detailQuery(reportId)

    if (query.notFound) {
      throw {
        code: NOT_FOUND,
        message: 'Report not found',
        success: false,
      }
    } else {
      return {
        code: OK,
        message: 'Get detail success',
        data: query.result,
        success: true,
      }
    }
  } catch (error) {
    return error
  }
}

export const addReport = async (userId, data) => {
  try {
    const validationError = await validateLaporan(data)
    if (validationError) {
      return {
        code: BAD_REQUEST,
        message: validationError,
        success: false,
      }
    } else {
      const query = await insertQuery(userId, data)
      if (!query) {
        throw {
          code: INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          success: false,
        }
      } else {
        return {
          code: CREATED,
          message: 'Report created',
          success: true,
        }
      }
    }
  } catch (error) {
    return error
  }
}

export const deleteReportUser = async (userId, reportId) => {
  try {
    const query = await deleteQuery(reportId, userId)
    if (query.notFound) {
      throw {
        code: NOT_FOUND,
        message: 'Report not found',
        success: false,
      }
    } else {
      if (query.success) {
        return {
          code: OK,
          message: 'Delete report success',
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

export const deleteReportAdmin = async reportId => {
  try {
    const query = await deleteQueryAdmin(reportId)
    if (query.notFound) {
      throw {
        code: NOT_FOUND,
        message: 'Report not found',
        success: false,
      }
    } else {
      if (query.success) {
        return {
          code: OK,
          message: 'Delete report success',
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

export const validateReport = async (reportId, status, stafId) => {
  try {
    const query = await validateQuery(reportId, stafId, { status })
    if (query.notFound) {
      throw {
        code: NOT_FOUND,
        message: 'Report not found',
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
          message: 'Report is validated',
          success: true,
        }
      }
    }
  } catch (error) {
    return error
  }
}

export const updateReport = async (reportId, userId, data) => {
  try {
    const validationError = await validateLaporan(data)
    if (validationError) {
      throw {
        code: BAD_REQUEST,
        message: validationError,
        success: false,
      }
    } else {
      const query = await updateQuery(reportId, userId, data)
      if (query.notFound) {
        throw {
          code: NOT_FOUND,
          message: 'Report not found',
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
            message: 'Report updated',
            success: true,
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}

export const responseReport = async (reportId, stafId, data) => {
  try {
    const validationError = await validateResponse(data)
    if (validationError) {
      throw {
        code: BAD_REQUEST,
        message: validationError,
        success: false,
      }
    } else {
      const query = await responseQuery(reportId, stafId, data)
      if (query.notFound) {
        throw {
          code: NOT_FOUND,
          message: 'Report not found',
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
            message: 'Response success',
            success: true,
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}
