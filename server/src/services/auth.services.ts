import { cryptoServices } from './crypto.services'
import { authDbServices } from './authDb.services'
import { UnauthenticatedError } from '../errors'

const createUser = async (
  username: string,
  email: string,
  password: string,
  role: string,
) => {
  const hashedPassword = await cryptoServices.hashPassword(password)
  const newUser = await authDbServices.createUser(
    username,
    email,
    hashedPassword,
    role,
  )
  return newUser
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
  return { user, isPasswordCorrect }
}

const getUserAuthInfo = async (userId: string) => {
  const result = await authDbServices.getUserAuthInfo(userId)
  return result
}

const authServices = { createUser, getUserAuthInfo, loginUser }

export { authServices }
