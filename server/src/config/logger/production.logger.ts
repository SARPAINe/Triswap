import winston, { format } from 'winston'
const { combine, timestamp, json } = format

const productionLogger = (): winston.Logger => {
  const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  })
  return logger
}

export default productionLogger
