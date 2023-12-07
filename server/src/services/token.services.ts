import jwt, { JwtPayload } from 'jsonwebtoken'
import { v4 as uuidV4 } from 'uuid'
import { config } from '../config'
// import User from '../models/user.models'
import { BadRequestError } from '../errors'
import { ITokens } from '../interfaces'

const generateTokens = (userId: string): ITokens => {
  const accessToken = generateAccessToken(userId)
  const refreshToken = generateRefreshToken(userId)
  const tokens: ITokens = {
    access: {
      ...accessToken,
    },
    refresh: {
      ...refreshToken,
    },
  }
  return tokens
}

const generateRefreshToken = (userId: string) => {
  const payload = {
    sub: userId,
    iat: Date.now(),
  }
  const expiresIn = config.jwt.refresh_token.expiresIn
  console.log(expiresIn)
  const signedToken = jwt.sign(payload, config.jwt.refresh_token.secret, {
    expiresIn,
  })

  return {
    refresh_token: signedToken,
    expires: new Date(Date.now() + expiresIn * 1000).toISOString(),
  }
}

const generateAccessToken = (userId: string) => {
  const payload = {
    sub: userId,
    iat: Date.now(),
  }
  const expiresIn = config.jwt.access_token.expiresIn
  console.log(expiresIn)
  const signedToken = jwt.sign(payload, config.jwt.access_token.secret, {
    expiresIn,
  })
  return {
    access_token: signedToken,
    expires: new Date(Date.now() + expiresIn * 1000).toISOString(),
  }
}

const generatePasswordResetToken = (userId: string) => {
  const payload = {
    sub: userId,
  }
  const expiresIn = config.jwt.passwordResetTokenExpiresIn
  const signedToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn,
  })
  return signedToken
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
