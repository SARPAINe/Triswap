import { Router } from 'express'
import { getAllUsers, getUser, getMe } from '../../controllers/user.controllers'
import { isAdmin, isAuthenticated } from '../../middlewares/auth.middlewares'

const router = Router()
router.use(isAuthenticated)
router.route('/').get([isAdmin], getAllUsers)
router.route('/getme').get(getMe)
router.route('/:id').get([isAdmin], getUser)

export default router
