// import { ICreateUser } from '../../interfaces'
import { Transaction } from 'sequelize'
import User from '../../models/user.models'
import { UserRegisterUserDTO } from '../../dto'

const createUser = async (
  user: UserRegisterUserDTO,
  transaction?: Transaction,
) => {
  const newUser = await User.create(
    {
      ...user,
    },
    { transaction },
  )
  return newUser
}

const findAllUsers = async (): Promise<User[]> => {
  const users = await User.findAll()
  return users
}

const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email: email } })
  return user
}

const findUserById = async (userId: string) => {
  const user = await User.findByPk(userId)
  return user
}

export const userdbServices = {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
}
