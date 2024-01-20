import { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/response.util'

import { verifyJwt } from '../utils/jwt.util'
import httpStatus from 'http-status'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the token
    let access_token
    if (req.cookies.access_token) {
      access_token = req.cookies.access_token
    }

    if (!access_token) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'You are not logged in'))
    }

    // Validate Access Token
    const decoded = await verifyJwt(access_token, 'accessTokenPublicKey')

    if (!decoded) {
      return next(new AppError(httpStatus.UNAUTHORIZED, `Invalid token or user doesn't exist`))
    }

    res.locals.userId = decoded.userId
    next()
  } catch (err: unknown) {
    next(err)
  }
}
