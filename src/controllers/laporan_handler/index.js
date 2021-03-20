import { listAllReport } from '../../services/laporan/service/laporan_service'
import { handleError } from '../../helpers/error'

export const listAllReportHandler = async (req, res) => {
  const query = await listAllReport()
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}
