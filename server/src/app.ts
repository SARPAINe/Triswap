import express from 'express'
import compression from 'compression'
import passport from 'passport'
import 'express-async-errors'

// security
import helmet from 'helmet'
import cors from 'cors'

// logger
import config from './config'
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

import './config/passport.config'
app.use(passport.initialize())

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/eth', ethRoutes)
app.use('/api/v1/tokens', tokenRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app
