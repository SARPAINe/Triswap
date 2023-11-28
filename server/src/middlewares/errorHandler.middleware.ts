import { type ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { logger } from '../config/winston.config'

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error(err.message)
  const customError = {
    statusCode: err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
    error: err.name ?? 'InternalServerError',
    message: err.message ?? 'Something went wrong try again later',
  }

  const apiResponse = {
    success: false,
    message: customError.message,
    error: {
      status: customError.statusCode,
      error: customError.error,
      message: customError.message,
    },
  }

  res.status(customError.statusCode).json(apiResponse)
}

export default errorHandlerMiddleware
