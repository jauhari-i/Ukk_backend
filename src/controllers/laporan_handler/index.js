import {
  listAllReport,
  validateReport,
  updateReport,
  responseReport,
  listUserReport,
  deleteReportAdmin,
  addReport,
  deleteReportUser,
  detailReport,
} from '../../services/laporan/service/laporan_service'
import { handleError } from '../../helpers/error'

export const addReportHandler = async (req, res) => {
  const { body, userId } = req

  const query = await addReport(userId, body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const listAllReportHandler = async (req, res) => {
  const query = await listAllReport()
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const validateReportHandler = async (req, res) => {
  const {
    params: { reportId, status },
    stafId,
  } = req
  const query = await validateReport(reportId, status, stafId)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const updateReportHandler = async (req, res) => {
  const {
    userId,
    params: { reportId },
    body,
  } = req
  const query = await updateReport(reportId, userId, body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const responseReportHandler = async (req, res) => {
  const {
    stafId,
    params: { reportId },
    body,
  } = req
  const query = await responseReport(reportId, stafId, body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const listUserReportHandler = async (req, res) => {
  const { userId } = req
  const query = await listUserReport(userId)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const deleteReportAdminHandler = async (req, res) => {
  const {
    params: { reportId },
  } = req
  const query = await deleteReportAdmin(reportId)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const deleteReportUserHandler = async (req, res) => {
  const {
    userId,
    params: { reportId },
  } = req
  const query = await deleteReportUser(userId, reportId)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const detailReportHandler = async (req, res) => {
  const {
    params: { reportId },
  } = req

  const query = await detailReport(reportId)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}
