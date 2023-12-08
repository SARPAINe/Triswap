import { CreateTokenDTO, CreateTokenPairWIdDTO } from '../../dto'
import { Op } from 'sequelize'
import Token from '../../models/token.models'
import TokenPair from '../../models/tokenPair.models'
import { BadRequestError } from '../../errors'

const createToken = async (tokenObj: CreateTokenDTO) => {
  const newToken = await Token.create({
    ...tokenObj,
  })
  return newToken
}

const createTokenPair = async (tokenPairObj: CreateTokenPairWIdDTO) => {
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

const getTokenPair = async (tokenName: string) => {
  const tokenData = await findTokenByName(tokenName)
  if (!tokenData) {
    throw new BadRequestError('Token not found')
  }
  const tokenPairData = await TokenPair.findAll({
    where: {
      [Op.or]: [{ tokenAId: tokenData.id }, { tokenBId: tokenData.id }],
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

  const formattedTokenPairs = tokenPairData.map(pair => {
    const isLTCInTokenA = pair.tokenA.token === tokenName // jodi tokenA LTC hoy
    console.log(pair)
    return {
      id: pair.id,
      pairAddress: pair.pairAddress,
      // userId: pair.userId,
      token: isLTCInTokenA ? pair.tokenB : pair.tokenA,
    }
    // id: pair.id,
    // tokenA: { name: pair.tokenA.token, address: pair.tokenA.address },
    // tokenB: { name: pair.tokenB.token, address: pair.tokenB.address },
    // pairAddress: pair.pairAddress,
  })

  console.log(formattedTokenPairs)

  return formattedTokenPairs
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
  const token = await Token.findByPk(tokenId, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return token
}

const findTokenByName = async (tokenName: string) => {
  const token = await Token.findOne({
    where: {
      token: tokenName,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return token
}

export const tokendbServices = {
  findAllTokens,
  findTokenById,
  findTokenByName,
  createToken,
  createTokenPair,
  getTokenPairs,
  getTokenPair,
}
