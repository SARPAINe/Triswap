import { RequestHandler } from 'express'
import { UnauthenticatedError } from '../errors'
import User from '../models/user.models'
import passport from 'passport'

const isAuthenticated = passport.authenticate('jwt', { session: false })

// Authorization

const isAdmin: RequestHandler = (req, res, next) => {
  // assuming passport has attached user
  const { role } = req.user as User
  if (role === 'ADMIN') {
    return next()
  }
  throw new UnauthenticatedError('Forbidden - Insufficient privileges')
}

// for local strategy
const isAuthenticatedLocal: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  throw new UnauthenticatedError('User not authorized to view this resource')
}

export { isAuthenticated, isAdmin, isAuthenticatedLocal }
