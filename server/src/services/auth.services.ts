import { cryptoServices } from './crypto.services'
import { userdbServices } from './db/userdb.services'
import { authdbServices } from './db/authdb.services'
import {
  BadRequestError,
  ForbiddenError,
  UnauthenticatedError,
  CustomAPIError,
} from '../errors'
import type User from '../models/user.models'
import { emailServices } from './email.services'
import { tokenServices } from './token.services'
import {
  AuthRegisterUserDTO,
  ChangePasswordDTO,
  LoginUserDTO,
  RegisterUserDTO,
} from '../dto'

import { ITokens, IUser } from '../interfaces'

const registerUser = async (
  userObj: RegisterUserDTO,
): Promise<{
  user: IUser
  verificationToken: string
}> => {
  const { password, ...userData } = userObj
  const hashedPassword = await cryptoServices.hashPassword(password)
  const verificationToken = tokenServices.generateUuid()
  const newUser = await userdbServices.createUser(userData)
  const authObj: AuthRegisterUserDTO = {
    userId: newUser.id,
    password: hashedPassword,
    verificationToken,
  }
  await authdbServices.createAuth(authObj)
  emailServices.sendVerificationEmail(newUser.email, verificationToken)

  const user = {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  }

  return { user, verificationToken }
}

const loginUser = async (
  loginObj: LoginUserDTO,
): Promise<{ user: User; tokens: ITokens }> => {
  const { email, password } = loginObj
  // check if user exists
  const user = await userdbServices.findUserByEmail(email)
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // check if password matches
  const authData = await authdbServices.findAuthByUserId(user.id)
  if (!authData) {
    throw new CustomAPIError(
      'something terrible happened. user data exists but no auth data',
    )
  }
  //
  const isPasswordCorrect = await cryptoServices.comparePassword(
    password,
    authData.password,
  )
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  // return access_token and refresh_token
  const tokens = tokenServices.generateTokens(user.id)
  authData.refreshToken = tokens.refresh.refresh_token
  await authData.save()

  return { user, tokens }
}

const verifyEmail = async (verificationToken: string) => {
  const authData =
    await authdbServices.findAuthByEmailVerificationToken(verificationToken)
  if (!authData) {
    throw new BadRequestError('Email already verified')
  }
  authData.verificationToken = null
  authData.isVerified = true

  await authData.save()
}

const changePassword = async (changePasswordObj: ChangePasswordDTO) => {
  const { userId, password, newPassword } = changePasswordObj

  const authData = await authdbServices.findAuthByUserId(userId)
  if (!authData) {
    throw new BadRequestError('Auth data not found')
  }
  const isPasswordCorrect = await cryptoServices.comparePassword(
    password,
    authData.password,
  )
  if (!isPasswordCorrect) {
    throw new BadRequestError('Invalid credentials, password did not match')
  }

  const newPasswordHash = await cryptoServices.hashPassword(newPassword)
  authData.password = newPasswordHash
  authData.refreshToken = null
  await authData.save()
}

const forgotPassword = async (email: string) => {
  const user = await userdbServices.findUserByEmail(email)
  if (!user) {
    throw new BadRequestError('Invalid email')
  }

  const authData = await authdbServices.findAuthByUserId(user.id)

  if (!authData) {
    throw new CustomAPIError(
      'something terrible happened. user data exists but no auth data',
    )
  }
  const passwordResetToken = tokenServices.generatePasswordResetToken(user.id)
  authData.passwordResetToken = passwordResetToken
  await authData.save()
  emailServices.sendForgotPasswordEmail(user.email, passwordResetToken)
  return passwordResetToken
}

const resetPassword = async (
  passwordResetToken: string,
  newPassword: string,
) => {
  const { userId } =
    await tokenServices.verifyPasswordResetToken(passwordResetToken)

  const user = await userdbServices.findUserById(userId)

  if (!user) {
    throw new BadRequestError('user not found from auth service')
  }
  // get auth data check if the user has a password reset token, check and delete
  const authData = await authdbServices.findAuthByUserId(user.id)

  if (!authData) {
    throw new CustomAPIError('Auth data does not exist')
  }

  if (
    !authData.passwordResetToken ||
    !(authData.passwordResetToken === passwordResetToken)
  ) {
    throw new ForbiddenError('Password reset token has already been used')
  }
  authData.passwordResetToken = null
  authData.password = await cryptoServices.hashPassword(newPassword)
  await authData.save()
  emailServices.sendResetPasswordSuccessfulEmail(user.email)
}

const refresh = async (refreshToken: string) => {
  const { userId } = await tokenServices.verifyRefreshToken(refreshToken) // token is verified
  const authData = await authdbServices.findAuthByUserId(userId)
  if (!authData) {
    throw new BadRequestError('Auth data not found')
  }

  if (refreshToken !== authData.refreshToken) {
    throw new BadRequestError('Old refresh token reuse')
  }

  const tokens = tokenServices.generateTokens(userId)
  authData.refreshToken = tokens.refresh.refresh_token
  await authData.save()

  return tokens
}

export const authServices = {
  registerUser,
  loginUser,
  verifyEmail,
  changePassword,
  forgotPassword,
  resetPassword,
  refresh,
}
