import express from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from '../../controllers/auth.controllers'

import { isAdmin, isAuthenticated } from '../../middlewares/auth.middlewares'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)

// protected route
router.route('/user/:userId').get(isAuthenticated, isAdmin, getUser)

export default router
