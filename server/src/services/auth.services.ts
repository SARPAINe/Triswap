import { cryptoServices } from './crypto.services'
import { authDbServices } from './authDb.services'
import { UnauthenticatedError } from '../errors'
import jwt from 'jsonwebtoken'
import type User from '../models/user.models'
import { type ICreateUser, type IJwt } from '../interfaces'
import config from '../config'

const createUser = async (
  user: ICreateUser,
): Promise<{ newUser: User; jwt: IJwt }> => {
  const { password } = user
  const hashedPassword = await cryptoServices.hashPassword(password)
  user.password = hashedPassword
  const newUser = await authDbServices.createUser(user)
  const jwt = issueJwt(newUser)
  return { newUser, jwt }
}

const loginUser = async (email: string, password: string) => {
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

  const jwt = issueJwt(user)
  return { user, jwt }
}

const getUser = async (userId: string) => {
  const user = await authDbServices.findUserById(userId)
  return user
}

const issueJwt = (user: User) => {
  const id = user.id
  const expiresIn = '1d'
  const payload = {
    sub: id,
    iat: Date.now(),
  }
  const signedToken = jwt.sign(payload, config.jwt.secret, { expiresIn })

  return {
    token: 'Bearer ' + signedToken,
    expiresIn,
  }
}

const authServices = { createUser, getUser, loginUser }

export { authServices }
