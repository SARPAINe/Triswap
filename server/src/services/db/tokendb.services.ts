import { CreateTokenDTO } from '../../dto'
import Token from '../../models/token.models'

const createToken = async (tokenObj: CreateTokenDTO) => {
  const newToken = await Token.create({
    ...tokenObj,
  })
  return newToken
}

const createPair = async (tokenObj: object) => {
  console.log(tokenObj)
  return tokenObj
}

const findAllTokens = async () => {
  const tokens = await Token.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return tokens
}

const findTokenById = async (tokenId: string) => {
  const tokens = await Token.findByPk(tokenId, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return tokens
}

export const tokendbServices = {
  findAllTokens,
  findTokenById,
  createToken,
  createPair,
}
