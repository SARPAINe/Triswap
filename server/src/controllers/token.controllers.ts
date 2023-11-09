import { RequestHandler } from 'express'
import { connectBC } from '../utils/evm'
import { toObject } from '../utils/bigInt'
import { StatusCodes } from 'http-status-codes'

const getBalance: RequestHandler = async (req, res, next) => {
  res.status(StatusCodes.OK).json({
    msg: 'get erc 20 token balance',
  })
}

export { getBalance }
