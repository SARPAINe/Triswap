import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import { setupDB } from './sequelize.config'
import { setupTestDBMemory } from './sequelize-test.config'
import { type Sequelize } from 'sequelize'

const envFound = dotenv.config()
if (envFound.error) {
  throw new Error('No .env file found')
}

const nodeEnv = process.env.NODE_ENV!

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../..', 'access.log'),
  { flags: 'a' },
)

let configuredMorgan
if (nodeEnv === 'production') {
  configuredMorgan = morgan('combined', { stream: accessLogStream })
} else {
  configuredMorgan = morgan('dev')
}

// based on env set db
let sequelize: Sequelize
if (nodeEnv === 'test') {
  sequelize = setupTestDBMemory()
} else {
  sequelize = setupDB()
}

export default {
  port: process.env.PORT!,
  logs: {
    morgan: configuredMorgan,
  },
  blockchain: {
    rpc_url: process.env.RPC_URL!,
  },
  node: {
    env: process.env.NODE_ENV!,
  },
  db: {
    sequelize,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
}
