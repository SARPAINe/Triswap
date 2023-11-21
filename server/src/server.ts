import config from './config'
import app from './app'
import logger from './logger'
import { sequelize } from './config/sequelize.config'

const startServer = async () => {
  try {
    await sequelize.authenticate()
    logger.info('Connection to the database has been established successfully.')
    await sequelize.sync()

    app.listen(config.port, () => {
      logger.info(`server running on port ${config.port}`)
    })
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

startServer()
