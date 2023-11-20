import { cryptoServices } from './crypto.services'
import { authDbServices } from './dbAuth.services'

const createUser = async (username: string, password: string) => {
  const hashedPassword = await cryptoServices.hashPassword(password)
  const newUser = await authDbServices.createUser(username, hashedPassword)
  return newUser
}

const getUserAuthInfo = async (userId: string) => {
  const result = await authDbServices.getUserAuthInfo(userId)
  return result
}

const authServices = { createUser, getUserAuthInfo }

export { authServices }
