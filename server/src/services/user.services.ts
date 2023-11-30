import type User from '../models/user.models'
import { userdbServices } from './db/userdb.services'

const getAllUsers = async () => {
  return userdbServices.findAllUsers()
}

const getSingleUser = async (userId: string) => {
  return userdbServices.findUserById(userId)
}

const getMe = async (userObj: User) => {
  return userObj
}

export const userServices = {
  getAllUsers,
  getSingleUser,
  getMe,
}
