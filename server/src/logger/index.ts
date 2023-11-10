import config from '../config'
import developmentLogger from './development.logger'
import productionLogger from './production.logger'

let logger = productionLogger()

if (config.node.env !== 'production') {
  logger = developmentLogger()
}

export default logger
