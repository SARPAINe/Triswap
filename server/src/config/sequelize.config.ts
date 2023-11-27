import { type Sequelize } from 'sequelize'
import { setupTestDBMemory } from './database/sequelize-test.config'
import { setupDevDB } from './database/sequelize-dev.config'

const sequelizeConfig: Sequelize =
  process.env.NODE_ENV === 'test' ? setupTestDBMemory() : setupDevDB()

export default sequelizeConfig
