import { Sequelize, type Options } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const database = process.env.DB_DATABASE! || 'BJIT_CRYPTO_SWAP'
const user = process.env.DB_USER! || 'root'
const password = process.env.DB_PASSWORD! || 'root'
const host = process.env.DB_HOST! || '127.0.0.1'

export const setupDB = (): Sequelize => {
  const sequelizeOptions: Options = { host, dialect: 'mysql' }
  const sequelize = new Sequelize(database, user, password, sequelizeOptions)
  return sequelize
}

export const closeDB = (sequelize: Sequelize): Promise<void> => {
  return sequelize.close()
}
