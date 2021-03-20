import {
  userList,
  userData,
  userProfile,
  updateProfile,
  deleteUsers,
  updatePassword,
} from '../../services/users/service/user_service'
import { handleError } from '../../helpers/error'

export const userListHandler = async (req, res) => {
  const query = await userList()
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const detailUserHandler = async (req, res) => {
  const {
    params: { userId },
  } = req
  const query = await userData(userId)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const profileUserHandler = async (req, res) => {
  const { userId } = req
  const query = await userProfile(userId)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const updateUserHandler = async (req, res) => {
  const { userId, body } = req

  const query = await updateProfile(userId, body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const updatePasswordHandler = async (req, res) => {
  const { userId, body } = req

  const query = await updatePassword(userId, body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const deleteUserHandler = async (req, res) => {
  const {
    params: { userId },
  } = req

  const query = await deleteUsers(userId)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}
