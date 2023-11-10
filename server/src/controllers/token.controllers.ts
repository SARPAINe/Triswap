import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

const getBalance: RequestHandler = async (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: 'get erc 20 token balance',
  })
}

export { getBalance }
