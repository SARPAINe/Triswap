import { CreateTokenPairDTO } from '../dto'
import { tokenRepository } from '../repository/token.repository'

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

export const tokenServices = {
  getAllTokens,
  createTokenPair,
  getToken,
  getAllTokenPairs,
  getTokenPair,
}
