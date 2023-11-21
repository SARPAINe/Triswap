import express from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from '../../controllers/auth.controllers'
import passport from 'passport'
import { isAuthenticated, isAdmin } from '../../middlewares/auth.middlewares'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/user/:userId').get([isAuthenticated, isAdmin], getUser) // this is protected
router
  .route('/login')
  .post(
    passport.authenticate('local', { failureRedirect: '/login-failure' }),
    loginUser,
  )

// this is not needed
router.route('/login-failure').get((req, res) => {
  res.send('log in failed')
})

router.route('/logout').get(logoutUser)

export default router
