import {
  registerUser,
  loginUser,
  loginStaf,
} from '../../services/authentication/service/auth_service'
import { handleError } from '../../helpers/error'

export const registerHandler = async (req, res) => {
  const { body } = req

  const query = await registerUser(body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const loginHandler = async (req, res) => {
  const { body } = req

  const query = await loginUser(body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}

export const loginStafHandler = async (req, res) => {
  const { body } = req

  const query = await loginStaf(body)
  if (query.success) {
    res.status(query.code).json(query)
  } else {
    handleError(query, res)
  }
}
