import jwt, { JwtPayload } from 'jsonwebtoken'
import { v4 as uuidV4 } from 'uuid'
import { config } from '../config'
import User from '../models/user.models'
import { BadRequestError } from '../errors'
import { ITokens } from '../interfaces'

const generateTokens = (user: User): ITokens => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
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

const generateRefreshToken = (user: User) => {
  const payload = {
    sub: user.id,
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

const generateAccessToken = (user: User) => {
  const payload = {
    sub: user.id,
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

const generatePasswordResetToken = (user: User) => {
  const payload = {
    sub: user.id,
  }
  const expiresIn = config.jwt.passwordResetTokenExpiresIn
  const signedToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn,
  })
  return signedToken
}

const verifyPasswordResetToken = async (passwordResetToken: string) => {
  const { sub } = jwt.verify(
    passwordResetToken,
    config.jwt.secret,
  ) as JwtPayload

  if (!sub) {
    throw new BadRequestError('Invalid payload for jwt')
  }
  return { userId: sub }
}

const generateUuid = () => {
  return uuidV4()
}

export const tokenServices = {
  generateTokens,
  generateAccessToken,
  generateRefreshToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  generateUuid,
}
