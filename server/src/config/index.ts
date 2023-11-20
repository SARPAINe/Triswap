import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
const envFound = dotenv.config()
if (envFound.error) {
  throw new Error('No .env file found')
}

const nodeEnv = process.env.NODE_ENV

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../..', 'access.log'),
  { flags: 'a' },
)

let configuredMorgan
if (nodeEnv === 'production') {
  configuredMorgan = morgan('combined', { stream: accessLogStream }) // should be in .env
} else {
  configuredMorgan = morgan('dev')
}

export default {
  port: parseInt(process.env.PORT!, 10),
  logs: {
    morgan: configuredMorgan,
  },
  blockchain: {
    rpc_url: process.env.RPC_URL!,
  },
  node: {
    env: process.env.NODE_ENV,
  },
  db: {
    dbName: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    authDb: 'authentication', // should be in .env
  },
}
