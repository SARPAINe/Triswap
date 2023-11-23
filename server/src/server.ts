/* eslint-disable @typescript-eslint/no-explicit-any */
import app from './app'
import config from './config'
import logger from './logger'

const sequelize = config.db.sequelize

const setupDB = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    logger.info('Connection to the database has been established successfully.')
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

const closeDB = async () => {
  await sequelize.close()
  logger.info('Database connection has been closed.')
}

const startServer = async (): Promise<any> => {
  try {
    const server = app.listen(config.port, () => {
      logger.info(`server running on port ${config.port}`)
    })
    return server
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

const closeServer = async (server: any): Promise<void> => {
  try {
    await new Promise(resolve => server.close(resolve))
    logger.info('Server closed.')
  } catch (err) {
    logger.error('Error closing server:', err)
  }
}

const main = async () => {
  try {
    await setupDB()
    await startServer()
  } catch (err) {
    logger.error(err)
    await closeDB()
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { setupDB, closeDB, startServer, closeServer }
