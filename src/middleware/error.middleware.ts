import { Request, Response, NextFunction } from 'express'
import { AppError, Status } from '../utils/response.util'
import { AnyZodObject, ZodError } from 'zod'
import httpStatus from 'http-status'

export default class HttpException extends Error {
  statusCode?: number
  status?: number
  message: string
  error: string | null

  constructor(statusCode: number, message: string, error?: string) {
    super(message)

    this.statusCode = statusCode
    this.message = message
    this.error = error || null
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
  error.statusCode = error.statusCode || 500
  response.status(error.statusCode).json({
    status: error.status || Status.Error,
    message: error.message
  })
}

export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
  const err = new AppError(httpStatus.NOT_FOUND, `Route ${request.originalUrl} not found`)
  err.statusCode = 404
  next(err)
}

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      params: req.params,
      query: req.query,
      body: req.body
    })

    next()
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        status: Status.Error,
        error: err.errors
      })
    }
    next(err)
  }
  // It fixes https://typescript.tv/errors/#ts7030
  return
}
