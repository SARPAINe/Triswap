import jwt, { JwtPayload } from 'jsonwebtoken'
import { v4 as uuidV4 } from 'uuid'
import config from '../config'
import User from '../models/user.models'
import { BadRequestError } from '../errors'

// for access token
const generateAccessToken = (user: User) => {
  const payload = {
    sub: user.id,
    iat: Date.now(),
  }
  const expiresIn = config.jwt.accessTokenExpiresIn
  const signedToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn,
  })
  return {
    access_token: signedToken,
    expiresIn: expiresIn,
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
  generateAccessToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  generateUuid,
}
