import passport from 'passport'
import passportJwt from 'passport-jwt'
import { userdbServices } from '../services/db/userdb.services'
import { config } from '.'

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.access_token.secret,
}

// handles the access token only
const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const id = jwt_payload.sub
    const user = await userdbServices.findUserById(id)

    if (!user) {
      return done(null, false, { message: 'Invalid token' })
    } else {
      return done(null, user) // attach user to request object
    }
  } catch (err) {
    done(err)
  }
})
passport.use(strategy)
