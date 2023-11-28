import { RequestHandler } from 'express'
import { ForbiddenError, UnauthenticatedError } from '../errors'
import User from '../models/user.models'
import passport from 'passport'

const isAuthenticated = passport.authenticate('jwt', { session: false })

const isAuthenticatedLocal: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  throw new UnauthenticatedError('User not authorized to view this resource')
}

const isAdmin: RequestHandler = (req, res, next) => {
  // assuming passport has attached user
  const { role } = req.user as User
  if (role === 'ADMIN') {
    return next()
  }
  throw new ForbiddenError('Forbidden - Insufficient privileges')
}

export { isAuthenticated, isAdmin, isAuthenticatedLocal }
