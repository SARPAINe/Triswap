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

const findUserByVerificationToken = async (verificationToken: string) => {
  const user = await User.findOne({ where: { verificationToken } })
  return user
}

const findUserByPasswordResetToken = async (passwordResetToken: string) => {
  const user = await User.findOne({ where: { passwordResetToken } })
  return user
}

const createUser = async (user: ICreateUser) => {
  const newUser = await User.create({
    ...user,
  })
  return newUser
}

export const authDbServices = {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByVerificationToken,
  findUserByPasswordResetToken,
}
