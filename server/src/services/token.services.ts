import { CreateTokenDTO } from '../dto'
import { tokendbServices } from './db/tokendb.services'

const getAllTokens = async () => {
  const tokens = await tokendbServices.findAllTokens()
  return tokens
}

const getToken = async (tokenId: string) => {
  const token = await tokendbServices.findTokenById(tokenId)
  return token
}

const createToken = async (tokenObj: CreateTokenDTO) => {
  const newToken = await tokendbServices.createToken(tokenObj)
  return newToken
}

const createPair = async (tokenObj: object) => {
  const newToken = await tokendbServices.createPair(tokenObj)
  return newToken
}

export const tokenServices = {
  getAllTokens,
  createToken,
  createPair,
  getToken,
}
