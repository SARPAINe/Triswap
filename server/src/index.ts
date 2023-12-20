import { logger } from './config/winston.config'
import { closeDB, startDB, startServer } from './server'
import { config } from './config'

const main = async () => {
  let seqOptions
  const { nodeEnv } = config.app
  try {
    if (nodeEnv === 'development') {
      seqOptions = { force: true }
    }
    if (nodeEnv === 'staging') {
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
