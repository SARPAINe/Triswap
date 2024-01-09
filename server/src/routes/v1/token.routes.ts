import { Router } from 'express'
import {
  getToken,
  getAllTokens,
  getTokenPairs,
  getTokenPair,
  createTokenPair,
  createToken,
  getTokenByName,
  checkTokenExistence,
} from '../../controllers/token.controllers'
import { isAdmin, isAuthenticated } from '../../middlewares/auth.middlewares'
import { validator } from '../../middlewares/validator.middleware'
import {
  createTokenPairSchema,
  createTokenSchema,
} from '../../validators/token.validators'

const router = Router()

// router.use([isAuthenticated])

router.route('/').get(getAllTokens)
router
  .route('/')
  .post(
    [isAuthenticated, isAdmin, validator('body', createTokenSchema)],
    createToken,
  )
router.route('/pair').get(getTokenPairs)
router.route('/pair/:id').get(getTokenPair)
router.route('/existence').get(checkTokenExistence)
router.route('/:id').get(getToken)
router.route('/name/:name').get(getTokenByName)
router
  .route('/pair')
  .post(
    [isAuthenticated, isAdmin, validator('body', createTokenPairSchema)],
    createTokenPair,
  )

export default router
