import { Router } from 'express'
import { getBalance } from '../../controllers/token.controllers'

const router = Router()

router.route('/balance').get(getBalance)

export default router
