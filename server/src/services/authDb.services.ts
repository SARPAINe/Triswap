import CustomAPIError from '../errors/CustomError.error'
import User from '../models/user.models'

const getUserAuthInfo = async (id: string) => {
  const user = await User.findByPk(id)
  return user
}

const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email: email } })
  return user
}

const findUserById = async (userId: string) => {
  const user = await User.findByPk(userId)
  return user
}

const createUser = async (
  username: string,
  email: string,
  password: string,
  role: string,
) => {
  try {
    const newUser = await User.create({
      username,
      email,
      password,
      role,
    })
    return newUser
  } catch (err) {
    throw new CustomAPIError('user creation failed')
  }
}

const authDbServices = {
  getUserAuthInfo,
  createUser,
  findUserByEmail,
  findUserById,
}

export { authDbServices }
