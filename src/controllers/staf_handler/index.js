import {
  deleteStafs,
  getStafDatas,
  getStafList,
  getStafProfile,
  registerStaf,
  updateStafData,
  updateStafPassword,
} from '../../services/stafs/service/staf_service'
import { handleError } from '../../helpers/error'

export const deleteStafHandler = async (req, res) => {
  const {
    params: { stafId },
  } = req
  const query = await deleteStafs(stafId)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const getStafDetailHandler = async (req, res) => {
  const {
    params: { stafId },
  } = req
  const query = await getStafDatas(stafId)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const getStafProfileHandler = async (req, res) => {
  const { stafId } = req
  const query = await getStafProfile(stafId)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const getStafListHandler = async (req, res) => {
  const query = await getStafList(1)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const getAdminListHandler = async (req, res) => {
  const query = await getStafList(2)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const registerStafHandler = async (req, res) => {
  const { body } = req

  const query = await registerStaf(body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const updateStafDataHandler = async (req, res) => {
  const {
    params: { stafId },
    body,
  } = req
  const query = await updateStafData(stafId, body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const updateStafProfileHandler = async (req, res) => {
  const { stafId, body } = req
  const query = await updateStafData(stafId, body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const updateStafPasswordHandler = async (req, res) => {
  const { stafId, body } = req
  const query = await updateStafPassword(stafId, body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}
