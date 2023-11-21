import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { authServices } from '../services/auth.services'
import { BadRequestError } from '../errors'

const registerUser: RequestHandler = async (req, res) => {
  const { username, email, password, role } = req.body

  const newUser = await authServices.createUser(username, email, password, role)

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
  res.send('Logged in successfully')
}

const loginUserv1: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email or password')
  }

  const isAuthenticated = await authServices.loginUser(email, password)

  res.status(StatusCodes.OK).json({
    msg: 'user logged in',
    isAuthenticated,
  })
}

const logoutUser: RequestHandler = async (req, res) => {
  req.logout(err => {
    if (err) {
      console.log(err)
      return res.status(500).send('Error during logout')
    }
    res.status(StatusCodes.OK).json({
      msg: 'user logged out',
    })
  })
}

export { registerUser, loginUser, logoutUser, getUser, loginUserv1 }
