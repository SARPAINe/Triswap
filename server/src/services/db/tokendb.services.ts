import { CreateTokenDTO, CreateTokenPairDTO } from '../../dto'
import Token from '../../models/token.models'
import TokenPair from '../../models/tokenPair.models'
import { Op } from 'sequelize'

const createToken = async (tokenObj: CreateTokenDTO) => {
  const newToken = await Token.create({
    ...tokenObj,
  })
  return newToken
}

const createTokenPair = async (tokenPairObj: CreateTokenPairDTO) => {
  const newTokenPair = await TokenPair.create({ ...tokenPairObj })
  return newTokenPair
}

const getTokenPairs = async () => {
  const tokenPairData = await TokenPair.findAll({
    attributes: ['id', 'tokenAId', 'tokenBId', 'pairAddress', 'userId'],
    include: [
      {
        model: Token,
        as: 'tokenA',
        attributes: ['token', 'address'],
      },
      {
        model: Token,
        as: 'tokenB',
        attributes: ['token', 'address'],
      },
    ],
  })

  const formattedTokenPairs = tokenPairData.map(pair => ({
    id: pair.id,
    tokenA: { name: pair.tokenA.token, address: pair.tokenA.address },
    tokenB: { name: pair.tokenB.token, address: pair.tokenB.address },
    pairAddress: pair.pairAddress,
  }))

  return formattedTokenPairs
}

const getTokenPair = async (tokenId: string) => {
  const tokenPairData = await TokenPair.findAll({
    where: {
      [Op.or]: [{ tokenAId: tokenId }, { tokenBId: tokenId }],
    },
    include: [
      {
        model: Token,
        as: 'tokenA',
        attributes: ['token', 'address'],
      },
      {
        model: Token,
        as: 'tokenB',
        attributes: ['token', 'address'],
      },
    ],
    attributes: {
      exclude: ['tokenAId', 'tokenBId', 'createdAt', 'updatedAt'],
    },
  })

  return tokenPairData
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
  createTokenPair,
  getTokenPairs,
  getTokenPair,
}
