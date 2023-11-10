import config from './config'
import app from './app'
import logger from './logger'

const startServer = () => {
  try {
    app.listen(config.port, () => {
      logger.info(`server running on port ${config.port}`)
    })
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

startServer()
