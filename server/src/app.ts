import express from 'express'
import 'express-async-errors'
import compression from 'compression'
import session from 'express-session'
import connectSession from 'connect-session-sequelize'
import passport from 'passport'
import config from './config'
import { sequelize } from './config/sequelize.config'

// security
import helmet from 'helmet'
import cors from 'cors'

// logger
const morgan = config.logs.morgan

// routes
import authRoutes from './routes/v1/auth.routes'
import tokenRoutes from './routes/v1/token.routes'
import ethRoutes from './routes/v1/eth.routes'

// middlewares
import errorHandlerMiddleware from './middlewares/errorHandler.middleware'
import notFoundMiddleware from './middlewares/notFound.middleware'

const app = express()

app.set('trust proxy', 1)
app.use(cors())
app.use(helmet())
app.use(morgan)
app.use(compression())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// session
const SequelizeStore = connectSession(session.Store)
const sessionStore = new SequelizeStore({ db: sequelize })
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
)

sessionStore.sync()

// passport
import './config/passport.config'

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log(req.session)
  console.log(req.user)

  next()
})

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/eth', ethRoutes)
app.use('/api/v1/tokens', tokenRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
export default app
