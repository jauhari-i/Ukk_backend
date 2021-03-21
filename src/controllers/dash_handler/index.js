import { getDashboard } from '../../services/dashboard/service/dash_service'
import { handleError } from '../../helpers/error'

export const dashboardHandler = async (req, res) => {
  const query = await getDashboard()
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}
