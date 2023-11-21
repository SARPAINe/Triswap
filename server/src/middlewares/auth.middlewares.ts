import { RequestHandler } from 'express'
import { UnauthenticatedError } from '../errors'
import User from '../models/user.models'

const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  throw new UnauthenticatedError('User not authorized to view this resource')
}

// Authorization
// is admin

const isAdmin: RequestHandler = (req, res, next) => {
  const { role } = req.user as User
  if (role === 'ADMIN') {
    console.log('user role->', role)
    return next()
  }
  throw new UnauthenticatedError('User is not ADMIN')
}

export { isAuthenticated, isAdmin }
