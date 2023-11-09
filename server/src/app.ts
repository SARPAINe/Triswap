import express from 'express'
import 'express-async-errors'
import config from './config'

// security
import helmet from 'helmet'
import cors from 'cors'

// logger
import morgan from 'morgan'

// routes
import tokenRoutes from './routes/v1/token.routes'
import ethRoutes from './routes/v1/eth.routes'

// middlewares
import errorHandlerMiddleware from './middlewares/errorHandler.middleware'
import notFoundMiddleware from './middlewares/notFound.middleware'

const app = express()

app.set('trust proxy', 1)
app.use(cors())
app.use(helmet())
app.use(morgan(config.logs.morgan))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/v1/eth', ethRoutes)
app.use('/api/v1/tokens', tokenRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
export default app
