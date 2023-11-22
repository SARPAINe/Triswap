import jwt from 'jsonwebtoken'
import User from '../models/user.models'

const issueJwt = (user: User) => {
  const id = user.id
  const expiresIn = '1d'
  const payload = {
    sub: id,
    iat: Date.now(),
  }
  const signedToken = jwt.sign(payload, 'secret', { expiresIn })

  return {
    token: 'Bearer ' + signedToken,
    expiresIn,
  }
}

export { issueJwt }
