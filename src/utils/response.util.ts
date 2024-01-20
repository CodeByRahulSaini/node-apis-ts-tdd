import { Request, Response } from 'express'
import httpStatus from 'http-status'

export enum Status {
  Success = 'success',
  Error = 'error'
}
// apiResponse.ts
export interface ApiResponse<T> {
  status: Status
  data?: T
  message?: string
}

export class AppError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export const sendResponse = <T>(res: Response, data?: T, statusCode: number = httpStatus.OK, message?: string) => {
  const response: ApiResponse<T> = {
    status: Status.Success,
    message,
    data
  }

  res.status(statusCode).json(response)
}

export const errorHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    const response: ApiResponse<null> = {
      status: Status.Error,
      message: err.message
    }

    return res.status(err.statusCode).json(response)
  }

  // Handle other types of errors (e.g., database errors, etc.)
  const response: ApiResponse<null> = {
    status: Status.Error,
    message: 'An unexpected error occurred'
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response)
}
