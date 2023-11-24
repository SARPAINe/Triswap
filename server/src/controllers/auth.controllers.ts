import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { authServices } from '../services/auth.services'
import { BadRequestError, NotFoundError } from '../errors'
import type User from '../models/user.models'
import { type IJwt, type IUserTokenResponse } from '../interfaces'

const registerUser: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body

  const userObj = { username, email, password }
  const { newUser } = await authServices.createUser(userObj)

  const apiResponse = {
    success: true,
    message: 'User has been successfully registered. Please verify your email.',
    data: buildUserResponse(newUser),
  }
  res.status(StatusCodes.CREATED).json(apiResponse)
}

const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email or password')
  }

  const { user, jwt } = await authServices.loginUser(email, password)

  const apiResponse = {
    success: true,
    message: 'user has been successfully registered',
    data: buildUserResponse(user, jwt),
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const logoutUser: RequestHandler = async (req, res) => {
  const apiResponse = {
    success: true,
    message: 'user has been successfully logged out',
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getUser: RequestHandler = async (req, res) => {
  const { userId } = req.params
  const user = await authServices.getUser(userId)
  if (!user) {
    throw new NotFoundError('user not found')
  }
  const apiResponse = {
    success: true,
    message: 'user data has been successfully retrieved',
    data: buildUserResponse(user),
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const verifyUserEmail: RequestHandler = async (req, res) => {
  const verificationToken = req.query.token as string
  if (!verificationToken) {
    throw new BadRequestError('Token not provided')
  }
  await authServices.verifyEmail(verificationToken)
  const apiResponse = {
    success: true,
    message: 'Email verified Successfully',
    verificationToken,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const forgotUserPassword: RequestHandler = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequestError('Please provide email')
  }
  const passwordResetToken = await authServices.forgotPassword(email)

  const apiResponse = {
    success: true,
    message: 'Password rest token has been sent to email',
    passwordResetToken,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const resetUserPassword: RequestHandler = async (req, res) => {
  const passwordResetToken = req.query.token as string
  const { newPassword } = req.body

  await authServices.resetPassword(passwordResetToken, newPassword as string)

  const apiResponse = {
    success: true,
    message: 'Password reset successful. Please log in with new password',
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const buildUserResponse = (user: User, token?: IJwt): IUserTokenResponse => {
  const userResponse = {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  }
  if (token) {
    return {
      ...userResponse,
      token: token.token,
      expiresIn: token.expiresIn,
    }
  }

  return userResponse
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  verifyUserEmail,
  forgotUserPassword,
  resetUserPassword,
}
