import request from 'supertest'
import { app } from '../../app'
import { Status } from '../../utils/response.util'

describe('testing /auth', () => {
  let setCookies
  const userDetails = {
    name: 'user',
    email: 'user@test.com',
    password: 'asd12@@d2w',
    passwordConfirm: 'asd12@@d2w'
  }

  describe('POST /register', () => {
    const AUTH_ROUTE = '/api/auth/register'
    test('should give validation errors if no request object is passed', async () => {
      const res = await request(app).post(AUTH_ROUTE).send()
      expect(res.body.status).toBe(Status.Error)
      expect(res.body.error.length).toBe(3) // Validation error of 3 fields
    })

    test('should not fail if correct payload is sent', async () => {
      const res = await request(app).post(AUTH_ROUTE).send(userDetails)
      expect(res.body.status).toBe(Status.Success)
    })

    test('should fail if same email is sent', async () => {
      const res = await request(app).post(AUTH_ROUTE).send(userDetails)
      expect(res.body.status).toBe(Status.Error)
    })
  })

  describe('POST /login ', () => {
    const AUTH_ROUTE = '/api/auth/login'
    test('should give validation errors if no request object is passed', async () => {
      const res = await request(app).post(AUTH_ROUTE).send()
      expect(res.body.status).toBe(Status.Error)
      expect(res.body.error.length).toBe(2) // Validation error for 2 fields
    })

    test('should fail if wrong email and password are sent', async () => {
      const res = await request(app).post(AUTH_ROUTE).send({ email: 'random@gmail.com', password: 'random' })
      expect(res.body.status).toBe(Status.Error)
    })

    test('should not fail if correct payload is sent', async () => {
      const res = await request(app).post(AUTH_ROUTE).send(userDetails)
      expect(res.body.status).toBe(Status.Success)
      setCookies = res.headers['set-cookie']
    })
  })

  describe('GET /refresh ', () => {
    const AUTH_ROUTE = '/api/auth/refresh'
    test('should return tokens', async () => {
      const res = await request(app).get(AUTH_ROUTE).set('Cookie', setCookies).send()
      expect(res.headers['set-cookie']).toBeDefined()
      expect(res.headers['set-cookie'].length).toBe(2)
      setCookies = res.headers['set-cookie']
    })
  })

  describe('POST /logout ', () => {
    const AUTH_ROUTE = '/api/auth/logout'
    test('should logout', async () => {
      const res = await request(app).post(AUTH_ROUTE).set('Cookie', setCookies).send()
      expect(res.body.status).toBe(Status.Success)
    })
  })
})
