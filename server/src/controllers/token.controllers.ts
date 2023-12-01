import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { tokenServices } from '../services/token.services'
import { CreateTokenDTO } from '../dto'
import User from '../models/user.models'

const createToken: RequestHandler = async (req, res) => {
  const { id: userId } = req.user as User
  const tokenObj: CreateTokenDTO = {
    ...req.body,
    userId,
  }
  const newToken = await tokenServices.createToken(tokenObj)

  const apiResponse = {
    success: true,
    message: 'New Token Created',
    data: newToken,
  }
  res.status(StatusCodes.CREATED).json(apiResponse)
}

const getAllTokens: RequestHandler = async (req, res) => {
  const tokens = await tokenServices.getAllTokens()

  const apiResponse = {
    success: true,
    message: 'Get all tokens',
    data: tokens,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getToken: RequestHandler = async (req, res) => {
  const { id: tokenId } = req.params
  const token = await tokenServices.getToken(tokenId)

  const apiResponse = {
    success: true,
    message: 'Get single tokens',
    data: token,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const createPair: RequestHandler = async (req, res) => {
  const newPair = await tokenServices.createPair(req.body)

  const apiResponse = {
    success: true,
    message: 'New Token pair Created',
    data: newPair,
  }
  res.status(StatusCodes.CREATED).json(apiResponse)
}

const getTokenPairs: RequestHandler = async (req, res) => {
  const apiResponse = {
    success: true,
    message: 'Get all token pairs',
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getTokenPair: RequestHandler = async (req, res) => {
  const apiResponse = {
    success: true,
    message: 'Get single token pair',
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

export {
  createToken,
  getAllTokens,
  getToken,
  getTokenPairs,
  getTokenPair,
  createPair,
}
