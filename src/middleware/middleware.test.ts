import { auth } from './auth.middleware'
import { AppError } from '../utils/response.util'
import httpStatus from 'http-status'
import { Request, Response } from 'express'

describe('middleware auth', () => {
  test('should return AppError with status code 401 when an invalid access token is provided', async () => {
    const req = {
      cookies: {
        access_token: 'invalid_token'
      }
    } as Request
    const res = {} as Response
    const next = jest.fn()
    await auth(req, res, next)

    expect(next).toHaveBeenCalledWith(expect.any(AppError))
    expect(next.mock.calls[0][0].statusCode).toBe(httpStatus.UNAUTHORIZED)
  })

  test('should return AppError with status code 401 when no access token is provided in cookies', async () => {
    const req = {
      cookies: {}
    } as Request
    const res = {} as Response
    const next = jest.fn()

    await auth(req, res, next)

    expect(next).toHaveBeenCalledWith(expect.any(AppError))
    expect(next.mock.calls[0][0].statusCode).toBe(httpStatus.UNAUTHORIZED)
  })
})
