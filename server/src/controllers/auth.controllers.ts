import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { authServices } from '../services/auth.services'

const registerUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body

  const newUser = await authServices.createUser(username, password)

  res.status(StatusCodes.CREATED).json({
    msg: 'user registered',
    newUser,
  })
}

const getUser: RequestHandler = async (req, res) => {
  const { userId } = req.params
  const userAuthInfo = await authServices.getUserAuthInfo(userId)
  res.status(StatusCodes.OK).json({
    msg: 'user logged in',
    userAuthInfo,
  })
}

const loginUser: RequestHandler = async (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: 'user logged in',
  })
}

const logoutUser: RequestHandler = async (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: 'user logged out',
  })
}

export { registerUser, loginUser, logoutUser, getUser }
