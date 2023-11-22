import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { authServices } from '../services/auth.services'
import { BadRequestError } from '../errors'
import { issueJwt } from '../utils'

const registerUser: RequestHandler = async (req, res) => {
  const { username, email, password, role } = req.body
  const newUser = await authServices.createUser(username, email, password, role)
  const jwt = issueJwt(newUser)

  res.status(StatusCodes.CREATED).json({
    msg: 'user registered',
    newUser,
    token: jwt.token,
    expiresIn: jwt.expiresIn,
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
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email or password')
  }

  const { user } = await authServices.loginUser(email, password)
  const jwt = issueJwt(user)

  res.status(StatusCodes.OK).json({
    msg: 'user logged in',
    token: jwt.token,
    expiresIn: jwt.expiresIn,
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

export { registerUser, loginUser, logoutUser, getUser }
