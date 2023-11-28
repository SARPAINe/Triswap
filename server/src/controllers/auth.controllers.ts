import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { authServices } from '../services/auth.services'
import { BadRequestError } from '../errors'
import { LoginUserDTO, RegisterUserDTO } from '../dto'

const registerUser: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body
  const userObj: RegisterUserDTO = { username, email, password }
  const { user, verificationToken } = await authServices.createUser(userObj)

  const apiResponse = {
    success: true,
    message: 'User has been successfully registered. Please verify your email.',
    data: { user, verificationToken },
  }
  res.status(StatusCodes.CREATED).json(apiResponse)
}

const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email or password')
  }
  const loginObj: LoginUserDTO = { email, password }
  const { user, tokens } = await authServices.loginUser(loginObj)

  const apiResponse = {
    success: true,
    message: 'user has been successfully registered',
    data: { user, tokens },
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
    message: 'Email verified successfully',
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

const changeUserPassword: RequestHandler = async (req, res) => {
  const apiResponse = {
    success: true,
    message: 'Password changed, please login with new password.',
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const refresh: RequestHandler = async () => {
  // check if the token is blacklisted
  // verify refresh token
  // generate access token
}

export {
  registerUser,
  loginUser,
  verifyUserEmail,
  forgotUserPassword,
  resetUserPassword,
  changeUserPassword,
  refresh,
}
