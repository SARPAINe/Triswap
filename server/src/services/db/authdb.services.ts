import { Transaction } from 'sequelize'

import Auth from '../../models/auth.models'
import { AuthRegisterUserDTO } from '../../dto'

const createAuth = async (
  authObj: AuthRegisterUserDTO,
  transaction?: Transaction,
) => {
  const newAuth = await Auth.create(
    {
      ...authObj,
    },
    { transaction },
  )
  return newAuth
}

const findAuthByUserId = async (userId: string) => {
  const authData = await Auth.findOne({
    where: {
      userId: userId,
    },
  })
  return authData
}

const findAuthByVerificationToken = async (verificationToken: string) => {
  const authData = await Auth.findOne({ where: { verificationToken } })
  return authData
}

export const authdbServices = {
  createAuth,
  findAuthByUserId,
  findAuthByVerificationToken,
}
