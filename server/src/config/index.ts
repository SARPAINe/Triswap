import path from 'path'
import dotEnv from 'dotenv'
dotEnv.config({ path: path.join(__dirname, './../../.env') })
import morgan from './morgan.config'
import sequelize from './sequelize.config'

const config = {
  port: process.env.PORT!,
  app: {
    baseURL: `http://localhost:3000/api/v1`,
  },
  logs: {
    morgan,
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
    accessTokenExpiresIn: 60 * 60 * 24, // '1d'
    passwordResetTokenExpiresIn: 60 * 5, // 5 minutes
  },
  email: {
    adminEmailAddress: 'admin@bjitcs.com',
  },
}
export default config
