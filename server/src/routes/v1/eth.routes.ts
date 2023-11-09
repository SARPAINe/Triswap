import { Router } from 'express'
import { getEthBalance, sendEth } from '../../controllers/eth.controllers'

const router = Router()

router.route('/balance').get(getEthBalance)
router.route('/sendEth').get(sendEth)

export default router
