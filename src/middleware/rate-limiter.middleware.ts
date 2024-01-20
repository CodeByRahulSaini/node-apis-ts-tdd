import setRateLimit from 'express-rate-limit'
import { AppError } from '../utils/response.util'
import httpStatus from 'http-status'

export const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 10,
  headers: true,
  handler: (req, res, next) => {
    next(new AppError(httpStatus.TOO_MANY_REQUESTS, 'You have exceeded your 10 requests per minute limit.'))
  }
})
