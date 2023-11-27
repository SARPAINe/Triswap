import { cryptoServices } from './crypto.services'
import { authDbServices } from './authDb.services'
import {
  BadRequestError,
  ForbiddenError,
  UnauthenticatedError,
} from '../errors'

import type User from '../models/user.models'
import { type ICreateUser, type IJwt } from '../interfaces'
import { emailServices } from './email.services'
import { tokenServices } from './token.services'

const createUser = async (
  user: ICreateUser,
): Promise<{ newUser: User; verificationToken: string }> => {
  const { password } = user
  const hashedPassword = await cryptoServices.hashPassword(password)
  user.password = hashedPassword

  const verificationToken = tokenServices.generateUuid()
  user.verificationToken = verificationToken

  const newUser = await authDbServices.createUser(user)
  await emailServices.sendVerificationEmail(newUser.email, verificationToken)
  return { newUser, verificationToken }
}

const loginUser = async (
  email: string,
  password: string,
): Promise<{ user: User; jwt: IJwt }> => {
  const user = await authDbServices.findUserByEmail(email)
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await cryptoServices.comparePassword(
    password,
    user.password,
  )
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  if (!user.isVerified) {
    throw new ForbiddenError('Email not verified')
  }

  const jwt = tokenServices.generateAccessToken(user)
  return { user, jwt }
}

const getUser = async (userId: string) => {
  const user = await authDbServices.findUserById(userId)
  return user
}

const verifyEmail = async (verificationToken: string) => {
  const user =
    await authDbServices.findUserByVerificationToken(verificationToken)
  if (!user) {
    throw new BadRequestError('Invalid token or user not found')
  }
  user.verificationToken = null
  user.isVerified = true

  await user.save()
}

const forgotPassword = async (email: string) => {
  const user = await authDbServices.findUserByEmail(email)
  if (!user) {
    throw new BadRequestError('Invalid email')
  }
  const passwordResetToken = tokenServices.generatePasswordResetToken(user)
  user.passwordResetToken = passwordResetToken
  await user.save()

  await emailServices.sendForgotPasswordEmail(user.email, passwordResetToken)

  return passwordResetToken
}

const resetPassword = async (
  passwordResetToken: string,
  newPassword: string,
) => {
  const { userId } =
    await tokenServices.verifyPasswordResetToken(passwordResetToken)
  const user = await authDbServices.findUserById(userId)
  if (!user) {
    throw new BadRequestError('user not found from auth service')
  }
  // check if the user has a password reset token, check and delete
  if (
    !user.passwordResetToken ||
    !(user.passwordResetToken === passwordResetToken)
  ) {
    throw new ForbiddenError('Password reset token has already been used')
  }
  user.passwordResetToken = null
  user.password = await cryptoServices.hashPassword(newPassword)
  await user.save()

  await emailServices.sendResetPasswordSuccessfulEmail(user.email)
}

export const authServices = {
  createUser,
  getUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
}
