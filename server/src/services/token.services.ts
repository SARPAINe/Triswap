import { CreateTokenDTO, CreateTokenPairDTO } from '../dto'
import { tokenRepository } from '../repository/token.repository'

const createToken = async (tokenObj: CreateTokenDTO) => {
  const newToken = await tokenRepository.createToken(tokenObj)
  return newToken
}

const getAllTokens = async () => {
  const tokens = await tokenRepository.findAllTokens()
  return tokens
}

const getToken = async (tokenId: string) => {
  const token = await tokenRepository.findTokenByName(tokenId)
  return token
}

const createTokenPair = async (tokenPairObj: CreateTokenPairDTO) => {
  const newTokenPair = await tokenRepository.createTokenPair(tokenPairObj)
  return newTokenPair
}

const getAllTokenPairs = async () => {
  const tokenPairsData = await tokenRepository.getTokenPairs()
  return tokenPairsData
}

const getTokenPair = async (tokenId: string) => {
  const tokenPairData = await tokenRepository.getTokenPair(tokenId)
  return tokenPairData
}

const getTokenPrices = async () => {
  // call coin gekko every 10 secs
  // send response to client side
}

export const tokenServices = {
  getAllTokens,
  createTokenPair,
  getToken,
  getAllTokenPairs,
  getTokenPair,
  getTokenPrices,
  createToken,
}
