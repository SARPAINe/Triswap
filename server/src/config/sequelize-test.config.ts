import { Sequelize, type Options } from 'sequelize'

const host = '127.0.0.1'
const user = 'root'
const password = 'root'
const database = 'BJIT_CRYPTO_SWAP_TEST'

export const setupTestDB = () => {
  const sequelizeOptions: Options = {
    host: host,
    dialect: 'mysql',
    logging: false,
  }
  const sequelize = new Sequelize(database, user, password, sequelizeOptions)
  // await sequelize.sync({ force: true })
  return sequelize
}

export const setupTestDBMemory = (): Sequelize => {
  const sequelizeOptions: Options = {
    dialect: 'sqlite',
    storage: ':memory:', // Use in-memory storage
    logging: false, // Disable logging to keep the console clean during tests
  }
  const sequelize = new Sequelize(sequelizeOptions)
  return sequelize
}

export const closeTestDB = (sequelize: Sequelize): Promise<void> => {
  return sequelize.close()
}
