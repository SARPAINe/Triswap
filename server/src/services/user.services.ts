import { IUser } from '../interfaces'
import type User from '../models/user.models'
import { userdbServices } from './db/userdb.services'

const getAllUsers = async () => {
  return userdbServices.findAllUsers()
}

const getSingleUser = async (userId: string) => {
  return userdbServices.findUserById(userId)
}

const getMe = async (userObj: User) => {
  const user: IUser = {
    id: userObj.id,
    username: userObj.username,
    email: userObj.email,
  }
  return user
}

export const userServices = {
  getAllUsers,
  getSingleUser,
  getMe,
}
