import express from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from '../../controllers/auth.controllers'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/user/:userId').get(getUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)

export default router
