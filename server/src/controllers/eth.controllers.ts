import { type RequestHandler } from 'express'
import ethServices from '../services/eth.services'
import { BadRequestError } from '../errors'
import { StatusCodes } from 'http-status-codes'

const getEthBalance: RequestHandler = async (req, res) => {
  const { privateKey } = req.body
  if (!privateKey) {
    throw new BadRequestError('Please provide private key')
  }
  const balanceInEth = await ethServices.getEthBalance(privateKey)

  res.json({
    msg: 'Get Ether balance',
    balanceInEth,
  })
}

const sendEth: RequestHandler = async (req, res) => {
  const { privateKey, value, to } = req.body
  if (!privateKey || !value || !to) {
    throw new BadRequestError('Please provide private key and value')
  }
  const transactionReceipt = await ethServices.sendEth(privateKey, value, to)
  res.status(StatusCodes.OK).json({
    msg: `transferred ${value} Ethers to ${to}`,
    transactionReceipt: transactionReceipt,
  })
}

export { getEthBalance, sendEth }
