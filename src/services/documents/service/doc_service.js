import { INTERNAL_SERVER_ERROR, OK } from 'http-status'
import {
  excelUserQuery,
  excelStafQuery,
  excelLaporanQuery,
  pdfUserQuery,
} from '../query/doc_query'

export const excelUser = async () => {
  try {
    const query = await excelUserQuery()
    if (!query.error) {
      return {
        code: OK,
        message: 'Generate excel user success',
        success: true,
        url: query.file.secure_url,
      }
    } else {
      throw {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        success: false,
      }
    }
  } catch (error) {
    return error
  }
}

export const excelStaf = async () => {
  try {
    const query = await excelStafQuery()
    if (!query.error) {
      return {
        code: OK,
        message: 'Generate excel staf success',
        success: true,
        url: query.file.secure_url,
      }
    } else {
      throw {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        success: false,
      }
    }
  } catch (error) {
    return error
  }
}

export const excelReport = async () => {
  try {
    const query = await excelLaporanQuery()
    if (!query.error) {
      return {
        code: OK,
        message: 'Generate excel report success',
        success: true,
        url: query.file.secure_url,
      }
    } else {
      throw {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        success: false,
      }
    }
  } catch (error) {
    return error
  }
}

export const pdfUser = async () => {
  try {
    const query = await pdfUserQuery()
    if (!query.error) {
      return {
        code: OK,
        message: 'Generate pdf user success',
        success: true,
        url: query.url,
      }
    } else {
      throw {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        success: false,
      }
    }
  } catch (error) {
    return error
  }
}
