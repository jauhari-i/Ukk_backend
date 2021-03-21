import {
  excelUser,
  excelStaf,
  excelReport,
  pdfUser,
} from '../../services/documents/service/doc_service'
import { handleError } from '../../helpers/error'

export const excelUserHandler = async (req, res) => {
  const query = await excelUser()
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const excelStafHandler = async (req, res) => {
  const query = await excelStaf()
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const excelReportHandler = async (req, res) => {
  const query = await excelReport()
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const pdfUserHandler = async (req, res) => {
  const query = await pdfUser()
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}
