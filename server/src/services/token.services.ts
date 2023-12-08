import { CreateTokenDTO, CreateTokenPairDTO } from '../dto'
import { BadRequestError } from '../errors'
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

const createTokenPair = async (tokenPairObj: CreateTokenPairDTO) => {
  const tokenAData = await tokendbServices.findTokenById(tokenPairObj.tokenAId)
  const tokenBData = await tokendbServices.findTokenById(tokenPairObj.tokenBId)
  if (!tokenAData) {
    throw new BadRequestError(`Token A not found. Id: ${tokenPairObj.tokenAId}`)
  }
  if (!tokenBData) {
    throw new BadRequestError(`Token B not found. Id: ${tokenPairObj.tokenBId}`)
  }

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
  createToken,
  createTokenPair,
  getToken,
  getAllTokenPairs,
  getTokenPair,
}
