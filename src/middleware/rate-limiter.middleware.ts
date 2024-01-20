import setRateLimit from 'express-rate-limit'
import { AppError } from '../utils/response.util'
import httpStatus from 'http-status'
import config from 'config'

export const rateLimitMiddleware = setRateLimit({
  windowMs: config.get<number>('rateLimitingWindowSecs') * 1000, // 1 min
  max: config.get('rateLimitingMax'),
  headers: true,
  handler: (req, res, next) => {
    next(
      new AppError(
        httpStatus.TOO_MANY_REQUESTS,
        `You have exceeded your ${config.get<number>('rateLimitingMax')} requests per ${config.get<number>('rateLimitingWindowSecs')} seconds limit.`
      )
    )
  }
})
