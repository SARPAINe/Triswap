import User from '../models/user.models'

const getUserAuthInfo = async (id: string) => {
  const user = await User.findByPk(id)
  return user
}

const createUser = async (username: string, password: string) => {
  const newUser = await User.create({
    username,
    password,
  })
  return newUser
}

const authDbServices = { getUserAuthInfo, createUser }

export { authDbServices }
