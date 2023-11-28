import express from 'express'
import {
  registerUser,
  loginUser,
  verifyUserEmail,
  forgotUserPassword,
  resetUserPassword,
} from '../../controllers/auth.controllers'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/verify').get(verifyUserEmail)
router.route('/login').post(loginUser)
router.route('/forgot-password').post(forgotUserPassword)
router.route('/reset-password').post(resetUserPassword)

export default router
