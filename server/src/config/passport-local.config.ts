import passport from 'passport'
import LocalStrategy from 'passport-local'
import { authDbServices } from '../services/authDb.services'
import { cryptoServices } from '../services/crypto.services'
import User from '../models/user.models'

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
}

const verifyCallback: LocalStrategy.VerifyFunction = async (
  email,
  password,
  cb,
) => {
  try {
    // get user by email
    console.log('passport_config: this is called')
    const user = await authDbServices.findUserByEmail(email)

    // if no user found
    if (!user) {
      return cb(null, false, { message: 'Incorrect email or password.' })
    }

    // if user's password is matched
    const isValidPassword = await cryptoServices.comparePassword(
      password,
      user.password,
    )
    if (isValidPassword) {
      cb(null, user) // send user to the req
    } else {
      cb(null, false, { message: 'Incorrect email or password.' })
    }
  } catch (err) {
    cb(err)
  }
}

const strategy = new LocalStrategy.Strategy(customFields, verifyCallback)

passport.use(strategy)

// need to comeback
passport.serializeUser((user, done) => {
  done(null, (user as User).id)
})

// populates req.user
passport.deserializeUser(async (userId: string, done) => {
  try {
    const user = await authDbServices.findUserById(userId)
    done(null, user)
  } catch (err) {
    done(err)
  }
})
