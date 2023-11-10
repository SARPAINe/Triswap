import winston, { format } from 'winston'
const { combine, timestamp, json } = format
// const { printf } = format

// const myFormat = printf(({ level, message, timestamp }) => {
//   return `[${level}] ${timestamp} ${message}`
// })

const productionLogger = (): winston.Logger => {
  const logger = winston.createLogger({
    level: 'info',
    // format: winston.format.json(),
    format: combine(timestamp(), json()),
    // format: combine(timestamp(), myFormat),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  })
  return logger
}

export default productionLogger
