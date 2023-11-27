/* eslint-disable @typescript-eslint/no-explicit-any */
import app from './app'
import logger from './logger'
import sequelize from './config/sequelize.config'
import config from './config'

const startDB = async (force: boolean) => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force })
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
    await startServer()
    await startDB(true) // this needs dot env
  } catch (err) {
    logger.error(err)
    await closeDB()
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { startDB, closeDB, startServer, closeServer }
