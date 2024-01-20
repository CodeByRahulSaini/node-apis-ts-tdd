import config from 'config'
import { CookieOptions, NextFunction, Request, Response } from 'express'
import { CreateUserInput, LoginUserInput } from './auth.schema'
import { createUser, findUser, findUserById } from './auth.service'
import tryCatch from '../../utils/trycatch.util'
import { sendResponse, AppError } from '../../utils/response.util'
import httpStatus from 'http-status'

import { verifyJwt, generateTokens } from '../../utils/jwt.util'
import { User } from './user.model'

/**
 * Access token cookie options
 */
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax'
}

/**
 * Refresh token cookie options
 */
const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax'
}

// Only set secure to true in production
if (process.env.NODE_ENV === 'production') accessTokenCookieOptions.secure = true

/**
 * Register
 * */
export const registerHandler = tryCatch(async (req: Request<null, null, CreateUserInput>, res: Response) => {
  const userExists = await findUser({ email: req.body.email })
  if (userExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists')
  }
  const user = await createUser({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  })
  const { email, _id, name } = user
  sendResponse(res, { email, _id, name }, httpStatus.CREATED)
})

/**
 * Login
 */
export const loginHandler = tryCatch(async (req: Request<object, object, LoginUserInput>, res: Response) => {
  // Get the user from the collection
  const user = await findUser({ email: req.body.email })
  // Check if user exist and password is correct
  if (!user || !(await user.comparePasswords(user.password, req.body.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password')
  }
  await setResponseTokens(res, user)
  const { email, _id, name } = user
  sendResponse(res, { email, _id, name })
})

/**
 * Set the response tokens in response cookies
 */
const setResponseTokens = async (res: Response, user: User) => {
  // Create the Access and refresh Tokens
  const { access_token, refresh_token } = await generateTokens({ userId: user._id.toString() })

  // Send Access Token in Cookie
  res.cookie('access_token', access_token, accessTokenCookieOptions)
  res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions)
  return { access_token, refresh_token }
}

/**
 * Refresh access tokens
 */
export const refreshAccessTokenHandler = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
  // Get the refresh token from cookie
  const refresh_token = req.cookies.refresh_token as string
  // Validate the Refresh token
  const decoded = await verifyJwt(refresh_token, 'refreshTokenPublicKey')
  const message = 'Could not refresh access token! Login again!'
  if (!decoded) {
    return next(new AppError(httpStatus.FORBIDDEN, message))
  }
  const user = await findUserById(decoded.userId)
  if (!user) {
    return next(new AppError(httpStatus.FORBIDDEN, 'User not found'))
  }
  await setResponseTokens(res, user)
  sendResponse(res)
})

/**
 * Logout handler
 */
export const logoutHandler = tryCatch(async (req: Request, res: Response) => {
  res.cookie('access_token', '', { maxAge: 1 })
  res.cookie('refresh_token', '', { maxAge: 1 })
  res.cookie('logged_in', '', {
    maxAge: 1
  })
  sendResponse(res)
})
