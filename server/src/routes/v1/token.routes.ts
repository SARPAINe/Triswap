import { Router } from 'express'
import {
  createToken,
  getToken,
  getAllTokens,
  getTokenPairs,
  getTokenPair,
  createTokenPair,
} from '../../controllers/token.controllers'
import {
  isAuthenticated,
  isEmailVerified,
} from '../../middlewares/auth.middlewares'
import { validator } from '../../middlewares/validator.middleware'
import { createTokenPairSchema } from '../../validators/token.validators'

const router = Router()

router.use(isAuthenticated, isEmailVerified)
router.route('/').post(createToken)
router.route('/').get(getAllTokens)
router.route('/pair').get(getTokenPairs)
router.route('/pair/:id').get(getTokenPair)
router.route('/:id').get(getToken)
router
  .route('/pair')
  .post([validator('body', createTokenPairSchema)], createTokenPair)

export default router
