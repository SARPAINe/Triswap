/* eslint-disable @typescript-eslint/no-explicit-any */
import app from './app'
import { config } from './config'
import sequelize from './config/sequelize.config'
import { logger } from './config/winston.config'
import defineAssociations from './models/models.associations'

const startDB = async (opt?: object) => {
  try {
    await sequelize.authenticate()
    await sequelize.sync(opt)
    defineAssociations()
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
    const server = app.listen(config.app.port, () => {
      logger.info(`server running on port ${config.app.port}`)
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
  let seqOptions
  try {
    if (process.env.NODE_ENV === 'development') {
      seqOptions = { force: true }
    }
    if (process.env.NODE_ENV === 'staging') {
      console.log('alter should be true')
      seqOptions = { alter: true }
    }
    await startServer()
    await startDB(seqOptions) // this needs dot env
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
