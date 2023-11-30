import path from 'path'
import dotEnv from 'dotenv'
dotEnv.config({ path: path.join(__dirname, './../../.env') })
import morgan from './morgan.config'
import sequelize from './sequelize.config'

let port = process.env.PORT!
if (process.env.NODE_ENV === 'staging') {
  port = process.env.STG_PORT!
} else if (process.env.NODE_ENV === 'development') {
  port = process.env.DEV_PORT!
}

export const config = {
  port,
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
    access_token: {
      secret: process.env.ACCESS_TOKEN_JWT_SECRET!,
      expiresIn: 60 * 10,
    }, // '10m'
    refresh_token: {
      secret: process.env.REFRESH_TOKEN_JWT_SECRET!,
      expiresIn: 60 * 60 * 24 * 7, // '7d'
    },
    passwordResetTokenExpiresIn: 60 * 10, // 5 minutes
  },
  email: {
    adminEmailAddress: 'admin@bjitcs.com',
  },
}
