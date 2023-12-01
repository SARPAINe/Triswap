import { Router } from 'express'
import {
  createPair,
  createToken,
  getToken,
  getAllTokens,
  getTokenPairs,
  getTokenPair,
} from '../../controllers/token.controllers'
import {
  isAuthenticated,
  isEmailVerified,
} from '../../middlewares/auth.middlewares'

const router = Router()

router.use(isAuthenticated, isEmailVerified)
router.route('/').post(createToken)
router.route('/').get(getAllTokens)
router.route('/:id').get(getToken)
router.route('/get-pair').get(getTokenPairs)
router.route('/get-pair/:tokenId').get(getTokenPair)
router.route('/create-pair').post(createPair)

export default router
