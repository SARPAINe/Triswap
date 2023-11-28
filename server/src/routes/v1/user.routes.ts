import { Router } from 'express'
import {
  getAllUsers,
  getUser,
  getMe,
  updateMe,
} from '../../controllers/user.controllers'
import { isAdmin, isAuthenticated } from '../../middlewares/auth.middlewares'

const router = Router()

router.use(isAuthenticated)

router.route('/').get([isAdmin], getAllUsers)
router.route('/get-me').get(getMe)
router.route('/update-me').get(updateMe)
router.route('/:id').get([isAdmin], getUser) // should be at the end or matches other routes

export default router
