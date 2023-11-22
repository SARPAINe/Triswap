import { ICreateUser } from '../interfaces'
import User from '../models/user.models'

const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email: email } })
  return user
}

const findUserById = async (userId: string) => {
  const user = await User.findByPk(userId)
  return user
}

const createUser = async (user: ICreateUser) => {
  const newUser = await User.create({
    ...user,
  })
  return newUser
}

const authDbServices = {
  createUser,
  findUserByEmail,
  findUserById,
}

export { authDbServices }
