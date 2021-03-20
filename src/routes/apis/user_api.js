import express from 'express'
import {
  userListHandler,
  detailUserHandler,
  updateUserHandler,
  profileUserHandler,
  deleteUserHandler,
  updatePasswordHandler,
} from '../../controllers/user_handler'
import {
  verifyToken,
  authenticateUser,
  authenticateStaf,
} from '../../auth/jwt_auth_instance'

const router = express.Router()

router.get('/list', verifyToken, authenticateStaf, userListHandler)
router.get('/profile-users', verifyToken, authenticateUser, profileUserHandler)
router.get('/detail/:userId', verifyToken, authenticateStaf, detailUserHandler)
router.put('/update-profile', verifyToken, authenticateUser, updateUserHandler)
router.put(
  '/update-password',
  verifyToken,
  authenticateUser,
  updatePasswordHandler
)
router.delete(
  '/delete-user/:userId',
  verifyToken,
  authenticateStaf,
  deleteUserHandler
)

export { router }
