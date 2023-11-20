import { Sequelize } from 'sequelize'
import config from '.'

const sequelize = new Sequelize(
  config.db.dbName,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'mysql',
  },
)

export { sequelize }
