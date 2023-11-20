import express from 'express'
import 'express-async-errors'
import compression from 'compression'
import config from './config'

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
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/eth', ethRoutes)
app.use('/api/v1/tokens', tokenRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
export default app
