import { listAllQuery } from '../query/laporan_query'
import { OK } from 'http-status'

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
