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
  LoginUserDTO,
  RegisterUserDTO,
  UserRegisterUserDTO,
} from '../dto'

import { ITokens, IUser } from '../interfaces'

const createUser = async (
  userObj: RegisterUserDTO,
): Promise<{
  user: IUser
  verificationToken: string
}> => {
  const { email, username, password } = userObj
  const userData: UserRegisterUserDTO = { email, username }

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
    username: newUser.username,
    email: newUser.email,
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

  // check if email is verified
  if (!authData.isVerified) {
    throw new ForbiddenError('Email not verified')
  }

  // return access_token and refresh_token
  const tokens = tokenServices.generateTokens(user)
  authData.refreshToken = tokens.refresh.refresh_token
  await authData.save()

  return { user, tokens }
}

const verifyEmail = async (verificationToken: string) => {
  const authData =
    await authdbServices.findAuthByVerificationToken(verificationToken)
  if (!authData) {
    throw new BadRequestError('Invalid token. auth data not found')
  }
  authData.verificationToken = null
  authData.isVerified = true

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
  const passwordResetToken = tokenServices.generatePasswordResetToken(user)
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

export const authServices = {
  createUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
}
