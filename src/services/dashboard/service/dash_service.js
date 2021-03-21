import { dashboardQuery } from '../query/dash_query'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status'

export const getDashboard = async () => {
  try {
    const query = await dashboardQuery()
    if (!query) {
      throw {
        code: INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        success: false,
      }
    } else {
      return {
        code: OK,
        message: 'Get dashboard success',
        success: true,
        data: query,
      }
    }
  } catch (error) {
    return error
  }
}
