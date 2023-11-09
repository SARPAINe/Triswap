import { type ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)
  const customError = {
    statusCode: err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
    error: err.name ?? 'InternalServerError',
    msg: err.message ?? 'Something went wrong try again later',
  }

  res.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandlerMiddleware
