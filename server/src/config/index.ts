import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import { setupDB } from './sequelize.config'
import { setupTestDBMemory } from './sequelize-test.config'
import { type Sequelize } from 'sequelize'

import dotenv from 'dotenv'
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

const database = process.env.DB_DATABASE!
const user = process.env.DB_USER!
const password = process.env.DB_PASSWORD!
const host = process.env.DB_HOST!
// console.log({
//   database,
//   user,
//   password,
//   host,
// })
export default {
  port: process.env.PORT!,
  app: {
    baseURL: `http://localhost:3000/api/v1`,
  },
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
    prodDb: {
      database,
      user,
      password,
      host,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    accessTokenExpiresIn: 60 * 60 * 24, // '1d'
    passwordResetTokenExpiresIn: 60 * 5, // 5 minutes
  },
  email: {
    adminEmailAddress: 'admin@bjitcs.com',
  },
}
