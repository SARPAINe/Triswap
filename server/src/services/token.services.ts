import { CreateTokenDTO, CreateTokenPairDTO } from '../dto'
import { BadRequestError } from '../errors'
import { tokendbServices } from './db/tokendb.services'

const getAllTokens = async () => {
  const tokens = await tokendbServices.findAllTokens()
  return tokens
}

const getToken = async (tokenId: string) => {
  // const token = await tokendbServices.findTokenById(tokenId)
  const token = await tokendbServices.findTokenByName(tokenId)
  return token
}

const createToken = async (tokenObj: CreateTokenDTO) => {
  const newToken = await tokendbServices.createToken(tokenObj)
  return newToken
}

const createTokenPair = async (tokenPairObj: CreateTokenPairDTO) => {
  // const tokenAData = await tokendbServices.findTokenById(tokenPairObj.tokenAId)
  // const tokenBData = await tokendbServices.findTokenById(tokenPairObj.tokenBId)
  const tokenAData = await tokendbServices.findTokenByName(tokenPairObj.tokenA)
  const tokenBData = await tokendbServices.findTokenByName(tokenPairObj.tokenB)
  if (!tokenAData) {
    throw new BadRequestError(`Token A not found. Id: ${tokenPairObj.tokenA}`)
  }
  if (!tokenBData) {
    throw new BadRequestError(`Token B not found. Id: ${tokenPairObj.tokenB}`)
  }

  const tokenPairObjWId = {
    userId: tokenPairObj.userId,
    tokenAId: tokenAData.id,
    tokenBId: tokenBData.id,
    pairAddress: tokenPairObj.pairAddress,
  }

  const newTokenPair = await tokendbServices.createTokenPair(tokenPairObjWId)
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
