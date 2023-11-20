import { RequestHandler } from 'express'

const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

export { isAuthenticated }
