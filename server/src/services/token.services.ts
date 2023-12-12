import { CreateTokenPairDTO } from '../dto'
import { tokendbServices } from './db/tokendb.services'

const getAllTokens = async () => {
  const tokens = await tokendbServices.findAllTokens()
  return tokens
}

const getToken = async (tokenId: string) => {
  const token = await tokendbServices.findTokenByName(tokenId)
  return token
}

const createTokenPair = async (tokenPairObj: CreateTokenPairDTO) => {
  const newTokenPair = await tokendbServices.createTokenPair(tokenPairObj)

  return newTokenPair
}

const getAllTokenPairs = async () => {
  const tokenPairsData = await tokendbServices.getTokenPairs()
  return tokenPairsData
}

const getTokenPair = async (tokenId: string) => {
  const tokenPairData = await tokendbServices.getTokenPair(tokenId)
  return tokenPairData
}

export const tokenServices = {
  getAllTokens,
  createTokenPair,
  getToken,
  getAllTokenPairs,
  getTokenPair,
}
